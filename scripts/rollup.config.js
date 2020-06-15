import url from '@rollup/plugin-url';
import path from 'path';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import vuePlugin from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import { DEFAULT_EXTENSIONS } from '@babel/core';

import pkg from '../package.json';

const name = 'tdesign';
const banner =
`/**
 * ${name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */
`;

const configMap = {
  umdDev: {
    env: 'development',
    file: `dist/${name}.umd.js`,
    format: 'umd',
  },
  umdProd: {
    env: 'production',
    file: `dist/${name}.umd.min.js`,
    format: 'umd',
  },
};

const genConfig = (opts) => {
  // 生产环境
  const isProd = /min\.js$/.test(opts.file);
  const plugins = [
    eslint({ include: '**/*.ts' }),
    typescript({
      cacheRoot: `${require('os').tmpdir()}/.rpt2_cache`,
      useTsconfigDeclarationDir: true,
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: [...DEFAULT_EXTENSIONS, 'ts', 'tsx'],
    }),
    vuePlugin({ css: false }),
    postcss({
      extract: path.resolve(`dist/${isProd ? `${name}.min` : name}.css`),
      minimize: isProd,
      sourceMap: true,
      extensions: ['.sass', '.scss', '.css', '.less'],
    }),
    json(),
    url(),
  ];

  const config = {
    input: 'src/index.ts',
    plugins: plugins.slice(),
    output: {
      name,
      file: opts.file,
      banner,
      format: opts.format,
      exports: 'named',
      globals: { vue: 'Vue' },
      sourcemap: true,
    },
    external: ['vue'],
  };

  if (opts.env) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env),
    }));
  }

  if (isProd) {
    config.plugins.push(terser({
      output: {
        ascii_only: true, // eslint-disable
      },
    }));
  }

  return config;
};

export default Object.keys(configMap)
  .map(key => configMap[key])
  .map(genConfig);
