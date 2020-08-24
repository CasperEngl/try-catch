import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: './src/try-catch.ts',
  output: {
    name: 'tryCatch',
    dir: './lib',
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    terser(),
  ],
}
