import Dialog from './dialog.vue';
import { PolySymbol } from '../_utils';

import { createApp, defineComponent, h, VNode, App, ref, DefineComponent, nextTick } from 'vue';
import { DialogType, DialogPropsType, DialogPropsDefault } from './dialog.interface';

let instance: DefineComponent;
function create(props: DialogPropsType): DefineComponent{
  const visible = ref(false);
  const root: HTMLElement = document.createElement('div');
  document.body.appendChild(root);

  const propsObject = {
    ...DialogPropsDefault,
    ...parseOptions(props),
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
      onConfirm: () => {
        visible.value = false;
      },
      onCancel: () => {
        visible.value = false;
      },
      onClickoverlay: () => {
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
  Dialog[type] = (options: DialogPropsType | string) => {
    let props: DialogPropsType = {
      content: '',
      type,
    };

    if (typeof options === 'string') {
      props.content = options;
    } else {
      props = { ...props, ...options };
    }

    return create(props);
  };
});

function parseOptions(op: any) {
  if (typeof op === 'string') {
    return { op };
  }
  return op;
}

Dialog.install = (app: App) => {
  // 添加插件入口
  const dialogKey = PolySymbol<typeof Dialog>('dialog');
  app.provide(dialogKey, Dialog);
};

type DialogFnType = {
  [k in DialogType]: (options:  DialogPropsType  | string) => void;
};
export default (Dialog as unknown) as Plugin & DialogFnType;
