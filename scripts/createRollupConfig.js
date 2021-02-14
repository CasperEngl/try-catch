import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import sourcemaps from 'rollup-plugin-sourcemaps';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';

import { omit } from 'lodash';

/**
 *
 * @param {string} input
 * @param {{
 *  env: string;
 *  file: string;
 *  fileDt: string;
 *  external: string[];
 * }} option
 */
export const createRollupConfig = (input, option) => {
  const dest = option.file.slice(0, option.file.lastIndexOf('/'));
  const fileDt = option.env
    ? `${option.file.replace('.js', '')}.${option.env}.d.ts`
    : option.file;

  return {
    ...(option.external ? { external: option.external } : null),
    input,
    output: {
      ...omit(option, ['env', 'fileDt']),
    },
    plugins: [
      typescript(),
      resolve(),
      cleanup({
        comments: 'none',
      }),
      sourcemaps(),
      option.format === 'umd' && terser(),
      option.fileDt &&
        copy({
          targets: [
            {
              src: option.fileDt,
              dest: dest || '.',
              rename: fileDt.replace(dest, ''),
            },
          ],
        }),
    ],
  };
};
