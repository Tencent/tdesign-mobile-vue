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

English | [简体中文](./README-zh_CN.md)

TDesign Mobile Vue is a UI component library for Vue 3 and mobile web application.

# 🎉 Features

- Mobile web application interaction
- High quality UI components for Vue 3.x
- Consistent API and UI with TDesign component libraries for other frameworks
- Dark mode and customizable theme
- Support tree-shaking

# 📦 Installation

```bash
npm i tdesign-mobile-vue
```

# 🔨 Usage

We recommend using build tools like Webpack or Rollup that support tree-shaking. No extra setup is needed for on-demand component loading.

```js
import { createApp } from 'vue';
import TDesign from 'tdesign-mobile-vue';

const app = createApp(App);
app.use(TDesign);
```

# Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br> IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge >=97                                                                                                                                                                                                        | Firefox >=96                                                                                                                                                                                                      | Chrome >=96                                                                                                                                                                                                   | Safari >=14.1                                                                                                                                                                                                 |

# Contributing

Contributing is welcome. Read [guidelines for contributing](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/CONTRIBUTING.md) before submitting your [Pull Request](https://github.com/Tencent/tdesign-mobile-vue/pulls).

## Contributors

<a href="https://openomy.app/github/tencent/tdesign-mobile-vue" target="_blank">
  <img src="https://openomy.app/svg?repo=tencent/tdesign-mobile-vue&chart=bubble&latestMonth=12" alt="Contribution Leaderboard" />
</a>

# Feedback

Create your [Github issues](https://github.com/Tencent/tdesign-mobile-vue/issues) or scan the QR code below to join our user groups

<img src="https://raw.githubusercontent.com/Tencent/tdesign/main/packages/site-components/src/images/groups/vue3-group.png" width="200" />

# License

The MIT License. Please see [the license file](./LICENSE) for more information.
