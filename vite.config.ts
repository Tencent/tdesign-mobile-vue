import * as path from 'path';
import vue from '@vitejs/plugin-vue'

module.exports = {
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  server: {
    host: '127.0.0.1',
    port: 16000,
    open: '/docs/mobile/index.html#/',
    https: false,
  },
  build: {
    base: process.env.NODE_ENV === 'development' ? './' : '/vue-mobile/',
    outDir: 'dist',
  },
  plugins: [vue()],
};
