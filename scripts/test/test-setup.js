import { config } from '@vue/test-utils';
import { createApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import TDesign from '@/index';
import DemoBlock from '../../site/mobile/components/demo-block.vue';

config.global.plugins = [TDesign];
config.global.components = {
  'tdesign-demo-block': DemoBlock,
};

config.global.createSSRApp = (comp) => {
  const app = createApp(comp);
  app.config.globalProperties.$route = {};
  app.use(TDesign).component('tdesign-demo-block', DemoBlock);
  const html = renderToString(app);
  return html;
};
