import { createApp, DefineComponent, ref, App, nextTick } from 'vue';
import { isBrowser } from '../shared';
import _ActionSheet from './action-sheet';
import { TdActionSheetProps } from './type';

let instance: any = null;
let app: App<Element>;

function create(props: Partial<TdActionSheetProps>): DefineComponent<TdActionSheetProps> {
  if (!isBrowser) return;

  const root = document.createElement('div');
  document.body.appendChild(root);

  const visible = ref(false);
  const propsObject = {
    visible,
    ...props,
  };

  if (instance) {
    instance.clear();
  }

  instance = _ActionSheet;

  instance.clear = (trigger: any) => {
    app.unmount();
    root.remove();
    if (propsObject.onClose && trigger && trigger.trigger !== 'overlay') {
      propsObject.onClose(trigger);
    }
    instance = null;
  };
  app = createApp(instance, { ...propsObject });
  app.mount(root);
  nextTick(() => {
    visible.value = true;
  });
  return instance;
}

type ActionSheetApi = {
  /** 关闭ActionSheet */
  close: (trigger?: any) => void;
  /** 显示ActionSheet */
  show: (props: Partial<TdActionSheetProps>) => void;
};

export const ActionSheetPlugin: ActionSheetApi = {
  show(props: Partial<TdActionSheetProps>) {
    create(props);
  },
  close(trigger?: any) {
    if (instance) {
      instance.clear(trigger);
    }
  },
};
