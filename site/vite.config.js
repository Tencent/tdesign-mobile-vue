import * as path from 'path';
import createTDesignPlugin from './web/plugin-tdoc';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

const resolvePath = (r) => path.resolve(__dirname, r);

const publicPathMap = {
  preview: '/',
  intranet: '/mobile-vue/',
  production: 'https://static.tdesign.tencent.com/mobile-vue/',
};

const isCustomElement = (tag) => tag.startsWith('td-');

export default ({ mode }) => {
  return defineConfig({
    base: publicPathMap[mode],
    root: '.',
    resolve: {
      alias: {
        '@': resolvePath('../src'),
        '@docs': resolvePath('./docs'),
        '@common': resolvePath('../src/_common'),
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
      createTDesignPlugin(),
    ],
  });
};
