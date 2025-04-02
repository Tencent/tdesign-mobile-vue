import { createApp } from 'vue';

import TDesign from '@/index';
import 'tdesign-mobile-vue/style/index.js';

import 'tdesign-site-components';
import { registerLocaleChange } from 'tdesign-site-components';
import 'tdesign-site-components/lib/styles/prism-theme-dark.less';
import 'tdesign-site-components/lib/styles/prism-theme.less';
import 'tdesign-site-components/lib/styles/style.css';

import 'tdesign-icons-view';
import 'tdesign-theme-generator';

import App from './app.vue';
import router from './router';
import Stackblitz from './stackblitz/index.vue';

registerLocaleChange();

const app = createApp(App);

app.component('Stackblitz', Stackblitz);

app.use(TDesign).use(router).mount('#app');
