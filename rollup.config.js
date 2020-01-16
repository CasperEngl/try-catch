import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

const config = {
  input: './src/try-catch.ts',
  plugins: [
    typescript(),
    uglify(),
  ],
  output: {
    name: 'tryCatch',
    file: './lib/try-catch.js',
    format: 'es2015',
    exports: 'named',
  },
};

export default config;
