import * as path from 'path';

module.exports = {
  alias: {
    // 键必须以斜线开始和结束
    '/@/': path.resolve(__dirname, 'src'),
  },
  resolvers: [
    {
      alias(id: string) {
        return id.replace(/^@\//, '/@/') // add slash to particular id, then vite won't resolve it as a module
      },
    },
  ],
  hostname: '0.0.0.0',
  port: 16000,
  open: true,
  https: false,
  ssr: false,
  base: process.env.NODE_ENV === 'development' ? './' : '/vue-mobile/',
  outDir: 'dist',
};
