import { App, Plugin, getCurrentInstance } from 'vue';

export type WithInstallType<T> = T & Plugin;
export const withInstall = <T>(comp: T, alias?: string): T & Plugin => {
  const c = comp as any;

  c.install = (app: App, name?: string) => {
    const defaultName = c.name;
    app.component(alias || name || defaultName, comp);
  };

  return c as T & Plugin;
};

export default withInstall;

export function extendAPI<T = Record<string, any>>(apis: T) {
  const instance = getCurrentInstance();
  if (instance && instance.proxy) {
    Object.assign(instance.proxy, apis);
  }
}
