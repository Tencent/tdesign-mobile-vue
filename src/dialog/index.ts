import { createApp, defineComponent, h, VNode, App, ref, DefineComponent, nextTick } from 'vue';

import Dialog from './dialog.vue';
import { WithInstallType } from '../shared';
import { DialogCloseContext, TdDialogProps } from './type';

import './style';

export type DialogType = 'alert' | 'confirm' | 'show';

export const DialogPropsDefault = {
  title: '温馨提醒',
  content: '',
  type: '',
  showFooter: true,
  placeholderText: '',
  confirmBtn: '确认',
  cancelContent: '取消',
  isInput: false,
  visible: false,
  knowContent: '我知道了',
  zIndex: 2500,
  showOverlay: true,
  width: '320px',
};

let instance: DefineComponent;

function create(props: Partial<TdDialogProps> | string): DefineComponent {
  const visible = ref(false);
  const root = document.createElement('div');
  document.body.appendChild(root);

  const propsObject = {
    ...DialogPropsDefault,
    ...(typeof props === 'string' ? { content: props } : props),
  };

  if (instance) {
    instance.clear();
    // instance = null;
  }

  // eslint-disable-next-line vue/one-component-per-file
  instance = defineComponent({
    render: (): VNode =>
      // @ts-ignore
      h(Dialog, {
        ...propsObject,
        visible: visible.value,
        onConfirm: (context: { e: MouseEvent }) => {
          if (typeof propsObject.onConfirm === 'function') {
            propsObject.onConfirm(context);
          }
          visible.value = false;
        },
        onCancel: (context: { e: MouseEvent }) => {
          if (typeof propsObject.onCancel === 'function') {
            propsObject.onCancel(context);
          }
          visible.value = false;
        },
        onOverlayClick: (context: { e: MouseEvent }) => {
          if (typeof propsObject.onOverlayClick === 'function') {
            propsObject.onOverlayClick(context);
          }
          visible.value = false;
        },
        onClose: (context: DialogCloseContext) => {
          root.remove();
          if (typeof propsObject.onClose === 'function') {
            propsObject.onClose(context);
          }
        },
      }),
  });

  instance.clear = () => {
    root.remove();
  };

  // eslint-disable-next-line vue/one-component-per-file
  createApp(instance).mount(root);

  nextTick(() => {
    visible.value = true;
  });

  return instance;
}

(['show', 'alert', 'confirm'] as DialogType[]).forEach((type: DialogType): void => {
  Dialog[type] = (options: Partial<TdDialogProps> | string) => {
    let props: any = { content: '', type };

    if (typeof options === 'string') {
      props.content = options;
    } else {
      props = { ...props, ...options };
    }

    return create(props);
  };
});

Dialog.install = (app: App, name = '') => {
  app.component(name || Dialog.name, Dialog);

  // 添加插件入口
  app.config.globalProperties.$dialog = Dialog;
};

type DialogApi = {
  /** 通用对话框 */
  show: (options: TdDialogProps | string) => void;
  /** 基础对话框 */
  alert: (options: TdDialogProps | string) => void;
  /** 选择对话框 */
  confirm: (options: TdDialogProps | string) => void;
};

export const DialogPlugin: WithInstallType<typeof Dialog> & DialogApi = Dialog as any;
export default DialogPlugin;

declare module '@vue/runtime-core' {
  // Bind to `this` keyword
  export interface ComponentCustomProperties {
    $dialog: DialogApi;
  }
}
