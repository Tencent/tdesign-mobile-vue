/* eslint-disable no-console */
// 1. tsgo 仅生成一次声明到独立临时目录；
// 2. 删除临时目录下所有 style 目录（其中仅含无意义的副作用 .d.ts）；
// 3. 将清理后的声明复制到 es / esm / lib / cjs 四个产物目录。
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, cpSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const tempDir = join(root, '.temp-types');
const targets = ['es', 'esm', 'lib', 'cjs'];

// 递归删除名为 style 的目录
const removeStyleDirs = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = join(dir, entry.name);
    if (entry.name === 'style') {
      rmSync(full, { recursive: true, force: true });
    } else {
      removeStyleDirs(full);
    }
  }
};

const run = () => {
  // 清理并重建临时目录
  rmSync(tempDir, { recursive: true, force: true });
  mkdirSync(tempDir, { recursive: true });

  // 1. 生成声明到临时目录（只生成一次）
  console.log('[build-types] generating declarations...');
  execSync(`tsgo --declaration --emitDeclarationOnly -p tsconfig.build.json --outDir ${JSON.stringify(tempDir)}`, {
    cwd: root,
    stdio: 'inherit',
  });

  // 2. 删除临时目录下所有 style 目录
  removeStyleDirs(tempDir);

  // 3. 复制到各产物目录（仅复制声明，保留 rollup 已产出的 css.mjs / index.css 等）
  const hasOutput = statSync(tempDir).isDirectory() && readdirSync(tempDir).length > 0;
  if (!hasOutput) {
    throw new Error('[build-types] no declarations generated.');
  }
  for (const target of targets) {
    const dest = join(root, target);
    if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
    cpSync(tempDir, dest, { recursive: true });
    console.log(`[build-types] copied declarations to ${target}/`);
  }

  // 4. 移除临时目录
  rmSync(tempDir, { recursive: true, force: true });
  console.log('[build-types] done.');
};

run();
