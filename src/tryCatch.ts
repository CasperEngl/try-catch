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

export type TryCatchReturnType<ReturnType> =
  | [TryCatchError, undefined]
  | [null, ReturnType]
  | [undefined, undefined];

interface SubjectTypeInterface<ReturnType> {
  promise: Promise<ReturnType>;
  function: (..._args: any[]) => ReturnType;
  functionReturningPromise: (..._args: Promise<any>[]) => Promise<ReturnType>;
}

export type SubjectType<ReturnType> =
  | SubjectTypeInterface<ReturnType>['promise']
  | SubjectTypeInterface<ReturnType>['function']
  | SubjectTypeInterface<ReturnType>['functionReturningPromise'];

export function tryCatch<ReturnType>(
  subject?: SubjectTypeInterface<ReturnType>['promise'],
  ...args: any[]
): Promise<TryCatchReturnType<ReturnType>>;
export function tryCatch<ReturnType>(
  subject?: SubjectTypeInterface<ReturnType>['function'],
  ...args: any[]
): Promise<TryCatchReturnType<ReturnType>>;
export function tryCatch<ReturnType>(
  subject?: SubjectTypeInterface<ReturnType>['functionReturningPromise'],
  ...args: any[]
): Promise<TryCatchReturnType<ReturnType>>;
export async function tryCatch<ReturnType>(
  subject?: SubjectType<ReturnType>,
  ...args: any[]
): Promise<TryCatchReturnType<ReturnType>> {
  if (subject) {
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

  return [undefined, undefined];
}

export default tryCatch;
