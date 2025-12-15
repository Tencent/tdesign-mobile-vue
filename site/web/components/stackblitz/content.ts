import orgPkg from '../../../../package.json';

export const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="icon" href="/favicon.ico">
      <title>TDesign</title>
      <!--[if lte IE 9]>
      <style>
        #app {
          display: none;
        }
      </style>
      <![endif]-->
    </head>

    <body>
      <!--[if lte IE 9]>
        <h1 style="position: absolute; width: 100%; text-align:center; top: 45%">请使用 IE 10 以及更新版本的浏览器访问，建议使用 <a href="https://www.google.cn/chrome/">Chrome</a></h1>
      <![endif]-->

      <div id="app"></div>
      <script type="module" src="/src/main.js"></script>
    </body>

  </html>
`;

export const mainJsContent = `
  import { createApp } from 'vue';
  import TDesign from 'tdesign-mobile-vue';
  import Demo from './demo.vue';

  import './index.css';

  const app = createApp(Demo);

  app.use(TDesign).mount('#app');
`;

export const styleContent = `
  /* 竖排展示 demo 行间距 16px */
  .tdesign-demo-block-column {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }

  /* 竖排展示 demo 行间距 32px */
  .tdesign-demo-block-column-large {
    display: flex;
    flex-direction: column;
    row-gap: 32px;
  }

  /* 横排排展示 demo 列间距 16px */
  .tdesign-demo-block-row {
    display: flex;
    column-gap: 16px;
    align-items: center;
  }
`;

export const stackblitzRc = `
  {
    "installDependencies": false,
    "startCommand": "pnpm install && pnpm dev"
  }
`;

export const viteConfigContent = `
  import { defineConfig } from 'vite';
  import vue from '@vitejs/plugin-vue';
  import vueJsx from '@vitejs/plugin-vue-jsx';

  export default defineConfig({
    plugins: [vue(), vueJsx()],
  });
`;

export const packageJSONContent = JSON.stringify(
  {
    name: 'tdesign-mobile-vue-demo',
    version: '0.0.0',
    private: true,
    scripts: {
      dev: 'vite',
      build: 'vite build',
      serve: 'vite preview',
    },
    dependencies: {
      less: orgPkg.devDependencies['less'],
      vue: orgPkg.devDependencies.vue,
      'tdesign-mobile-vue': orgPkg.version,
      'tdesign-icons-vue-next': orgPkg.dependencies['tdesign-icons-vue-next'],
    },
    devDependencies: {
      vite: orgPkg.devDependencies.vite,
      '@vitejs/plugin-vue': orgPkg.devDependencies['@vitejs/plugin-vue'],
      '@vitejs/plugin-vue-jsx': orgPkg.devDependencies['@vitejs/plugin-vue-jsx'],
    },
  },
  null,
  2,
);
