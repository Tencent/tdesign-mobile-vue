import { createApp, DefineComponent, ref, App, nextTick } from 'vue';
import _ActionSheet from './action-sheet';
import { withInstall, WithInstallType, isBrowser } from '../shared';

import './style';
import { TdActionSheetProps } from './type';

export * from './type';
export type ActionSheetProps = TdActionSheetProps;

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

const ActionSheetPlugin = {
  show(props: Partial<TdActionSheetProps>) {
    create(props);
  },
  close(trigger?: any) {
    if (instance) {
      instance.clear(trigger);
    }
  },
  install(app: App, options?: Record<string, unknown>) {
    const name = (options?.name as string) || _ActionSheet.name;
    app.component(name, _ActionSheet);
  },
} as ActionSheetApi & { install: (app: App, options?: Record<string, unknown>) => void };

// 导出 Vue 组件 (用于按需引入作为组件使用)
export const ActionSheet: WithInstallType<typeof _ActionSheet> = withInstall(_ActionSheet);

// 导出函数式调用 API (用于按需引入作为函数使用)
export { ActionSheetPlugin };

export default ActionSheet;
