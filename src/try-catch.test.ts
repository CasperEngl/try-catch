/* eslint-disable no-undef */
import { tryCatch } from './try-catch';

describe('Function', () => {
  test('return the value', async () => {
    const fn = (): string => 'success';

    const [error, result] = await tryCatch(fn);

    expect(error).toBeNull();
    expect(result).toEqual('success');
  });

  test('resolves to an object', async () => {
    const fn = (): { status: string } => ({
      status: 'success',
    });

    const [error, result] = await tryCatch(fn);

    expect(error).toBeNull();
    expect(result).toEqual({
      status: 'success',
    });
  });

  test('throw error', async () => {
    const fn = (): string => {
      if (true) { // eslint-disable-line
        throw new Error('An error occurred');
      }

      return 'success';
    };

    const [error, result] = await tryCatch(fn);

    expect(fn).toThrowError();
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('An error occurred');
    expect(result).toBeUndefined();
  });

  test('with an error extension', async () => {
    const fn = (): string => {
      if (true) { // eslint-disable-line
        throw new Error('An error occurred');
      }

      return 'success';
    };

    const [error, result] = await tryCatch(fn, {
      foo: 'bar',
    });

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('An error occurred');
    expect(error).toEqual(expect.objectContaining({ foo: 'bar' }));
    expect(result).toBeUndefined();
  });
});

describe('Promise', () => {
  test('return the value', async () => {
    const promise = new Promise((resolve) => resolve('success'));

    const [error, result] = await tryCatch(promise);

    expect(error).toBeNull();
    expect(result).toEqual('success');
  });

  test('resolves to an object', async () => {
    const promise = new Promise((resolve) => resolve({
      status: 'success',
    }));

    const [error, result] = await tryCatch(promise);

    expect(error).toBeNull();
    expect(result).toEqual({
      status: 'success',
    });
  });

  test('throw error', async () => {
    const promise = new Promise((resolve) => {
      if (true) { // eslint-disable-line
        throw new Error('An error was thrown');
      }

      resolve('success');
    });

    const [error, result] = await tryCatch(promise);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('An error was thrown');
    expect(result).toBeUndefined();
  });

  test('error on reject', async () => {
    const promise = Promise.reject(new Error('An error occurred'));

    const [error, result] = await tryCatch(promise);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('An error occurred');
    expect(result).toBeUndefined();
  });

  test('with an error extension', async () => {
    const promise = Promise.reject(new Error('An error occurred'));

    const [error, result] = await tryCatch(promise, {
      foo: 'bar',
    });

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('An error occurred');
    expect(error).toEqual(expect.objectContaining({ foo: 'bar' }));
    expect(result).toBeUndefined();
  });
});
