const fs = require('fs');
const path = require('path');
const { camelCase, upperFirst } = require('lodash-es');

function resolveCwd(...args) {
  args.unshift(process.cwd());
  return path.join(...args);
}

const pkg = require(resolveCwd('package.json'));

const framework = pkg.name;

const fixedDateComponentList = ['config-provider', 'time-picker', 'date-picker', 'table', 'form', 'calendar']; // 需要在测试阶段固定日期的组件，table中因为有filter例子 渲染datepicker需要固定

// TODO 过滤掉一些导致挂掉的demo
const filterCom = ['table'];
const filterDemo = {
  table: ['virtual-scroll'],
};

const CONFIG = {
  'tdesign-mobile-react': {
    sourcePath: path.resolve(__dirname, resolveCwd('src')),
    targetPath: path.resolve(__dirname, resolveCwd('src')),
    defaultTemplate: "import { mount } from '@vue/test-utils';",
  },
  'tdesign-mobile-vue': {
    sourcePath: path.resolve(__dirname, resolveCwd('src')),
    targetPath: path.resolve(__dirname, resolveCwd(`src`)),
    defaultTemplate: "import { mount } from '@vue/test-utils';",
  },
};

const { sourcePath, targetPath, defaultTemplate } = CONFIG[framework];

const data = `/**
 * 该文件为由脚本 \`npm run test:demo\` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

${defaultTemplate}
{{ HERE IS DEMO LIST }}
`;

function filterFileFunction(files) {
  // 过滤非 vue jsx 文件
  const fileType = ['vue', 'jsx'];
  return files.filter((item) => {
    return fileType.includes(item.substr(item.lastIndexOf('.') + 1, item.length));
  });
}

function getKeyFunction(component) {
  const newComponent = upperFirst(camelCase(component));

  return `
describe('${newComponent}', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(\`${newComponent} \${demoName} demo works fine\`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});`;
}

function outputOneComponentTestFile(component, demoFiles) {
  const outputPath = `${targetPath}/${component}/__test__`;
  const imports = [];
  const demos = ['\nconst mapper = {'];

  demoFiles.forEach((demo) => {
    if (filterCom.includes(component) && filterDemo[component].includes(demo.replace('.vue', ''))) return;

    const name = camelCase(demo);
    imports.push(`import ${name} from '@/${component}/demos/${demo}';`);
    demos.push(`  ${name},`);
  });
  if (fixedDateComponentList.includes(component)) {
    imports.unshift("import MockDate from 'mockdate';\n");
    imports.push("\nMockDate.set('2020-12-28');");
  }

  demos.push('};');
  const keyData = [imports.join('\n'), demos.join('\n'), getKeyFunction(component)].join('\n');
  const testFileData = data.replace('{{ HERE IS DEMO LIST }}', keyData);
  fs.mkdir(outputPath, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    fs.writeFile(`${outputPath}/demo.test.jsx`, testFileData, (writeErr) => {
      if (writeErr) {
        return console.error(writeErr);
      }
      return console.log(`test file: ${outputPath} has been created.`);
    });
  });
}

function main() {
  fs.readdir(sourcePath, (err, files) => {
    if (err) {
      console.log('Error', err);
    } else {
      files.forEach((componentFolder) => {
        const demoPath = `${sourcePath}/${componentFolder}/demos`;
        fs.readdir(demoPath, (err1, demoFiles) => {
          if (err1) {
            console.log('Error', err1);
          } else {
            if (['icon', 'local-provider'].includes(componentFolder)) return;
            const finalDemoFiles = filterFileFunction(demoFiles);
            outputOneComponentTestFile(componentFolder, finalDemoFiles);
          }
        });
      });
    }
  });
}

main();
