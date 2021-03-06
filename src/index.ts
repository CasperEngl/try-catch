import { tryCatch, TryCatchError } from './tryCatch';

declare global {
  interface Window {
    tryCatch: any;
  }
}

if (typeof window !== 'undefined') {
  window.tryCatch = tryCatch;
} else if (typeof globalThis !== 'undefined') {
  (globalThis as any).tryCatch = tryCatch;
}

export { tryCatch, TryCatchError };

export default tryCatch;
