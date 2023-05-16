import { createApp, App, h, ref } from 'vue';
import vueDrawer from './drawer.vue';
import { WithInstallType } from '../shared';
import { TdDrawerProps } from './type';

import './style';

type DrawerOptions = Omit<TdDrawerProps, 'attach'>;

const Drawer = (options: DrawerOptions) => {
  const root = document.createElement('div');
  document.body.appendChild(root);
  const visible = ref(false);

  createApp(() => h(vueDrawer, { ...options, visible: visible.value })).mount(root);

  const handler = {
    destroy() {},
    hide() {
      visible.value = false;
    },
    show() {
      visible.value = true;
    },
    update(options: DrawerOptions) {},
  };

  return handler;
};

Drawer.install = (app: App, name = '') => {
  app.component(name || vueDrawer.name, vueDrawer);

  // 添加插件入口
  app.config.globalProperties.$drawer = Drawer;
  app.provide('$drawer', Drawer);
};

const _Drawer: WithInstallType<typeof Drawer> = Drawer;

export default _Drawer;

export * from './type';
