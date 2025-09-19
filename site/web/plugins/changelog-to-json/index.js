import { promises } from 'fs';
import path from 'path';

import generateChangelogJson from '../../../../src/_common/docs/plugins/changelog-to-json';

const outputPath = path.resolve(__dirname, '../../../../_site/changelog.json');
const changelogPath = path.resolve(__dirname, '../../../../CHANGELOG.md');

export default function changelog2Json() {
  return {
    name: 'changelog-to-json',
    configureServer(server) {
      // 开发模式时拦截请求
      server.middlewares.use('/changelog.json', async (_, res) => {
        const json = await generateChangelogJson(changelogPath, 'mobile');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json));
      });
    },
    async closeBundle() {
      // 生产构建时写入物理文件
      if (['production', 'preview'].includes(process.env.NODE_ENV)) {
        const json = await generateChangelogJson(changelogPath, 'mobile');
        await promises.writeFile(outputPath, JSON.stringify(json));
      }
    },
  };
}
