import { createApp, App, DefineComponent } from 'vue';
import vueToast from './toast.vue';
import { TdToastProps } from './type';
import { WithInstallType } from '../shared';

import './style';

let instance: any = null;

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
    root.remove();
  };

  if (propsObject.duration && propsObject.duration > 0) {
    instance.timer = setTimeout(instance.clear, propsObject.duration);
  }

  createApp(instance, { ...propsObject }).mount(root);

  return instance;
}

Toast.clear = () => {
  if (instance) {
    instance.clear();
  }
};

(['loading', 'success', 'fail'] as TdToastProps['type'][]).forEach((type): void => {
  Toast[type] = (options: TdToastProps | string) => {
    let props = { message: '', type } as unknown as TdToastProps;

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
  app.config.globalProperties.$toast = Toast;
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
