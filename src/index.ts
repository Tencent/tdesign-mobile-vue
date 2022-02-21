import { App } from 'vue';

import * as components from './components';

const install = function (app: App, option?: Record<string, unknown>): void {
  Object.keys(components).forEach((key) => {
    app.use(components[key], option);
  });
};

// eslint-disable-next-line no-undef
const version = typeof __VERSION__ === 'undefined' ? '' : __VERSION__;

export { install, version };
export * from './plugins';
export * from './components';
export default { install, version };
