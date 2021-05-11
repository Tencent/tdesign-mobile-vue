// @ts-check
import { tmpdir } from 'os';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import vuePlugin from 'rollup-plugin-vue';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import analyzer from 'rollup-plugin-analyzer';
import { terser } from 'rollup-plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import multiInput from 'rollup-plugin-multi-input';
import typescript from 'rollup-plugin-typescript2';
import staticImport from 'rollup-plugin-static-import';
import ignoreImport from 'rollup-plugin-ignore-import';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

import pkg from '../package.json';

const getPlugins = ({
  env,
  isProd = false,
  ignoreLess = true,
  extractCss = false,
} = {}) => {
  let plugins = [
    vuePlugin(),
    replace({
      preventAssignment: true,
      values: {
        '__VERSION__': JSON.stringify(pkg.version),
      },
    })
  ];

  // ts
  if (isProd) {
    plugins.push(typescript({
      tsconfig: 'tsconfig.build.json',
      cacheRoot: `${tmpdir()}/.rpt2_cache`,
    }));
  } else {
    plugins.push(esbuild({
      target: 'esnext',
      minify: false,
      tsconfig: 'tsconfig.build.json',
    }));
  }

  plugins = plugins.concat([
    babel({
      babelHelpers: 'bundled',
      extensions: [...DEFAULT_EXTENSIONS, 'vue', 'ts', 'tsx'],
    }),
    json(),
    url(),
  ]);

  // css
  if (extractCss) {
    plugins.push(postcss({
      extract: `${isProd ? `${name}.min` : name}.css`,
      minimize: isProd,
      sourceMap: true,
      extensions: ['.sass', '.scss', '.css', '.less'],
    }));
  } else {
    if (ignoreLess) {
      plugins.push(ignoreImport({ extensions: ['*.less'] }));
    } else {
      plugins.push(
        staticImport({ include: ['src/**/style/*'] }),
        ignoreImport({
          include: ['src/*/style/*'],
          body: 'import "../style/index.js";',
        }),
      );
    }
  }

  if (env) {
    plugins.push(replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(env),
      },
    }));
  }

  if (isProd) {
    plugins.push(
      sizeSnapshot(),
      terser({
        output: {
          /* eslint-disable */
          ascii_only: true,
          /* eslint-enable */
        },
      }),
    );
  }

  return plugins;
};

const name = 'tdesign';
const externalDeps = Object.keys(pkg.dependencies || {});
const externalPeerDeps = Object.keys(pkg.peerDependencies || {});
const banner = `/**
 * ${name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */
`;
const input = 'src/index.ts';
const inputList = [
  'src/**/*.ts',
  '!src/**/demos',
  '!src/**/style',
  '!src/**/__tests__',
  '!src/**/*.interface.ts',
];

/** @type {import('rollup').RollupOptions} */
const esmConfig = {
  input: inputList,
  external: externalDeps.concat(externalPeerDeps),
  plugins: [multiInput()].concat(getPlugins({ ignoreLess: false })),
  output: {
    banner,
    dir: 'es/',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
  },
};

/** @type {import('rollup').RollupOptions} */
const cjsConfig = {
  input: inputList,
  external: externalDeps.concat(externalPeerDeps),
  plugins: [multiInput()].concat(getPlugins()),
  output: {
    banner,
    dir: 'lib/',
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
    preserveModules: true,
  },
};

/** @type {import('rollup').RollupOptions} */
const umdConfig = {
  input,
  external: externalPeerDeps,
  plugins: getPlugins({
    env: 'development',
    extractCss: true,
  }).concat(analyzer({
    limit: 5,
    summaryOnly: true,
  })),
  output: {
    name: 'TDesign',
    banner,
    format: 'umd',
    exports: 'named',
    globals: { vue: 'Vue' },
    sourcemap: true,
    file: `dist/${name}.js`,
  },
};

/** @type {import('rollup').RollupOptions} */
const umdMinConfig = {
  input,
  external: externalPeerDeps,
  plugins: getPlugins({
    isProd: true,
    extractCss: true,
    env: 'production',
  }),
  output: {
    name: 'TDesign',
    banner,
    format: 'umd',
    exports: 'named',
    globals: { vue: 'Vue' },
    sourcemap: true,
    file: `dist/${name}.min.js`,
  },
};

export default [esmConfig, cjsConfig, umdConfig, umdMinConfig];
