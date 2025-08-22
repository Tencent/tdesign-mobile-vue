import * as path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import changelog2Json from './web/plugins/changelog-to-json';
import tdocPlugin from './web/plugins/plugin-tdoc';
import siteMetadata from './web/plugins/site-metadata';

const resolvePath = (r) => path.resolve(__dirname, r);

const publicPathMap = {
  preview: '/',
  intranet: '/mobile-vue/',
  production: 'https://static.tdesign.tencent.com/mobile-vue/',
};

const isCustomElement = (tag) => tag.startsWith('td-');

// Rollup 4+ 的 tree-shaking 策略调整, 这里是为了让样式在站点构建正常
const disableTreeShakingPlugin = (paths) => ({
  name: 'disable-treeshake',
  transform(code, id) {
    for (const path of paths) {
      if (id.includes(path)) {
        return { code, map: null, moduleSideEffects: 'no-treeshake' };
      }
    }
  },
});

export default ({ mode }) => {
  return defineConfig({
    base: publicPathMap[mode],
    root: '.',
    resolve: {
      alias: {
        '@': resolvePath('../src'),
        '@docs': resolvePath('./docs'),
        '@common': resolvePath('../src/_common'),
        'tdesign-mobile-vue/es': resolvePath('../src'),
        'tdesign-mobile-vue': resolvePath('../src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 18000,
      open: '/',
      https: false,
    },
    build: {
      outDir: '../_site',
      rollupOptions: {
        input: {
          sites: 'index.html',
          mobile: 'mobile.html',
        },
      },
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement,
          },
        },
      }),
      vueJsx({
        isCustomElement,
      }),
      tdocPlugin(),
      changelog2Json(),
      siteMetadata(),
      disableTreeShakingPlugin(['style/', 'toast/']),
    ],
  });
};
