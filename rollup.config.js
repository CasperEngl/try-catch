import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: './src/index.ts',
  output: {
    exports: 'named',
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
