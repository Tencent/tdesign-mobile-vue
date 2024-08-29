import { createApp, App, DefineComponent } from 'vue';
import isObject from 'lodash/isObject';
import vueToast from './toast';
import { ToastOptions } from './type';
import { WithInstallType, isBrowser } from '../shared';
import { getAttach } from '../shared/dom';

export type ToastProps = ToastOptions;

let instance: any = null;
let app: App<Element>;

/** 展示提示 */
function Toast(props: string | Partial<ToastOptions>): DefineComponent<ToastOptions> {
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

  if (instance) {
    instance.clear();
  }

  instance = vueToast;

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

Toast.clear = () => {
  if (instance) {
    instance.clear();
  }
};

(['loading', 'success', 'error'] as ToastOptions['theme'][]).forEach((type): void => {
  if (!type) {
    return;
  }
  Toast[type] = (options: ToastOptions | string) => {
    let props = { message: '', theme: type } as unknown as ToastOptions;

    if (typeof options === 'string') {
      props.message = options;
    } else {
      props = { ...props, ...options };
    }

    return Toast(props);
  };
});

function parseOptions(message?: Partial<ToastOptions> | string) {
  if (typeof message === 'string') {
    return { message };
  }
  return message;
}

Toast.install = (app: App) => {
  // 添加插件入口
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$toast = Toast as any;
};

type ToastApi = {
  /** 展示提示 */
  (options?: Partial<ToastOptions> | string): void;
  /** 展示加载提示 */
  loading: (options?: Partial<ToastOptions> | string) => void;
  /** 展示成功提示 */
  success: (options?: Partial<ToastOptions> | string) => void;
  /** 展示失败提示 */
  error: (options?: Partial<ToastOptions> | string) => void;
  /** 关闭提示 */
  clear: () => void;
};

export const ToastPlugin: WithInstallType<typeof vueToast> & ToastApi = Toast as any;
export default ToastPlugin;

declare module '@vue/runtime-core' {
  // Bind to `this` keyword
  export interface ComponentCustomProperties {
    $toast: ToastApi;
  }
}
