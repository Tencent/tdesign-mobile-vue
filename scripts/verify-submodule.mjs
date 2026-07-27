import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const submodulePath = 'src/_common';
const repositoryRoot = process.cwd();
const submoduleRoot = resolve(repositoryRoot, submodulePath);

function runGit(args, cwd = repositoryRoot) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
}

function fail(message) {
  console.error(`Submodule integrity check failed: ${message}`);
  process.exitCode = 1;
}

function getTrackedFiles(cwd) {
  return runGit(['ls-files', '-z'], cwd).split('\0').filter(Boolean).sort();
}

function getFileHash(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex');
}

function verifyExternalWorktree() {
  const externalRoot = process.env.COMMON_WORKTREE;
  if (!externalRoot) return;

  const resolvedExternalRoot = resolve(externalRoot);
  runGit(['rev-parse', '--show-toplevel'], resolvedExternalRoot);

  const submoduleFiles = getTrackedFiles(submoduleRoot);
  const externalFiles = getTrackedFiles(resolvedExternalRoot);

  if (submoduleFiles.join('\0') !== externalFiles.join('\0')) {
    fail(`${submodulePath} and COMMON_WORKTREE track different file sets.`);
    return;
  }

  for (const filePath of submoduleFiles) {
    const submoduleFile = resolve(submoduleRoot, filePath);
    const externalFile = resolve(resolvedExternalRoot, filePath);

    if (
      !existsSync(submoduleFile) ||
      !existsSync(externalFile) ||
      getFileHash(submoduleFile) !== getFileHash(externalFile)
    ) {
      fail(`${submodulePath} differs from COMMON_WORKTREE at ${filePath}.`);
      return;
    }
  }

  console.log(`External worktree matches ${submodulePath}: ${resolvedExternalRoot}`);
}

if (!existsSync(submoduleRoot)) {
  fail(`${submodulePath} is not initialized. Run \`npm run init\`.`);
} else {
  try {
    const indexEntry = runGit(['ls-files', '--stage', '--', submodulePath]);
    const expectedSha = indexEntry.match(/^160000\s+([0-9a-f]{40})\s+\d+\t/)?.[1];

    if (!expectedSha) {
      fail(`${submodulePath} is not tracked as a gitlink.`);
    } else {
      const actualSha = runGit(['rev-parse', 'HEAD'], submoduleRoot);
      const changes = runGit(['status', '--porcelain'], submoduleRoot);

      if (changes) {
        fail(`${submodulePath} has uncommitted changes. Commit the Common changes before updating the Mobile gitlink.`);
      } else if (actualSha !== expectedSha) {
        fail(
          `${submodulePath} is at ${actualSha}, but the staged gitlink is ${expectedSha}. ` +
            `Check out the intended Common commit and stage it with \`git add ${submodulePath}\`.`,
        );
      } else {
        console.log(`Submodule integrity check passed: ${submodulePath} -> ${actualSha}`);
        verifyExternalWorktree();
      }
    }
  } catch (error) {
    fail(error.stderr?.trim() || error.message);
  }
}
