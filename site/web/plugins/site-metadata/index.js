import { execSync } from 'child_process';

export default function siteMetadata() {
  let commitHash = '';

  // 1) Prefer CI-provided environment variables (GitHub Actions, GitLab CI, etc.)
  // GitHub Actions provides GITHUB_SHA. In workflows you can also pass a custom
  // env like COMMIT_HASH: ${{ github.sha }}. Use short form for brevity.
  const ciSha = process.env.GITHUB_SHA || '';
  if (ciSha) {
    commitHash = ciSha.substring(0, 7);
  } else {
    try {
      // Fallback to local git; this may fail in CI if .git is missing or a detached state
      commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    } catch (e) {
      // ignore errors; leave commitHash as empty string
    }
  }

  if (!commitHash) commitHash = 'unknown';

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
