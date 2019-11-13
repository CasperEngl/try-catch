/* eslint-disable @typescript-eslint/no-explicit-any */

export function tryCatch(
  subject: Function | Promise<any>,
  errorExt?: object,
): any[] | Promise<any[]> {
  if (typeof subject === 'function') {
    try {
      return Promise.resolve([null, subject()]);
    } catch (err) {
      return [err, undefined];
    }
  }

  return subject
    .then((data) => [null, data])
    .catch((err) => {
      if (errorExt) {
        (Object as any).assign(err, errorExt);
      }

      return [err, undefined];
    });
}

export default tryCatch;
