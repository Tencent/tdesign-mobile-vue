import { createApp, App, h, ref, nextTick } from 'vue';
import Drawer from './drawer';
import { isBrowser } from '../shared';
import { TdDrawerProps } from './type';

type DrawerOptions = Omit<TdDrawerProps, 'attach'>;

export const DrawerPlugin = (options: DrawerOptions) => {
  if (!isBrowser) return;
  const root = document.createElement('div');
  document.body.appendChild(root);
  const visible = ref(false);
  const props = ref({});
  const destroyOnClose = ref(false);

  createApp(() =>
    h(Drawer, { ...options, visible: visible.value, destroyOnClose: destroyOnClose.value, ...props.value }),
  ).mount(root);

  const handler = {
    destroy() {
      destroyOnClose.value = true;
      nextTick(() => {
        visible.value = false;
        document.body.removeChild(root);
      });
    },
    hide() {
      visible.value = false;
    },
    show() {
      visible.value = true;
    },
    update(options: DrawerOptions) {
      props.value = options;
    },
  };

  return handler;
};

DrawerPlugin.install = (app: App): void => {
  app.config.globalProperties.$drawer = DrawerPlugin;
};

export default DrawerPlugin;
