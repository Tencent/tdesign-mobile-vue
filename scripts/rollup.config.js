import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import analyzer from 'rollup-plugin-analyzer';
import vuePlugin from 'rollup-plugin-vue';
import multiInput from 'rollup-plugin-multi-input';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import { DEFAULT_EXTENSIONS } from '@babel/core';

import pkg from '../package.json';

const name = 'tdesign';
const externalDeps = Object.keys(pkg.dependencies);
const externalPeerDeps = Object.keys(pkg.peerDependencies);
const banner =
`/**
 * ${name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */
`;

const getPlugins = ({ env, isProd, analyze, vueOpt = { css: false } }) => {
  const plugins = [
    eslint({ include: ['**/*.ts', '**/*.js'] }),
    typescript({
      cacheRoot: `${require('os').tmpdir()}/.rpt2_cache`,
      // TODO: typings
      useTsconfigDeclarationDir: true,
    }),
    vuePlugin(vueOpt),
    babel({
      babelHelpers: 'bundled',
      extensions: [...DEFAULT_EXTENSIONS, 'vue', 'ts', 'tsx'],
    }),
    // TODO: extract css
    postcss({
      extract: `${isProd ? `${name}.min` : name}.css`,
      minimize: isProd,
      sourceMap: true,
      extensions: ['.sass', '.scss', '.css'],
    }),
    json(),
    url(),
  ];

  if (env) {
    plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }));
  }

  if (analyze) {
    plugins.push(analyzer({
      limit: 5,
      summaryOnly: true,
      ...analyze,
    }));
  }

  if (isProd) {
    plugins.push(terser({
      output: {
        ascii_only: true, // eslint-disable
      },
    }));
  }

  return plugins;
};

const commonConfig = {
  multi: {
    input: [
      'src/**/*.ts',
      '!src/**/demos',
      '!src/**/__tests__',
      '!src/**/*.interface.ts',
    ],
    external: externalDeps.concat(externalPeerDeps),
    plugins: [multiInput()].concat(getPlugins({ isProd: false, vueOpt: { css: true } })),
    output: { banner, sourcemap: true },
  },
  bundle: {
    input: 'src/index.ts',
    external: externalPeerDeps,
    output: {
      name: 'TDesign',
      banner,
      format: 'umd',
      exports: 'named',
      globals: { vue: 'Vue' },
      sourcemap: true,
    },
  },
};

export default [
  // esm
  {
    ...commonConfig.multi,
    output: {
      ...commonConfig.multi.output,
      dir: 'es/',
      format: 'esm',
    },
  },
  // cjs
  {
    ...commonConfig.multi,
    output: {
      ...commonConfig.multi.output,
      dir: 'lib/',
      format: 'cjs',
      exports: 'named',
    },
  },
  // umd
  {
    ...commonConfig.bundle,
    plugins: getPlugins({ isProd: false, env: 'development' }),
    output: {
      ...commonConfig.bundle.output,
      file: `dist/${name}.js`,
    },
  },
  // umd.min
  {
    ...commonConfig.bundle,
    plugins: getPlugins({ isProd: true, env: 'production', analyze: true }),
    output: {
      ...commonConfig.bundle.output,
      file: `dist/${name}.min.js`,
    },
  },
];
