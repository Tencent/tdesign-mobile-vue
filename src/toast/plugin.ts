import { createApp, App, DefineComponent } from 'vue';
import { isObject } from 'lodash-es';
import Toast from './toast';
import { ToastOptions } from './type';
import { isBrowser } from '../shared';
import { getAttach } from '../shared/dom';

export type ToastProps = ToastOptions;

let instance: any = null;
let app: App<Element>;

/** 展示提示 */
export function ToastPlugin(props: string | Partial<ToastOptions>): DefineComponent<ToastOptions> {
  if (!isBrowser) return;
  const root = document.createElement('div');

  const container = getAttach(isObject(props) ? props.attach : 'body');
  if (container) {
    container.appendChild(root);
  } else {
    console.error('attach is not exist');
  }

  const propsObject = {
    duration: 2000,
    ...parseOptions(props),
  };

  instance?.clear();
  instance = Toast;

  instance.clear = () => {
    clearTimeout(instance.timer);
    app.unmount();
    root.remove();
    if (propsObject.onClose) {
      propsObject.onClose();
    }
    instance = null;
  };

  if (propsObject.duration && propsObject.duration > 0) {
    instance.timer = setTimeout(() => {
      instance.clear();
      if (propsObject.onDestroy) {
        propsObject.onDestroy();
      }
    }, propsObject.duration);
  }

  app = createApp(instance, { ...propsObject });
  app.mount(root);

  return instance;
}

/** 关闭提示 */
ToastPlugin.clear = () => instance?.clear();

/** 展示失败提示 */
ToastPlugin.error = (options: ToastOptions | string) => ToastPlugin({ ...parseOptions(options), theme: 'error' });

/** 展示加载提示 */
ToastPlugin.loading = (options: ToastOptions | string) => ToastPlugin({ ...parseOptions(options), theme: 'loading' });

/** 展示警告提示 */
ToastPlugin.warning = (options: ToastOptions | string) => ToastPlugin({ ...parseOptions(options), theme: 'warning' });

/** 展示成功提示 */
ToastPlugin.success = (options: ToastOptions | string) => ToastPlugin({ ...parseOptions(options), theme: 'success' });

function parseOptions(message?: Partial<ToastOptions> | string) {
  if (typeof message === 'string') {
    return { message };
  }
  return message;
}

ToastPlugin.install = (app: App) => {
  app.config.globalProperties.$toast = ToastPlugin;
};

export default ToastPlugin;

declare module 'vue' {
  // Bind to `this` keyword
  export interface ComponentCustomProperties {
    $toast: typeof ToastPlugin;
  }
}
