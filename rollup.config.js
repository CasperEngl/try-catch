import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';

export default {
  input: './src/index.ts',
  output: [
    {
      name: 'tryCatch',
      exports: 'named',
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    {
      name: 'tryCatch',
      exports: 'named',
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      name: 'tryCatch',
      exports: 'named',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    resolve(),
    terser(),
    cleanup({
      comments: 'none',
    }),
    copy({
      targets: [
        'try-catch.es.d.ts',
        'try-catch.cjs.d.ts',
        'try-catch.umd.d.ts',
      ].map((typeDef) => ({
        src: './lib/try-catch.d.ts',
        dest: './lib',
        rename: typeDef,
      })),
    }),
  ],
};
