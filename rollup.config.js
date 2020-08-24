import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

export default [
  {
    input: 'src/try-catch.ts',
    output: {
      name: 'tryCatch',
      exports: 'named',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
  {
    input: 'src/try-catch.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
]
