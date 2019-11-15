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
  }

  return subject
    .then((data) => [null, data])
    .catch((err) => [Object.assign(err, errorExt), undefined]);
}

export default tryCatch;
