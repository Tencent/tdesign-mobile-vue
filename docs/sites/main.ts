import { createApp } from 'vue';
import app from './app.vue';
import router from './router';
import TDesignDemo from './components/demo.vue';
import ComponentContributors from './components/component-contributors.vue';

import TDesign from '@/index';

import '../../common/style/mobile/index.less';
import '@/../common/style/site/index.less';
import '../styles/sites/index.less';

createApp(app)
  .use(TDesign)
  .use(router)
  .component('tdesign-demo', TDesignDemo)
  .component('tdesign-component-contributors', ComponentContributors)
  .mount('#app');
