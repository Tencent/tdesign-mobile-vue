---
title: Vue3 for Mobile
description: TDesign 适配移动端的组件库，适合在 vue 3 技术栈项目中使用。
spline: explain
---


<div style="background: #d4e3fc; display: flex; align-items: center; line-height: 20px; padding: 14px 24px; border-radius: 3px; color: #555a65">
  <svg fill="none" viewBox="0 0 16 16" width="16px" height="16px" style="margin-right: 5px">
    <path fill="rgb(0, 82, 217)" d="M8 15A7 7 0 108 1a7 7 0 000 14zM7.4 4h1.2v1.2H7.4V4zm.1 2.5h1V12h-1V6.5z" fillOpacity="0.9"></path>
  </svg>
  目前组件库处于 Alpha 阶段，快速迭代中，请留意版本变化。
</div>

## 安装

```bash
npm i tdesign-mobile-vue
```

## 基础使用

- 【推荐】直接用解构的方式使用（支持 js 和 css 代码的 tree-shaking）

```js
import { createApp } from 'vue';
import { Button, Cell } from 'tdesign-mobile-vue';
// <- 注意：这里不需要引入样式文件

createApp()
  .use(Button)
  // 支持传递自定义名称
  .use(Cell, 'my-cell');
```

- 【推荐】引入原始样式代码（适用于需要修改样式变量的场景）

> 由于原始样式基于 less 编写，需要自行处理 less 文件的编译（例如安装 less、less-loader）

```js
import { createApp } from 'vue';
import { Button, Cell } from 'tdesign-mobile-vue/esm/';
// <- 注意：这里不需要引入样式文件

createApp()
  .use(Button)
  // 支持传递自定义名称
  .use(Cell, 'my-cell');
```

- 【不推荐】引入完整组件库，这样会将整个组件库的代码一起打包

```js
import { createApp } from 'vue';
import TDesign from 'tdesign-mobile-vue';
// <- 注意：这里不需要引入样式文件

createApp().use(TDesign);
```

- 分别引入组件库代码和样式

```js
import { createApp } from 'vue';
import TDesign from 'tdesign-mobile-vue/dist/tdesign.js';
import 'tdesign-mobile-vue/dist/tdesign.css';

createApp().use(TDesign);
```

## 浏览器兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| >= 12                                                                                                                                                                                                  | >= 18                                                                                                                                                                                                   | >= 49                                                                                                                                                                                               | >= 10                                                                                                                                                                                               |
