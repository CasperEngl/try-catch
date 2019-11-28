/* eslint-disable no-undef */
import { tryCatch } from './try-catch';

describe('Function', () => {
  it('should return the value', async () => {
    const fn = (): string => 'success';

    const [error, result] = await tryCatch(fn);

    expect(error).toBeNull();
    expect(result).toEqual('success');
  });

  it('should resolve to an object', async () => {
    const fn = (): { status: string } => ({
      status: 'success',
    });

    const [error, result] = await tryCatch(fn);

    expect(error).toBeNull();
    expect(result).toEqual({
      status: 'success',
    });
  });

  it('should throw an error', async () => {
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

  it('should reject with an error extension', async () => {
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
  it('should return the value', async () => {
    const promise = new Promise((resolve) => resolve('success'));

    const [error, result] = await tryCatch(promise);

    expect(error).toBeNull();
    expect(result).toEqual('success');
  });

  it('should resolve to an object', async () => {
    const promise = new Promise((resolve) => resolve({
      status: 'success',
    }));

    const [error, result] = await tryCatch(promise);

    expect(error).toBeNull();
    expect(result).toEqual({
      status: 'success',
    });
  });

  it('should throw an error', async () => {
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

  it('should reject with an error extension', async () => {
    const promise = Promise.reject(new Error('An error occurred'));

    const [error, result] = await tryCatch(promise, {
      foo: 'bar',
    });

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('An error occurred');
    expect(error).toEqual(expect.objectContaining({ foo: 'bar' }));
    expect(result).toBeUndefined();
  });

  it('should error on reject', async () => {
    const promise = Promise.reject(new Error('An error occurred'));

    const [error, result] = await tryCatch(promise);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('An error occurred');
    expect(result).toBeUndefined();
  });
});

describe('invalid types', () => {
  it('should have an error when passed a boolean', async () => {
    const [error, result] = await tryCatch((true as any));

    expect(error).toBeInstanceOf(TypeError);
    expect(error.message).toEqual('\'true\' is not a function or promise');
    expect(result).toBeUndefined();
  });

  it('should have an error when passed a number', async () => {
    const [error, result] = await tryCatch((7 as any));

    expect(error).toBeInstanceOf(TypeError);
    expect(error.message).toEqual('\'7\' is not a function or promise');
    expect(result).toBeUndefined();
  });

  it('should have an error when passed an object', async () => {
    const [error, result] = await tryCatch(({ foo: 'bar' } as any));

    expect(error).toBeInstanceOf(TypeError);
    expect(error.message).toEqual('\'[object Object]\' is not a function or promise');
    expect(result).toBeUndefined();
  });

  it('should have an error when passed a string', async () => {
    const [error, result] = await tryCatch(('foo bar' as any));

    expect(error).toBeInstanceOf(TypeError);
    expect(error.message).toEqual('\'foo bar\' is not a function or promise');
    expect(result).toBeUndefined();
  });

  it('should have an error when passed a symbol', async () => {
    const [error, result] = await tryCatch((Symbol('foo') as any));

    expect(error).toBeInstanceOf(TypeError);
    expect(error.message).toEqual('\'Symbol(foo)\' is not a function or promise');
    expect(result).toBeUndefined();
  });

  it('should have an error when passed a undefined', async () => {
    const [error, result] = await tryCatch((undefined as any));

    expect(error).toBeInstanceOf(TypeError);
    expect(error.message).toEqual('\'undefined\' is not a function or promise');
    expect(result).toBeUndefined();
  });

  it('should have an error when passed a null', async () => {
    const [error, result] = await tryCatch((null as any));

    expect(error).toBeInstanceOf(TypeError);
    expect(error.message).toEqual('\'null\' is not a function or promise');
    expect(result).toBeUndefined();
  });
});
