const fs = require('fs');
const path = require('path');

const COMPONENT_NAME = process.argv[process.argv.indexOf('--NAME') + 1]; // 在 --NAME 后面

const combine = {
  avatar: ['avatar-group', 'avatar'],
  cell: ['cell-group', 'cell'],
  collapse: ['collapse', 'collapse-panel'],
  'dropdown-menu': ['dropdown-menu', 'dropdown-item'],
  tag: ['tag', 'check-tag'],
  checkbox: ['checkbox-group', 'checkbox'],
  indexes: ['indexes', 'indexes-anchor'],
  picker: ['picker', 'picker-item'],
  radio: ['radio-group', 'radio'],
  'side-bar': ['side-bar', 'side-bar-item'],
  steps: ['steps', 'step-item'],
  swiper: ['swiper', 'swiper-nav'],
  tabs: ['tabs', 'tab-panel'],
  'tab-bar': ['tab-bar', 'tab-bar-item'],
  grid: ['grid', 'grid-item'],
  layout: ['row', 'col'],
  form: ['form', 'form-item'],
};

const resolveCwd = (...args) => {
  args.unshift(process.cwd());
  return path.join(...args);
};

const findFilePath = (componentName) => {
  return resolveCwd(`src/_common/style/mobile/components/${componentName}/_var.less`);
};

const getAllComponentName = async (dirPath) => {
  const items = await fs.promises.readdir(dirPath, { withFileTypes: true });
  return items.filter((item) => item.isDirectory()).map((item) => item.name);
};

const generateCssVariables = async (componentName) => {
  const lessPath = [];

  let cssVariableBodyContent = '';

  if (combine[componentName]) {
    combine[componentName].forEach((item) => {
      lessPath.push(findFilePath(item));
    });
  } else {
    lessPath.push(findFilePath(componentName));
  }

  const validPaths = lessPath.filter((item) => fs.existsSync(item));

  // 使用 fs.promises.readFile 并行读取文件
  const fileContents = await Promise.all(validPaths.map((item) => fs.promises.readFile(item, 'utf8')));

  fileContents.forEach((file) => {
    const matchReg = /(?<=var)[\s\S]*?(?=;)/g;

    const list = file.match(matchReg)?.sort();

    list?.forEach((item) => {
      cssVariableBodyContent += `${item.slice(1, item.indexOf(',')).trim()} | ${item
        .slice(item.indexOf(',') + 2, item.length - 1)
        .trim()} | - \n`;
    });
  });

  return cssVariableBodyContent;
};

/**
 * 替换文档中的 CSS 变量部分
 * @param {string} filePath - 文档路径
 * @param {string} headContent - 变量表头部内容
 * @param {string} variables - 生成的变量内容
 */
const updateDocVariables = (filePath, headContent, variables) => {
  const path = resolveCwd(filePath);

  if (!fs.existsSync(path)) return;

  const content = fs.readFileSync(path, 'utf8');
  const cssVariablesSection = `\n${headContent}${variables}`;

  // 检查是否存在 ### CSS Variables 部分
  if (content.includes('### CSS Variables')) {
    // 替换现有部分
    const newContent = content.replace(/(^|\n+)### CSS Variables[\s\S]*?(?=###|$)/, cssVariablesSection);
    fs.writeFileSync(path, newContent, 'utf8');
  } else {
    // 追加到文件末尾
    const trimmedContent = content.trimEnd();
    const newContent = `${trimmedContent}\n${cssVariablesSection}`;
    fs.writeFileSync(path, newContent, 'utf8');
  }
};

// 批量处理所有组件
const processAllComponents = async () => {
  const cssVariableHeadContent = `\n### CSS Variables\n\n组件提供了下列 CSS 变量，可用于自定义样式。\n名称 | 默认值 | 描述 \n-- | -- | --\n`;
  const cssVariableHeadContentEn = `\n### CSS Variables\n\nThe component provides the following CSS variables, which can be used to customize styles.\nName | Default Value | Description \n-- | -- | --\n`;

  let COMPONENT_NAMES = [];
  if (COMPONENT_NAME === 'all') {
    COMPONENT_NAMES = await getAllComponentName(resolveCwd('src'));
  } else {
    COMPONENT_NAMES = [COMPONENT_NAME];
  }

  // 并行处理所有组件
  await Promise.all(
    COMPONENT_NAMES.map(async (name) => {
      const variables = await generateCssVariables(name);
      if (variables) {
        updateDocVariables(`src/${name}/${name}.md`, cssVariableHeadContent, variables);
        updateDocVariables(`src/${name}/${name}.en-US.md`, cssVariableHeadContentEn, variables);
        console.log(`✅ 组件 "${name}" 文档更新完成`);
      } else {
        console.log(`${name}" 没有找到 CSS 变量`);
      }
    }),
  );
};

// 执行入口
processAllComponents().catch((err) =>
  console.error(`${COMPONENT_NAME === 'all' ? '❌ 批量处理失败:' : `${COMPONENT_NAME}处理失败`}`, err),
);
