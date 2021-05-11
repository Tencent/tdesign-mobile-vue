import { App } from 'vue';

import config from './config';
import * as plugins from './plugins';
import * as components from './components';

const install = function (app: App, option?: Record<string, unknown>): void {
  const newConfig = { ...config, ...option };

  Object.keys(components).forEach((key) => {
    // console.log(newConfig.prefix + key);
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

const version = typeof __VERSION__ === 'undefined' ? '' : __VERSION__;

export { install, version };
export * from './plugins';
export * from './components';
export default { install, version };
