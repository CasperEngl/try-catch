/* eslint-disable @typescript-eslint/no-explicit-any */

export async function tryCatch <T>(
  subject: Function | Promise<T>,
  ...args: any[]
): Promise<[Error, undefined] | [null, T]> {
  if (typeof subject === 'function') {
    const fn = (subject as typeof subject)

    try {
      return [null, await fn(...args)]
    } catch (error) {
      return [error, undefined]
    }
  }

  if (Promise.resolve(subject) === subject) {
    try {
      return [null, await subject]
    } catch (error) {
      return [error, undefined]
    }
  }

  return [new TypeError(`'${subject ? subject.toString() : subject}' is not a function or promise`), undefined]
}

export default tryCatch
