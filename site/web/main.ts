import { createApp } from 'vue';

// @ts-ignore
import TDesign from '@/index';
import 'tdesign-mobile-vue/style/index.js';

import '@tdesign/site-components';
import { registerLocaleChange } from '@tdesign/site-components';
import '@tdesign/site-components/lib/styles/prism-theme-dark.less';
import '@tdesign/site-components/lib/styles/prism-theme.less';
import '@tdesign/site-components/lib/styles/style.css';

import '@tdesign/theme-generator';

import App from './app.vue';
import router from './router';
import Stackblitz from './components/stackblitz/index.vue';
import CodeSandbox from './components/codeSandbox/index.vue';

registerLocaleChange();

const app = createApp(App);

app.component('Stackblitz', Stackblitz);
app.component('CodeSandbox', CodeSandbox);
app.use(TDesign).use(router).mount('#app');
