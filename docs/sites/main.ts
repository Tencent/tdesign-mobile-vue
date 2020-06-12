import { createApp } from 'vue';
import app from './app.vue';
import router from './router';
import TDesignDemo from './components/demo.vue';

import TDesign from '@/index';

import '../../common/style/mobile/index.less';
import '../styles/sites/index.less';


createApp(app)
  .use(TDesign)
  .use(router)
  .component('tdesign-demo', TDesignDemo)
  .mount('#app');
