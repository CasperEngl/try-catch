import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/try-catch.ts',
  output: {
    dir: './lib',
    format: 'cjs',
    name: 'tryCatch',
    exports: 'named',
    sourcemap: true,
  },
  external: ['tslib'],
  plugins: [
    typescript(),
    terser(),
  ],
}
