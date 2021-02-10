import pkg from '../package.json';

const name = 'tryCatch';
const fileDt = './lib/try-catch.d.ts';

const option = {
  name,
  exports: 'named',
  fileDt,
  sourcemap: true,
};

export const tryCatchOptions = [
  {
    file: pkg.module,
    format: 'es',
    env: 'production',
  },
  {
    file: pkg.module,
    format: 'es',
    env: 'development',
  },
  {
    file: pkg.main,
    format: 'cjs',
    env: 'production',
  },
  {
    file: pkg.main,
    format: 'cjs',
    env: 'development',
  },
  {
    file: pkg.browser,
    format: 'umd',
  },
].map((o) => ({
  ...option,
  ...o,
}));
