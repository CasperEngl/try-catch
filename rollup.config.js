import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/try-catch.ts',
  output: {
    dir: './lib',
    format: 'cjs',
    name: 'tryCatch',
    exports: 'named',
    sourcemap: true,
  },
  plugins: [
    typescript(),
    terser(),
  ],
}
