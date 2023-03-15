import { createApp } from 'vue';
import app from './app.vue';
import header from './components/header.vue';
import DemoBlock from './components/demo-block.vue';
import router from './router';

import TDesign from '@/index';
import '../styles/mobile/index.less';

createApp(app)
  .use(TDesign)
  .use(router)
  .component('tdesign-header', header)
  .component('tdesign-demo-block', DemoBlock)
  .mount('#app');
