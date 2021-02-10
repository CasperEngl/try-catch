const name = 'useTryCatch';
const fileDt = './lib/react/index.d.ts';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const option = {
  name,
  exports: 'named',
  file: './lib/react/index.js',
  fileDt,
  format: 'es',
  sourcemap: true,
  globals,
  external: ['react', 'react-dom', '../try-catch'],
};

export const useTryCatchOptions = [
  {
    env: 'production',
  },
  {
    env: 'development',
  },
].map((o) => ({
  ...option,
  ...o,
}));
