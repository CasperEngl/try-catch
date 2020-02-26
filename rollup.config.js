import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/try-catch.ts',
  output: {
    name: 'tryCatch',
    dir: './lib',
    format: 'umd',
    sourcemap: true,
    globals: {
      tslib: 'tslib',
    },
  },
  external: ['tslib'],
  plugins: [
    typescript(),
    terser(),
  ],
}
