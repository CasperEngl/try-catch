/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TryCatchError extends Error {
  [key: string]: any;
}

export class TryCatchError extends Error implements TryCatchError {
  constructor(error: Error) {
    super(error.name);

    this.name = error.name;
    this.message = error.message;
    this.stack = error.stack;
  }
}

type TryCatchReturnType<ReturnType> =
  | [TryCatchError, undefined]
  | [null, ReturnType];

export function tryCatch<ReturnType>(
  subject: Promise<ReturnType>,
  ...args: any[]
): Promise<TryCatchReturnType<ReturnType>>;
export function tryCatch<ReturnType>(
  subject: (..._args: any[]) => ReturnType,
  ...args: any[]
): Promise<TryCatchReturnType<ReturnType>>;
export function tryCatch<ReturnType>(
  subject: (..._args: Promise<any>[]) => Promise<ReturnType>,
  ...args: any[]
): Promise<TryCatchReturnType<ReturnType>>;
export async function tryCatch<ReturnType>(
  subject:
    | Promise<ReturnType>
    | ((..._args: any[]) => ReturnType)
    | ((..._args: Promise<any>[]) => Promise<ReturnType>),
  ...args: any[]
): Promise<TryCatchReturnType<ReturnType>> {
  if (typeof subject === 'function') {
    const fn = subject as typeof subject;

    try {
      return [null, await fn(...args)];
    } catch (error) {
      return [new TryCatchError(error), undefined];
    }
  }

  if (Promise.resolve(subject) === subject) {
    try {
      return [null, await subject];
    } catch (error) {
      return [new TryCatchError(error), undefined];
    }
  }

  return [new TypeError(`Subject is not a function or promise`), undefined];
}

export default tryCatch;
