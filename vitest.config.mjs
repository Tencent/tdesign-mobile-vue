import { defineConfig } from 'vitest/config';
import path from 'path';
import { mergeConfig } from 'vite';

import viteConfig from './site/vite.config.mjs';

const testSnap = process.env.NODE_ENV === 'test-snap';

export default mergeConfig(
  viteConfig({ mode: 'preview' }),
  defineConfig({
    test: {
      include:
        /**
         * 快照涵盖 `__test__/demo.test.jsx`
         * 生成demo测试文件： npm run test:demo
         * 生成快照：npm run test:snap || npm run test:snap-update
         *
         * 测试用例检测 && GUI && 覆盖率报告，涵盖 `__test__/` 下除 demo 外的所有测试文件
         * 单测： npm run test:unit
         * 覆盖率报告： npm run test:unit-coverage
         * GUI：npm run test:unit-gui
         */
        testSnap
          ? [`src/**/__test__/demo.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`]
          : [`src/**/__test__/!(demo).{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`],
      globals: true,
      environment: 'jsdom',
      testTimeout: 5000,
      setupFiles: path.resolve(__dirname, `./scripts/test/${testSnap ? 'snap-' : ''}setup.js`),
      transformMode: {
        web: [/\.[jt]sx$/],
      },
      coverage: {
        reporter: ['text', 'json', 'html'],
        reportsDirectory: 'test/unit/coverage',
        exclude: ['src/**.{js,ts}', 'src/_common/**', 'src/shared/**', 'src/**/{__test__,demos,style}/**'],
        include: ['src/**/*'],
      },
    },
  }),
);
