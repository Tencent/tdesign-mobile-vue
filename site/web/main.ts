import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import TDesign from '@/index';
import CodeSandbox from './code-sandbox/index.vue';

// import tdesign style
import '@common/style/mobile/_reset.less';
import '@common/style/mobile/index.less';

// import site webcomponents
import 'tdesign-site-components';
import 'tdesign-site-components/lib/styles/style.css';
import 'tdesign-site-components/lib/styles/prism-theme.less';
import 'tdesign-site-components/lib/styles/prism-theme-dark.less';

const app = createApp(App);

app.component('CodeSandbox', CodeSandbox);

app.use(TDesign).use(router).mount('#app');
