/* eslint-disable @typescript-eslint/no-explicit-any */

export async function tryCatch <T>(
  subject: Function | Promise<T>,
  ...args: any
): Promise<[Error, undefined] | (T | null)[]> {
  if (typeof subject === 'function') {
    const fn = (subject as typeof subject);

    try {
      return Promise.resolve(fn(...args))
        .then((data) => [null, data])
        .catch((error) => [error, undefined]);
    } catch (error) {
      return Promise.resolve([error, undefined]);
    }
  }

  if (Promise.resolve(subject) === subject) {
    return subject
      .then((data) => [null, data])
      .catch((error) => [error, undefined]);
  }

  return [new TypeError(`'${subject ? subject.toString() : subject}' is not a function or promise`), undefined];
}

export default tryCatch;
