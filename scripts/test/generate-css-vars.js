const fs = require('fs');
const path = require('path');

const combine = {
  cell: ['cell', 'cell-group'],
  dropdown: ['dropdown-menu', 'dropdown-item'],
  tag: ['tag', 'check-tag'],
  checkbox: ['checkbox', 'checkbox-group'],
  indexes: ['indexes', 'indexes-anchor'],
  steps: ['steps', 'step-item'],
  swiper: ['swiper', 'swiper-nav'],
  tabs: ['tabs', 'tab-panel'],
  'tab-bar': ['tab-bar', 'tab-bar-item'],
  grid: ['grid', 'grid-item'],
};

function resolveCwd(...args) {
  args.unshift(process.cwd());
  return path.join(...args);
}

const COMPONENT_NAME = process.argv[process.argv.indexOf('--NAME') + 1]; // 在 --NAME 后面

const matchReg = /(?<=var).*?(?=\;)/g;

// 使用 v2 文件夹下变量文件
const lessPath = [];
if (combine[COMPONENT_NAME]) {
  combine[COMPONENT_NAME].map((item, index) => {
    lessPath.push(resolveCwd(`src/_common/style/mobile/components/${item}/v2/_var.less`));
  });
} else {
  lessPath.push(resolveCwd(`src/_common/style/mobile/components/${COMPONENT_NAME}/v2/_var.less`));
}

// 追加到文件
const cssVariableHeadContent = `\n\n### CSS 变量\n组件提供了下列 CSS 变量，可用于自定义样式。\n名称 | 默认值 | 描述 \n-- | -- | --\n`;
const cssVariableHeadContentEn = `\n\n### CSS Variables\nThe component provides the following CSS variables, which can be used to customize styles.\nName | Default Value | Description \n-- | -- | --\n`;

fs.appendFileSync(resolveCwd(`src/${COMPONENT_NAME}/${COMPONENT_NAME}.md`), cssVariableHeadContent);
fs.appendFileSync(resolveCwd(`src/${COMPONENT_NAME}/${COMPONENT_NAME}.en-US.md`), cssVariableHeadContentEn);

// 读取 less 文件内容
lessPath.map((item, index) => {
  if (fs.existsSync(item)) {
    fs.readFile(item, 'utf8', (err, file) => {
      if (err) {
        console.log('please execute npm run update:css first!', err);
        return;
      }
      const list = file.match(matchReg).sort();
      let cssVariableBodyContent = '';
      list.map((item, index) => {
        cssVariableBodyContent += `${item.slice(1, item.indexOf(','))} | ${item.slice(
          item.indexOf(',') + 2,
          item.length - 1,
        )} | - \n`;
      });
      fs.appendFileSync(resolveCwd(`src/${COMPONENT_NAME}/${COMPONENT_NAME}.md`), cssVariableBodyContent);
      fs.appendFileSync(resolveCwd(`src/${COMPONENT_NAME}/${COMPONENT_NAME}.en-US.md`), cssVariableBodyContent);
    });
  }
});
