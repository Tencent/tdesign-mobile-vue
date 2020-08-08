/*
 * @Author: your name
 * @Date: 2020-05-25 16:40:09
 * @LastEditTime: 2020-06-06 20:46:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tdesign-mobile-vue/src/index.ts
 */
import { App } from 'vue';

import config from './config';
import * as plugins from './plugins';
import * as components from './components';

import '../common/style/mobile/';

const install = function (app: App, option?: object): void {
  const newConfig = { ...config, ...option };

  Object.keys(components).forEach((key) => {
    console.log(newConfig.prefix + key);
    app.component(newConfig.prefix + key, components[key]);
  });

  Object.keys(plugins).forEach((key) => {
    app.use(plugins[key]);
  });
};

// install
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue);
// }

const version = typeof VERSION === "undefined" ? "" : VERSION // eslint-disable-line

export { install, version };
export * from './plugins';
export * from './components';
export default { install, version };
