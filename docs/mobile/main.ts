import { createApp } from 'vue';
import app from './app.vue';
import header from './components/header.vue';
import router from './router';

import TDesign from '@/index';

import '../../src/_common/style/mobile/_reset.less';
import '../../src/_common/style/mobile/index.less';
import '../styles/mobile/index.less';

createApp(app)
  .use(TDesign)
  .use(router)
  .component('tdesign-header', header)
  .mount('#app');
