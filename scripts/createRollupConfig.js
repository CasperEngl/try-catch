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
  const fileDt = `${option.file.replace('.js', '')}.d.ts`;
  const dest = option.file.slice(0, option.file.lastIndexOf('/')) || '.';
  const rename = fileDt.replace(dest, '');
  const targets = [];

  if (dest + rename !== option.fileDt) {
    targets.push({
      src: option.fileDt,
      dest,
      rename,
    });
  }

  console.log({
    src: option.fileDt,
    dest: dest || '.',
    rename: fileDt.replace(dest, ''),
  });

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
          targets,
        }),
    ],
  };
};
