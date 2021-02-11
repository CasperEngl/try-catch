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
  },
  {
    file: pkg.module,
    format: 'es',
  },
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.browser,
    format: 'umd',
  },
].map((o) => ({
  ...option,
  ...o,
}));
