import { createApp, defineComponent, h, VNode, App, ref, DefineComponent, nextTick } from 'vue';

import Dialog from './dialog.vue';
import { DialogType, DialogPropsType, DialogPropsDefault } from './dialog.interface';

interface DialogFnType extends DialogPropsType {
  onCancel?: () => void,
  onConfirm?: (inputValue: string) => void,
  onClickOverlay?: () => void,
}

let instance: DefineComponent<DialogPropsType>;

function create(props: DialogFnType | string): DefineComponent{
  const visible = ref(false);
  const root = document.createElement('div');
  document.body.appendChild(root);

  const propsObject = {
    ...DialogPropsDefault,
    ...(typeof props === 'string' ? { content: props } : props),
  };

  if (instance) {
    instance.clear();
    // instance = null;
  }

  // eslint-disable-next-line vue/one-component-per-file
  instance = defineComponent({
    render: (): VNode => h(Dialog, {
      ...propsObject,
      visible: visible.value,
      onConfirm: (inputValue: string) => {
        if (typeof propsObject?.onConfirm === 'function') {
          propsObject?.onConfirm(inputValue);
        }
        visible.value = false;
      },
      onCancel: () => {
        if (typeof propsObject?.onCancel === 'function') {
          propsObject?.onCancel();
        }
        visible.value = false;
      },
      onClickOverlay: () => {
        if (typeof propsObject?.onClickOverlay === 'function') {
          propsObject?.onClickOverlay();
        }
        visible.value = false;
      },
      onClosed: () => {
        root.remove();
      },
    }),
  });

  instance.clear = () => {
    root.remove();
  };

  // eslint-disable-next-line vue/one-component-per-file
  createApp(instance).mount(root);

  nextTick(() => {
    visible.value = true;
  });

  return instance;
}


(['show', 'alert', 'confirm'] as DialogType[]).forEach((type: DialogType): void => {
  Dialog[type] = (options: DialogFnType | string) => {
    let props = { content: '', type };

    if (typeof options === 'string') {
      props.content = options;
    } else {
      props = { ...props, ...options };
    }

    return create(props);
  };
});

Dialog.install = (app: App, name = '') => {
  app.component(name || Dialog.name, Dialog);

  // 添加插件入口
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$dialog = Dialog;
};

type DialogApi = {
  /** 通用对话框 */
  show: (options: DialogFnType | string) => void,
  /** 基础对话框 */
  alert: (options: DialogFnType | string) => void,
  /** 选择对话框 */
  confirm: (options: DialogFnType | string) => void,
};

export default (Dialog as unknown) as (Plugin & DialogApi);

declare module '@vue/runtime-core' {
  // Bind to `this` keyword
  interface ComponentCustomProperties {
    $dialog: DialogApi;
  }
}
