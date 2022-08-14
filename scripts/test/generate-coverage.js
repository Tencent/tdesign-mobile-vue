const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');

const DomParser = require('dom-parser');

const parser = new DomParser();
const result = {};

// 只关注组件本身的测试覆盖率
const components_enum = [
  'button',
  'fab',
  'icon',
  'cell',
  'divider',
  'grid',
  'DropdownMenu',
  'indexes',
  'navbar',
  'steps',
  'stikcy',
  'tabBar',
  'checkbox',
  'DateTimePicker',
  'input',
  'picker',
  'radio',
  'rate',
  'search',
  'slider',
  'stepper',
  'switch',
  'textarea',
  'upload',
  'avater',
  'badge',
  'collapse',
  'countDown',
  'image',
  'imageViewer',
  'list',
  'reault',
  'skeleton',
  'swiper',
  'tag',
  'actionSheet',
  'backTop',
  'dialog',
  'drawer',
  'loading',
  'message',
  'noticeBar',
  'overlay',
  'popup',
  'progress',
  'PullDownRefresh',
  'swipeCell',
]

function resolveCwd(...args) {
  args.unshift(process.cwd());
  return path.join(...args);
}

fs.readFile(resolveCwd('test/unit/coverage/index.html'), 'utf8', (err, html) => {
  if (err) {
    console.log('please execute npm run test:coverage first!', err);
    return;
  }
  if (!err) {
    const dom = parser.parseFromString(html);
    const tds = dom.getElementsByTagName('td');

    let key = '';
    let value = '';

    Array.from(tds).forEach((item, index) => {
      const col = index % 10;
      if (col === 0) {
        const [, name] = item.getAttribute('data-value').split('src/');
        components_enum.includes(name) && (key = camelCase(name));
      } else if (col === 8) {
        value = `${item.getAttribute('data-value')}%`;
      } else if (col === 9) {
        result[key] = value;
      }
    });
    const finalRes = `module.exports = ${JSON.stringify(result, null, 2)}`;
    fs.writeFileSync(resolveCwd('site/web/test-coverage.js'), finalRes);
    console.log('successful re-generate coverage');
  }
});
