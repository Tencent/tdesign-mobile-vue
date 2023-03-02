import { createApp, App, DefineComponent } from 'vue';
import vueToast from './toast.vue';
import { TdToastProps } from './type';
import { WithInstallType } from '../shared';

import './style';

export * from './type';
export type ToastProps = TdToastProps;

let instance: any = null;
let app: App<Element>;

/** 展示提示 */
function Toast(props: string | Partial<TdToastProps>): DefineComponent<TdToastProps> {
  const root = document.createElement('div');
  document.body.appendChild(root);

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
  };

  if (propsObject.duration && propsObject.duration > 0) {
    instance.timer = setTimeout(instance.clear, propsObject.duration);
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

(['loading', 'success', 'fail'] as TdToastProps['theme'][]).forEach((type): void => {
  if (!type) {
    return;
  }
  Toast[type] = (options: TdToastProps | string) => {
    let props = { message: '', theme: type } as unknown as TdToastProps;

    if (typeof options === 'string') {
      props.message = options;
    } else {
      props = { ...props, ...options };
    }

    return Toast(props);
  };
});

function parseOptions(message?: Partial<TdToastProps> | string) {
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
  (options?: Partial<TdToastProps> | string): void;
  /** 展示加载提示 */
  loading: (options?: Partial<TdToastProps> | string) => void;
  /** 展示成功提示 */
  success: (options?: Partial<TdToastProps> | string) => void;
  /** 展示失败提示 */
  fail: (options?: Partial<TdToastProps> | string) => void;
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
