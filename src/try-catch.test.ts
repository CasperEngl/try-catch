/* eslint-disable no-undef */
import { tryCatch } from './try-catch';

test('will accept a function and return the value', async () => {
  const fn = (): string => 'success';

  expect(await tryCatch(fn)).toStrictEqual([
    null,
    'success',
  ]);
});

test('will accept a function and error on throw', async () => {
  const fn = (): string => {
    if (true) { // eslint-disable-line
      throw new Error('An error occurred');
    }

    return 'success';
  };

  expect(await tryCatch(fn)).toStrictEqual([
    new Error('An error occurred'),
    undefined,
  ]);
});

test('will accept a promise and return the value', async () => {
  const promise = new Promise((resolve) => resolve('success'));

  expect(await tryCatch(promise)).toStrictEqual([
    null,
    'success',
  ]);
});

test('will accept a promise that resolves to an object', async () => {
  const promise = new Promise((resolve) => resolve({
    status: 'success',
  }));

  expect(await tryCatch(promise)).toStrictEqual([
    null,
    {
      status: 'success',
    },
  ]);
});

test('will accept a promise and error on reject', async () => {
  const promise = new Promise((_, reject) => reject(new Error('An error occurred')));

  expect(await tryCatch(promise)).toStrictEqual([
    new Error('An error occurred'),
    undefined,
  ]);
});
