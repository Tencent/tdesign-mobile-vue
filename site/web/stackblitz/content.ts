import orgPkg from '../../../package.json';

export const htmlContent = `
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
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
    "installDependencies": true,
    "startCommand": "npm run dev"
  }
`;

export const viteConfigContent = `
  import { defineConfig } from 'vite';
  import vue from '@vitejs/plugin-vue';

  export default defineConfig({
    plugins: [vue()],
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
      vue: orgPkg.devDependencies.vue,
      'tdesign-mobile-vue': orgPkg.version,
      'tdesign-icons-vue-next': orgPkg.dependencies['tdesign-icons-vue-next'],
    },
    devDependencies: {
      vite: orgPkg.devDependencies.vite,
      '@vue/compiler-sfc': orgPkg.devDependencies['@vue/compiler-sfc'],
      '@vitejs/plugin-vue': orgPkg.devDependencies['@vitejs/plugin-vue'],
      'less': orgPkg.devDependencies['less']
    },
  },
  null,
  2,
);
