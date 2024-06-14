import { createApp, h, App, ref, nextTick, reactive } from 'vue';

import Dialog from './dialog';
import { WithInstallType, isBrowser } from '../shared';
import { DialogCloseContext, TdDialogProps, DialogInstance } from './type';

import './style';

export type DialogType = 'alert' | 'confirm' | 'show';

export const DialogPropsDefault = {
  title: '',
  content: '',
  confirmBtn: '',
  cancelBtn: '',
  visible: false,
  zIndex: 2500,
  showOverlay: true,
  width: '320px',
  closeOnOverlayClick: false,
};

const propsFn = ['onConfirm', 'onCancel', 'onOverlayClick', 'onClose', 'onClosed'] as const;
type DialogPropsFnName = (typeof propsFn)[number];

function create(options: Partial<TdDialogProps> | string): DialogInstance {
  if (!isBrowser) return;

  const root = document.createElement('div');
  document.body.appendChild(root);

  const props = ref<Partial<TdDialogProps>>({});
  const propsObject = {
    ...DialogPropsDefault,
    ...(typeof options === 'string' ? { content: options } : options),
  };

  function callFn<T>(fnType: DialogPropsFnName, context?: T): void {
    const fn = props.value[fnType] || propsObject[fnType];
    typeof fn === 'function' && fn(context as any);
  }

  const params = reactive({
    ...propsObject,
    onConfirm: (context: { e: MouseEvent }) => {
      callFn('onConfirm', context);
      params.visible = false;
    },
    onCancel: (context: { e: MouseEvent }) => {
      callFn('onCancel', context);
      params.visible = false;
    },
    onOverlayClick: (context: { e: MouseEvent }) => {
      callFn('onOverlayClick', context);
      params.visible = false;
    },
    onClose: (context: DialogCloseContext) => {
      callFn('onClose', context);
      root.remove();
    },
    onClosed: () => {
      callFn('onClosed');
      // 卸载创建的app
      params.destroyOnClose && app.unmount();
    },
  });

  const app = createApp(() => h(Dialog, params));
  app.mount(root);

  const handler = {
    destroy() {
      params.destroyOnClose = true;
      nextTick(() => {
        params.visible = false;
        root.remove();
      });
    },
    hide() {
      params.visible = false;
    },
    show() {
      params.visible = true;
    },
    update(options: Partial<TdDialogProps> | string) {
      if (typeof options === 'string') {
        params.content = options;
      } else {
        for (const key in options) {
          if (propsFn.includes(key as DialogPropsFnName)) {
            props.value[key] = options[key];
          } else {
            params[key] = options[key];
          }
        }
      }
    },
  };

  nextTick(() => (params.visible = true));

  return handler;
}

(['show', 'alert', 'confirm'] as DialogType[]).forEach((type: DialogType): void => {
  Dialog[type] = (options: Partial<TdDialogProps> | string): DialogInstance => {
    let props: any = { content: '' };

    if (typeof options === 'string') {
      props.content = options;
    } else {
      props = { ...props, ...options };
    }

    if (type === 'alert') {
      props.cancelBtn = null;
    }

    return create(props);
  };
});

Dialog.install = (app: App, name = '') => {
  app.component(name || Dialog.name, Dialog);

  // 添加插件入口
  app.config.globalProperties.$dialog = Dialog as any;
  app.provide('$dialog', Dialog);
};

type DialogApi = {
  /** 通用对话框 */
  show: (options: Partial<TdDialogProps> | string) => DialogInstance;
  /** 基础对话框 */
  alert: (options: Partial<TdDialogProps> | string) => DialogInstance;
  /** 选择对话框 */
  confirm: (options: Partial<TdDialogProps> | string) => DialogInstance;
};

export const DialogPlugin: WithInstallType<typeof Dialog> & DialogApi = Dialog as any;
export default DialogPlugin;

declare module '@vue/runtime-core' {
  // Bind to `this` keyword
  export interface ComponentCustomProperties {
    $dialog: DialogApi;
  }
}
