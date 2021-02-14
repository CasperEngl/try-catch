import pkg from '../package.json';

const name = 'tryCatch';
const fileDt = './lib/tryCatch.d.ts';

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
    file: pkg.browser,
    format: 'umd',
  },
  {
    file: pkg.main,
    format: 'cjs',
  },
].map((o) => ({
  ...option,
  ...o,
}));
