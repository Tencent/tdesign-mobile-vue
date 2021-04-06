// @ts-check
import { tmpdir } from 'os';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
// import eslint from '@rollup/plugin-eslint';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import analyzer from 'rollup-plugin-analyzer';
import vuePlugin from 'rollup-plugin-vue';
import multiInput from 'rollup-plugin-multi-input';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import staticImport from 'rollup-plugin-static-import';
import ignoreImport from 'rollup-plugin-ignore-import';
import { DEFAULT_EXTENSIONS } from '@babel/core';

import pkg from '../package.json';

const getPlugins = ({
  env,
  isProd = false,
  analyze = false,
  ignoreLess = true,
  extractCss = false,
} = {}) => {
  let plugins = [
    /** TODO: 由于以下报错，暂时关闭 eslint
     * 0:0  error  Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
      The file does not match your project config: src/cell-group/cell-group.vue?vue&type=script&lang.ts.
      The file must be included in at least one of the projects provided
     */
    // eslint(),
    vuePlugin(),
  ];

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
  plugins: getPlugins({ env: 'development', extractCss: true }),
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
    analyze: true,
    env: 'production',
    extractCss: true,
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
