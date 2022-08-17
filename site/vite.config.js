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
  include:
    /**
     * 快照涵盖 `__test__/*.test.jsx`
     * 生成demo测试文件： npm run test:demo
     * 生成快照：npm run test:snap || npm run test:snap-update
     *
     * 测试用例检测 && GUI && 覆盖率报告，仅涵盖 `__test__/index.test.jsx`
     * 单测： npm run test:unit
     * 覆盖率报告： npm run test:unit-coverage
     * GUI：npm run test:unit-gui
     */
    process.env.NODE_ENV === 'test-snap'
      ? ['src/**/__test__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
      : ['src/**/__test__/index.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  globals: true,
  environment: 'jsdom',
  testTimeout: 5000,
  setupFiles: process.env.NODE_ENV === 'test-snap' ? path.resolve(__dirname, '../scripts/test/test-setup.js') : '',
  transformMode: {
    web: [/\.[jt]sx$/],
  },
  coverage: {
    reporter: ['text', 'json', 'html'],
    reportsDirectory: 'test/unit/coverage',
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
