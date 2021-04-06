import { App, Plugin } from 'vue';

export const withInstall = <T>(comp: T): T & Plugin => {
  const c = comp as any;

  c.install = function (app: App, name = '') {
    app.component(name || c.name, comp);
  };

  return comp as T & Plugin;
};
