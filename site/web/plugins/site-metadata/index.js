import { execSync } from 'child_process';

export default function siteMetadata() {
  let commitHash = '';
  try {
    // Use short commit id for brevity
    commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
  } catch (e) {
    // ignore errors; leave commitId as 'unknown'
  }

  return {
    name: 'site-metadata',
    config() {
      return {
        define: {
          __SITE_METADATA__: JSON.stringify({
            commitHash,
          }),
        },
      };
    },
  };
}
