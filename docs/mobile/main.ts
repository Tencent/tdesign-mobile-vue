import { createApp } from 'vue';
import app from './app.vue';
import router from './router';

import TDesign from '@/index';

import '../../common/style/mobile/index.less';
import '../styles/mobile/index.less';

createApp(app)
  .use(TDesign)
  .use(router)
  .mount('#app');
