/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TryCatchError extends Error {
  [key: string]: any;
}

export class TryCatchError extends Error implements TryCatchError {
  constructor(error: Error) { // esline-disable-error
    super(error.name)

    this.name = error.name
    this.message = error.message
    this.stack = error.stack
  }
}

export async function tryCatch <T>(
  subject: Function | Promise<T>,
  ...args: any[]
): Promise<[TryCatchError, undefined] | [null, T]> {
  if (typeof subject === 'function') {
    const fn = (subject as typeof subject)

    try {
      return [null, await fn(...args)]
    } catch (error) {
      return [new TryCatchError(error), undefined]
    }
  }

  if (Promise.resolve(subject) === subject) {
    try {
      return [null, await subject]
    } catch (error) {
      return [new TryCatchError(error), undefined]
    }
  }

  return [new TypeError(`'${subject ? subject.toString() : subject}' is not a function or promise`), undefined]
}

export default tryCatch
