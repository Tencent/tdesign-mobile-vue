import { createApp } from 'vue';
import { VueClipboard }from '@soerenmartius/vue3-clipboard'
import app from './app.vue';
import router from './router';
import TDesignDemo from './components/demo.vue';
import ComponentContributors from './components/component-contributors.vue';
import HeaderLink from './components/header-link.vue';
import TDesign from '@/index';

import '../../common/style/mobile/index.less';
import '../../common/style/site/index.less';
import '../styles/sites/index.less';
import 'prismjs/themes/prism.css';

createApp(app)
  .use(TDesign)
  .use(router)
  .use(VueClipboard)
  .component('tdesign-demo', TDesignDemo)
  .component('tdesign-component-contributors', ComponentContributors)
  .component('header-link', HeaderLink)
  .mount('#app');
