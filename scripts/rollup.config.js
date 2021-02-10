import { createRollupConfig } from './createRollupConfig';
import { tryCatchOptions } from './tryCatchOptions';
import { useTryCatchOptions } from './useTryCatchOptions';

const tryCatchConfigs = tryCatchOptions.map((option) =>
  createRollupConfig('./src/index.ts', option)
);

const useTryCatchConfigs = useTryCatchOptions.map((option) =>
  createRollupConfig('./src/react/index.ts', option)
);

export default [...tryCatchConfigs, ...useTryCatchConfigs];
