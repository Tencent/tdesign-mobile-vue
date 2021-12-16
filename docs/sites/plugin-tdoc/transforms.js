import path from 'path';
import fs from 'fs';

import mdToVue from './md-to-vue';

let demoCodesImports = {};

export default {
  before({ source, file }) {
    const resouceDir = path.dirname(file);
    const reg = file.match(/src\/(\w+-?\w+)\/\w+-?\w+\.md/);
    const name = reg && reg[1];
    demoCodesImports = {};

    // 统一换成 common 文档内容
    if (name && source.includes(':: BASE_DOC ::')) {
      const docPath = path.resolve(__dirname, `../_common/docs/mobile/api/${name}.md`);
      if (fs.existsSync(docPath)) {
        const baseDoc = fs.readFileSync(docPath, 'utf-8');
        source = source.replace(':: BASE_DOC ::', baseDoc);
      } else {
        console.error(`未找到 ${docPath} 文件`);
      }
    }

    // 替换成对应 demo 文件
    source = source.replace(/\{\{\s+(.+)\s+\}\}/g, (demoStr, demoFileName) => {
      const demoPath = path.resolve(resouceDir, `./demos/${demoFileName}.vue`);
      if (!fs.existsSync(demoPath)) return '\n<h3>DEMO (🚧建设中）...</h3>';

      return `\n::: demo demos/${demoFileName} ${name}\n:::\n`;
    });

    source.replace(/:::\s*demo\s+([\\/.\w-]+)/g, (demoStr, relativeDemoPath) => {
      const demoPathOnlyLetters = relativeDemoPath.replace(/[^a-zA-Z\d]/g, '');
      const demoCodeDefName = `Demo${demoPathOnlyLetters}Code`;
      demoCodesImports[demoCodeDefName] = `import ${demoCodeDefName} from './${relativeDemoPath}.vue?raw';`;
    });

    return source;
  },
  render({ source, file, md }) {
    const demoCodesDefsStr = Object.keys(demoCodesImports)
      .map((key) => demoCodesImports[key])
      .join(';\n');

    const demoCodeInstallStr = Object.keys(demoCodesImports).join(',');

    const sfc = mdToVue({
      md,
      file,
      source,
      demoCodesDefsStr,
      demoCodeInstallStr,
    });

    return sfc;
  },
};
