import * as path from 'path';
import * as markdown from './docs/sites/common/vite-plugin-tdesign-doc/';

module.exports = {
  hostname: '0.0.0.0',
  port: 16000,
  open: true,
  https: false,
  ssr: false,
  base: process.env.NODE_ENV === 'development' ? './' : '/vue-mobile/',
  outDir: 'dist',
  alias: {
    // 键必须以斜线开始和结束
    '@': path.resolve(__dirname, 'src'),
  },
  // resolvers: [
  //   {
  //     alias(id: string) {
  //       // add slash to particular id, then vite won't resolve it as a module
  //       return id.replace(/^@\//, '/@/');
  //     },
  //   },
  // ],
  plugins: [
    ...markdown.createTDesignPlugin()
  ],
  rollupOptions: {
    input: {
      main: path.resolve(__dirname, 'docs/sites/index.html'),
      mobile: path.resolve(__dirname, 'docs/mobile/index.html'),
    },
  },
};
