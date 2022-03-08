import * as path from 'path';
import createTDesignPlugin from './web/plugin-tdoc';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const publicPathMap = {
  preview: '/',
  intranet: '/mobile-vue/',
  production: 'https://static.tdesign.tencent.com/mobile-vue/',
};

export default ({ mode }) => {
  return defineConfig({
    base: publicPathMap[mode],
    root: '.',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src'),
        'tdesign-moile-vue': path.resolve(__dirname, '../src'),
        '@common': path.resolve(__dirname, '../src/_common'),
      },
    },
    server: {
      host: '127.0.0.1',
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
            isCustomElement: (tag) => tag.startsWith('td-'),
          },
        },
      }),
      createTDesignPlugin(),
    ],
  });
};
