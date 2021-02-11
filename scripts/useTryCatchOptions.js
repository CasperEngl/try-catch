const name = 'useTryCatch';
const fileDt = './lib/react/index.d.ts';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

export const useTryCatchOptions = [
  {
    name,
    exports: 'named',
    file: './lib/react/index.js',
    fileDt,
    format: 'es',
    sourcemap: true,
    globals,
    external: ['react', 'react-dom', '../try-catch'],
  },
];
