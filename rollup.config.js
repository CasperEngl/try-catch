import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

import pkg from './package.json';

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.browser,
      name: 'tryCatch',
      format: 'umd',
      sourcemap: true,
    },
  ],
  plugins: [typescript(), resolve(), terser()],
};
