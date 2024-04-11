<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

<p align="center">
  <a href="https://github.com/Tencent/tdesign-mobile-vue/blob/develop/LICENSE">
    <img src="https://img.shields.io/npm/l/tdesign-mobile-vue.svg?sanitize=true" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/tdesign-mobile-vue">
    <img src="https://img.shields.io/npm/v/tdesign-mobile-vue.svg?sanitize=true" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/tdesign-mobile-vue">
    <img src="https://img.shields.io/npm/dw/tdesign-mobile-vue" alt="Downloads">
  </a>
</p>

TDesign 适配移动端的组件库，适合在 vue 3 技术栈项目中使用。

# 🎉 特性

- 适配移动端交互
- 基于 Vue3，并使用 Vite 2.x 开发构建
- 对接前端组件语言规范
- 与其他框架（React Mobile、小程序） API、UI 保持一致
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

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br> IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge >=97                                                                                                                                                                                                        | Firefox >=96                                                                                                                                                                                                      | Chrome >=96                                                                                                                                                                                                   | Safari >=14.1                                                                                                                                                                                                 |

# 贡献成员

<a href="https://github.com/tencent/tdesign-mobile-vue/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=tencent/tdesign-mobile-vue" />
</a>

# 参与贡献

TDesign 欢迎任何愿意参与贡献的参与者。如果需要本地运行代码或参与贡献，请先阅读[参与贡献](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/CONTRIBUTING.md)。

# 反馈

有任何问题，建议通过 [Github issues](https://github.com/Tencent/tdesign-mobile-vue/issues) 反馈或扫码加入用户微信群。

<img src="https://raw.githubusercontent.com/Tencent/tdesign/main/packages/components/src/images/groups/vue3-group.png" width="200" />

# 开源协议

TDesign 遵循 [MIT 协议](https://github.com/Tencent/tdesign-vue/blob/main/LICENSE)。
