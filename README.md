<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

TDesign 适配移动端的组件库，适合在 vue 3 技术栈项目中使用。

# 🎉 特性

- 适配移动端交互
- 基于 Vue3，并使用 Vite 2.x 开发构建
- 对接前端组件语言规范
- 与其他框架（React） API、UI 保持一致
- 支持按需加载

# 安装

目前组件库已发布一期组件的测试版本，还在快速迭代，注意留意版本变化

```bash
npm i tdesign-mobile-vue
```

# 基础使用

推荐使用 Webpack 或 Rollup 等支持 tree-shaking 特性的构建工具，无需额外配置即可实现组件按需引入：

```js
import { createApp } from 'vue';
import TDesign from 'tdesign-mobile-vue';

const app = createApp(App);
app.use(TDesign);
```

# 浏览器兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| >= 12                                                                                                                                                                                                  | >= 18                                                                                                                                                                                                   | >= 49                                                                                                                                                                                               | >= 10                                                                                                                                                                                               |
# 开源协议

TDesign 遵循 [MIT 协议](https://github.com/Tencent/tdesign-vue/blob/main/LICENSE)。