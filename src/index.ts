import { tryCatch, TryCatchError } from './try-catch'

declare global {
  interface Window {
    tryCatch: any;
  }

  interface globalThis { // eslint-disable-line
    [key: string]: any;
  }
}


if (typeof window !== 'undefined') {
  window.tryCatch = tryCatch
} else if (typeof globalThis !== 'undefined') {
  (globalThis as any).tryCatch = tryCatch
}

export {
  tryCatch,
  TryCatchError,
}

export default tryCatch
