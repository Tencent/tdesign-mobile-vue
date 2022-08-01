import * as path from 'path';
import createTDesignPlugin from './web/plugin-tdoc';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

const publicPathMap = {
  preview: '/',
  intranet: '/mobile-vue/',
  production: 'https://static.tdesign.tencent.com/mobile-vue/',
};

// 单元测试相关配置
const testConfig = {
  // include:
  //   process.env.NODE_ENV === 'test-snap'
  //     ? ['test/snap/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  //     : ['test/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  include: ['{test,src}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  exclude: ['**/ssr/**'],
  globals: true,
  environment: 'jsdom',
  testTimeout: 5000,
  setupFiles: path.resolve(__dirname, '../scripts/test/test-setup.js'),
  // setupFiles: process.env.NODE_ENV === 'test-snap' ? path.resolve(__dirname, '../scripts/test/test-setup.js') : '',
  transformMode: {
    web: [/\.[jt]sx$/],
  },
  coverage: {
    reporter: ['text', 'json', 'html'],
  },
};

const isCustomElement = (tag) => tag.startsWith('td-');

export default ({ mode }) => {
  return defineConfig({
    base: publicPathMap[mode],
    root: '.',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src'),
        'tdesign-mobile-vue': path.resolve(__dirname, '../src'),
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
            isCustomElement,
          },
        },
      }),
      vueJsx({
        isCustomElement
      }),
      createTDesignPlugin(),
    ],
    test: testConfig,
  });
};
