const name = 'useTryCatch';
const fileDt = './lib/react/useTryCatch.d.ts';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const option = {
  name,
  exports: 'named',
  fileDt,
  sourcemap: true,
  globals,
  external: ['react', 'react-dom', '../try-catch'],
};

export const useTryCatchOptions = [
  {
    file: './lib/react/esm/index.js',
    format: 'es',
  },
  {
    file: './lib/react/umd/index.js',
    format: 'umd',
  },
  {
    file: './lib/react/index.js',
    format: 'cjs',
  },
].map((o) => ({
  ...option,
  ...o,
}));
