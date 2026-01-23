import { createApp, h, App, reactive, nextTick } from 'vue';
import { isBrowser } from '../shared';
import _ActionSheet from './action-sheet';
import { TdActionSheetProps } from './type';

let instance: any = null;
let app: App<Element>;
let root: HTMLElement;

function create(props: Partial<TdActionSheetProps>): any {
  if (!isBrowser) return;

  if (instance) {
    instance.close();
    // 等待上一次的清理完成
    nextTick(() => {
      createInstance(props);
    });
    return;
  }

  createInstance(props);
}

function createInstance(props: Partial<TdActionSheetProps>): any {
  root = document.createElement('div');
  document.body.appendChild(root);

  const params = reactive({
    visible: false,
    ...props,
  });

  instance = {
    close: (trigger?: any) => {
      params.visible = false;
      nextTick(() => {
        app.unmount();
        root.remove();
        instance = null;
      });
      if (props.onClose && trigger && trigger.trigger !== 'overlay') {
        props.onClose(trigger);
      }
    },
  };

  app = createApp(() => h(_ActionSheet, params));
  app.mount(root);

  nextTick(() => {
    params.visible = true;
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
      instance.close(trigger);
    }
  },
};
