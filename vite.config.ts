import * as path from 'path';
import { createTDesignPlugin } from './docs/sites/plugin-tdoc/';
import vue from '@vitejs/plugin-vue';

module.exports = {
  base: process.env.NODE_ENV === 'production' ? '/vue-mobile/' : './',
  root: './docs',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@common': path.resolve(__dirname, 'common'),
      '@TdTypes': path.resolve(__dirname, 'types'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 18000,
    open: '/',
    https: false,
  },
  build: {
    rollupOptions: {
      input: {
        sites: './docs/index.html',
        mobile: './docs/mobile.html',
      },
    },
  },
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('td-')
      }
    }
  }), ...createTDesignPlugin()],
};
