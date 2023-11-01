---
title: Vue3 for Mobile
description: TDesign Mobile Vue is a UI component library for Vue 3 and mobile application.
spline: explain
---



<div style="background: rgba(0, 168, 112, .1); display: flex; align-items: center; line-height: 20px; padding: 14px 24px; border-radius: 3px; color: #555a65">
  <svg fill="none" viewBox="0 0 16 16" width="16px" height="16px" style="margin-right: 5px">
    <path fill="#00a870" d="M8 15A7 7 0 108 1a7 7 0 000 14zM7.4 4h1.2v1.2H7.4V4zm.1 2.5h1V12h-1V6.5z" fillOpacity="0.9"></path>
  </svg>
  TDesign Mobile Vue is currently in the Beta stage, and it is undergoing rapid iteration, please pay attention to version changes.
</div>

## Installation

### npm

```bash
npm i tdesign-mobile-vue
```

### unpkg

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


The package of tdesign-vue-next provides kinds of bundles, read [the documentation](https://github.com/Tencent/tdesign/blob/main/docs/develop-install.md) for the detail of differences between bundles.


## Usage

TDesign provides three ways to use components

### Basic Usage

Basic usage will register all components in full. If your project uses components on a large scale, feel free to use tdesign-mobile-vue in this way.

```js
import { createApp } from 'vue';
import TDesign from 'tdesign-mobile-vue';
import App from './app.vue';

// import global design variables
import 'tdesign-mobile-vue/es/style/index.css';

const app = createApp(App);
app.use(TDesign);
```

### Import on-demand

If you have strict requirements for the size of the bundle, you can use tdesign-mobile-vue in this way.

With the help of building tools such as `Webpack` or `Rollup` that support tree-shaking features, you can achieve the effect of importing on demand.


```js
import { createApp } from 'vue';
import { Button as TButton } from 'tdesign-mobile-vue';
import App from './app.vue';

// import global design variables
import 'tdesign-mobile-vue/es/style/index.css';

const app = createApp(App);
app.use(TButton);
```

### Import on-demand with Plugin

You can also use `unplugin-vue-components` and `unplugin-auto-import` to achieve automatic on-demand import.

```js
import { createApp } from 'vue';
// import global design variables
import 'tdesign-mobile-vue/es/style/index.css';

const app = createApp(App);
```

install `unplugin-vue-components` and `unplugin-auto-import`

```bash
npm install -D unplugin-vue-components unplugin-auto-import
```

Then, add the above plugins to the corresponding configuration files of Webpack or Vite.

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

> You can click on this [link](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/tdesign.ts#L4) for the configuration supported by `TDesignResolver`.



## Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/> iOS Safari| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |[<img src="https://user-images.githubusercontent.com/51158141/189169679-71e045f6-9b9b-4baf-8b9f-e045a40216f5.png" alt="Android Browser" width="24px" height="24px" />]()<br/>Android Browser|
| --------- | --------- | --------- | --------- | --------- |--------- |
| Firefox >=104| Chrome >=105| iOS Safari >=12.2| Samsung >=10.2 | Opera >=64 | Android Browser >=105 |

Read our [browser compatibility](https://github.com/Tencent/tdesign/wiki/Browser-Compatibility) for more details.

## FAQ

Q: Does TDesign have a built-in reset style for unifying the default styles of page elements?

A: Since version `0.17.0`, tdesign-mobile-vue no longer imports `reset.less`.

If your project development depends on the `reset` style, you can import it from the `dist` directory.

```js
import 'tdesign-mobile-vue/dist/reset.css';
```
