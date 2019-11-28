/* eslint-disable @typescript-eslint/no-explicit-any */

export async function tryCatch(
  subject: Function | Promise<any>,
  errorExt?: object,
): Promise<any[]> {
  if (typeof subject === 'function') {
    try {
      return [null, subject()];
    } catch (err) {
      return [Object.assign(err, errorExt), undefined];
    }
  } else if (Promise.resolve(subject) === subject) {
    return subject
      .then((data) => [null, data])
      .catch((err) => [Object.assign(err, errorExt), undefined]);
  }

  return [new TypeError(`'${subject ? subject.toString() : subject}' is not a function or promise`), undefined];
}

export default tryCatch;
