import MarkdownIt from 'markdown-it';
import mdContainer from 'markdown-it-container';
import markdownItAnchor from "markdown-it-anchor";
import markdownItTocDoneRight from "markdown-it-toc-done-right";

import { TransformResult } from 'rollup';
import { createTDesignComponent } from './component';
import { html2Escape } from '../utils/escape';
import * as path from 'path';
import fs from "fs-extra";
import { TDesignSegmentedMarkdown } from './markdown.interface';

const debug = require('debug')('tdesign:md');


// 将 MD 文档按照官网样式分段
const createTDesiginSegmentedMarkdown = (id: string, source: string): TDesignSegmentedMarkdown => {
  const res: TDesignSegmentedMarkdown = {
    propsRegLocation: source.search(/#+\s*属性配置|(#+\s*\S*\s*props)|(#+\s*\S*\s*api)/i),
    title: '',
    describe: '',
    allMd: source,
    docMd: '',
    demoMd: '',
    apiMd: '',
    designMd: '',
    mobileUrl: '',
  }
  const titleLocation = source.search(/[\r\n]/);
  const describeLocation = source.split(/[\r\n]#+\s|:::\s/)[0].length || titleLocation;
  let demoMd = '';
  let apiMd = '';
  let designMd = '### 文档 (🚧建设中）...';
  let mobileUrl = '';

  res.title = source.slice(2, titleLocation)
  res.describe = source.slice(titleLocation, describeLocation).trim();
  res.docMd = source.slice(describeLocation, res.propsRegLocation);

  if (res.propsRegLocation !== -1) {
    // component_coverage = coverage[camelCase(name)];
    demoMd = source.slice(describeLocation, res.propsRegLocation);
    apiMd = source.slice(res.propsRegLocation);

    res.apiMd = apiMd;
    res.demoMd = demoMd;

    // 新增设计指南内容
    const name = path.basename(id, '.md');
    const designDocPath = path.resolve(__dirname, `../../../common/docs/mobile/design/${name}.md`);
    if (fs.existsSync(designDocPath)) {
      designMd = fs.readFileSync(designDocPath, 'utf-8');
    }
    res.designMd = designMd;

    const prefix = process.env.NODE_ENV === 'development' ? `/mobile.html` : `/vue-mobile/mobile.html`;
    mobileUrl = `${prefix}#/${name}`;
    res.mobileUrl = mobileUrl;
  }

  return res;
};

// markdown 配置
export interface MarkdownOptions extends MarkdownIt.Options { }

// 创建markdown render
export const markdownRenderer = (source: string, id: string, options: MarkdownOptions = {}): TransformResult => {
  if (!id.endsWith('.md')) return null;
  const md = MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    ...options,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkSymbol: '',
    permalinkClass: 'tdesign-header-anchor',
  }).use(markdownItTocDoneRight, {
    level: [2, 3],
    containerClass: "tdesign-toc_container",
    listClass: "tdesign-toc_list",
    itemClass: "tdesign-toc_list_item",
    linkClass: "tdesign-toc_list_item_a",
  });

  const start = Date.now();
  md.use(mdContainer, 'demo', {
    validate(params: string) {
      return params.trim().match(/^demo\s(.*)$/);
    },
    render(tokens: any, idx: string) {
      if (tokens[idx].nesting === 1) {
        const match = tokens[idx].info.trim().match(/^demo\s(.*)$/);
        const demoPath = match[1];
        const demoPathOnlyLetters = demoPath.replace(/[^a-zA-Z\d]/g, '');
        const demoExtension = path.extname(demoPath);
        const demoName = path.basename(demoPath, demoExtension);
        // const title = match[1];
        const demoDefName = `Demo${demoPathOnlyLetters}`;
        const importPath = path.resolve(path.dirname(id), demoPath!);
        let demoCode = '';
        try {
          const importSource = fs.readFileSync(importPath, 'utf-8');
          demoCode = importSource;
        } catch (error) {
          console.error(`demo import fail:${error.message}`);
        }

        debug(`output demo code ->${demoCode}`);

        const tpl = `
          <td-doc-demo language="html" show-code mode="open" code="${html2Escape(demoCode)}"></td-doc-demo>
        `;
        tokens.tttpl = tpl;
        return `<div class="tdesign-demo-wrapper tdesign-demo-item--${demoName}">`;
      }
      if (tokens.tttpl) {
        return `${tokens.tttpl || ''}</div>`;
      }

      return '';
    },
  });

  const render = md.render;
  let html = render.call(md, source);
  let mdSegment = createTDesiginSegmentedMarkdown(id, source);
  // avoid env variables being replaced by vite
  html = html
    .replace(/import\.meta/g, 'import.<wbr/>meta')
    .replace(/process\.env/g, 'process.<wbr/>env');

  mdSegment.docMd = render.call(md, mdSegment.docMd);
  mdSegment.demoMd = render.call(md, mdSegment.demoMd);
  mdSegment.apiMd = render.call(md, mdSegment.apiMd);
  mdSegment.designMd = render.call(md, mdSegment.designMd);

  const component = createTDesignComponent(source, id, html, mdSegment);
  debug('------component------\n', component);
  debug(`[render] ${id} in ${Date.now() - start}ms.`);
  return component;
};
