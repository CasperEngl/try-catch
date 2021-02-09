/* eslint-disable import/no-extraneous-dependencies */
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import sourcemaps from 'rollup-plugin-sourcemaps';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';

import { omit } from 'lodash';

import pkg from './package.json';

const name = 'tryCatch';

const options = [
  {
    name,
    exports: 'named',
    file: pkg.module,
    format: 'es',
    env: 'production',
    sourcemap: true,
  },
  {
    name,
    exports: 'named',
    file: pkg.module,
    format: 'es',
    env: 'development',
    sourcemap: true,
  },
  {
    name,
    exports: 'named',
    file: pkg.main,
    format: 'cjs',
    env: 'production',
    sourcemap: true,
  },
  {
    name,
    exports: 'named',
    file: pkg.main,
    format: 'cjs',
    env: 'development',
    sourcemap: true,
  },
  {
    name,
    exports: 'named',
    file: pkg.browser,
    format: 'umd',
    env: 'production',
    sourcemap: true,
  },
  {
    name,
    exports: 'named',
    file: pkg.browser,
    format: 'umd',
    env: 'development',
    sourcemap: true,
  },
];

function createRollupConfig(option) {
  const file = option.env
    ? `${option.file.replace('.js', '')}.${option.env}.js`
    : option.file;
  const fileDt = option.env
    ? `${option.file.replace('.js', '')}.${option.env}.d.ts`
    : option.file;

  return {
    input: './src/index.ts',
    output: {
      ...omit(option, ['env']),
      file,
    },
    plugins: [
      typescript(),
      resolve(),
      cleanup({
        comments: 'none',
      }),
      sourcemaps(),
      option.env === 'production' && terser(),
      copy({
        targets: [
          {
            src: './lib/try-catch.d.ts',
            dest: '.',
            rename: fileDt,
          },
        ],
      }),
    ],
  };
}

export default options.map((option) => createRollupConfig(option));
