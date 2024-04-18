---
title: Vue3 for Mobile
description: TDesign 适配移动端的组件库，适合在 vue 3 技术栈项目中使用。
spline: explain
---


## 安装

### 使用 npm 安装

推荐使用 npm 方式进行开发

```bash
npm i tdesign-mobile-vue
```

### 通过 浏览器引入 安装

目前可以通过 [unpkg.com/tdesign-mobile-vue](https://unpkg.com/tdesign-mobile-vue) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

```html
<!-- vue 3 -->
<script src="https://unpkg.com/vue@next"></script>
<link rel="stylesheet" href="https://unpkg.com/tdesign-mobile-vue/dist/tdesign.min.css" />
<script src="https://unpkg.com/tdesign-mobile-vue/dist/tdesign.min.js"></script>
...
<script>
  Vue.createApp({}).use(TDesign).mount('#app');
</script>
```

> 请注意，我们不推荐使用这种方式，这样无法实现按需加载等优化手段，生产项目会直接受版本更新影响，同时也可能受到 CDN 的稳定性的影响。

npm package 中提供了多种构建产物，可以阅读 [这里](https://github.com/Tencent/tdesign/blob/main/docs/develop-install.md) 了解不同目录下产物的差别。


## 使用

TDesign 提供了三种方式使用组件，具体使用方式如下

## 基础使用

基础使用会全量注册所有组件，如果您的项目大规模使用组件，请放心使用这种方式。

```js
import { createApp } from 'vue';
import TDesign from 'tdesign-mobile-vue';
import App from './app.vue';

// 引入组件库的少量全局样式变量
import 'tdesign-mobile-vue/es/style/index.css';

const app = createApp(App);
app.use(TDesign);
```

### 按需引入使用

如果您对产物大小有严格的要求，可以通过 按需引入具体组件 的方式来使用。

借助 Webpack 或 Rollup 等支持 tree-shaking 特性的构建工具，可以达到按需引入的使用效果。

```js
import { createApp } from 'vue';
import { Button as TButton } from 'tdesign-mobile-vue';
import App from './app.vue';

// 引入组件库的少量全局样式变量
import 'tdesign-mobile-vue/es/style/index.css';

const app = createApp(App);
app.use(TButton);
```

### 通过插件按需引用使用

除此之外，也可以使用 `unplugin-vue-components` 和 `unplugin-auto-import` 来实现自动导入：

您仍需在项目引入组件库的少量全局样式变量
```js
import { createApp } from 'vue';
// 引入组件库的少量全局样式变量
import 'tdesign-mobile-vue/es/style/index.css';

const app = createApp(App);
```
并安装两个unplugin相关的第三方包
```bash
npm install -D unplugin-vue-components unplugin-auto-import
```

然后在 Webpack 或 Vite 对应的配置文件添加上述插件。

#### Vite

```js
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
export default {
  plugins: [
    // ...
    AutoImport({
      resolvers: [TDesignResolver({
        library: 'mobile-vue'
      })],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: 'mobile-vue'
      })],
    }),
  ],
};
```

#### Webpack

```js
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { TDesignResolver } = require('unplugin-vue-components/resolvers');
module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [TDesignResolver({
        library: 'mobile-vue'
      })],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: 'mobile-vue'
      })],
    }),
  ],
};
```

> `TDesignResolver` 支持的配置，可以点击此[链接](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/tdesign.ts#L4)。


## 浏览器兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/> iOS Safari| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |[<img src="https://user-images.githubusercontent.com/51158141/189169679-71e045f6-9b9b-4baf-8b9f-e045a40216f5.png" alt="Android Browser" width="24px" height="24px" />]()<br/>Android Browser|
| --------- | --------- | --------- | --------- | --------- |--------- |
| Firefox >=104| Chrome >=105| iOS Safari >=12.2| Samsung >=10.2 | Opera >=64 | Android Browser >=105 |

详情参见[移动端组件库浏览器兼容性说明](https://github.com/Tencent/tdesign/wiki/Browser-Compatibility)


## FAQ

Q: 是否内置reset样式统一页面元素的默认样式 ？

A: `0.25.0` 版本开始我们不再引入 `reset.less`。

如果你的项目开发依赖于原先的 `reset` 样式，可以从 `dist` 目录中单独引入它：

```js
import 'tdesign-mobile-vue/dist/reset.css';
```
