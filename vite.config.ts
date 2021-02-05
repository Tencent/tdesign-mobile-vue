import * as path from 'path';
import { createTDesignPlugin } from './docs/sites/common/';
import vue from '@vitejs/plugin-vue';

module.exports = {
  base: process.env.NODE_ENV === 'development' ? './' : '/vue-mobile/',
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  server: {
    host: '127.0.0.1',
    port: 16000,
    open: '/docs/sites/index.html#/',
    https: false,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        sites: path.resolve(__dirname, 'docs/sites/index.html'),
        mobile: path.resolve(__dirname, 'docs/mobile/index.html'),
      },
    },
  },
  plugins: [vue(), ...createTDesignPlugin()],
};
