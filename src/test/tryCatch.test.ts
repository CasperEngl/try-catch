/* eslint-disable camelcase */
/* eslint-disable no-constant-condition */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import { setupServer, User } from './setup';

import { fetchJSON } from './fetch';
import { tryCatch } from '../../lib/try-catch';

let server: ReturnType<typeof setupServer>;

beforeAll(() => {
  server = setupServer();
});

afterAll(() => {
  server.shutdown();
});

describe('Function', () => {
  it('should return the value', async () => {
    const fn = (): string => 'success';

    const [error, result] = await tryCatch(fn);

    expect(error).toBeNull();
    expect(result).toEqual('success');
  });

  it('should return the passed argument value', async () => {
    const fn = (x: string): string => x;

    const [error, result] = await tryCatch(fn, 'success');

    expect(error).toBeNull();
    expect(result).toEqual('success');
  });

  it('should return the passed arguments multiplied', async () => {
    const fn = (x: number, y: number): number => x * y;

    const [error, result] = await tryCatch(fn, 7, 7);

    expect(error).toBeNull();
    expect(result).toEqual(49);
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

  it('should accept any amount of extra arguments', async () => {
    const fn = (...args: string[]): string => args.join(',');

    const [error, result] = await tryCatch(
      fn,
      'foobar',
      'foo',
      'bar',
      'baz',
      'qux',
      'quux',
      'quuz',
      'corge',
      'grault',
      'garply',
      'waldo',
      'fred',
      'plugh',
      'xyzzy',
      'thud'
    );

    expect(error).toBeNull();
    expect(result).toEqual(
      'foobar,foo,bar,baz,qux,quux,quuz,corge,grault,garply,waldo,fred,plugh,xyzzy,thud'
    );
  });

  it('should throw an error', async () => {
    const fn = (): string => {
      if (Math.random() < 2) {
        throw new Error('An error occurred');
      }

      return 'success';
    };

    const [error, result] = await tryCatch(fn);

    expect(fn).toThrowError('An error occurred');
    expect(error).toBeInstanceOf(Error);
    expect(result).toBeUndefined();

    if (error) {
      expect(error.message).toEqual('An error occurred');
    }
  });
});

describe('Promise', () => {
  it('should return the value', async () => {
    const promise = new Promise<string>((resolve) => resolve('success'));

    const [error, result] = await tryCatch(promise);

    expect(error).toBeNull();
    expect(result).toEqual('success');
  });

  it('should return the passed argument value', async () => {
    const fnReturningPromise = (x: string): Promise<string> =>
      new Promise((resolve) => resolve(x));

    const [error, result] = await tryCatch(fnReturningPromise, 'success');

    expect(error).toBeNull();
    expect(result).toEqual('success');
  });

  it('should return the passed arguments multiplied', async () => {
    const fnReturningPromise = (x: number, y: number): Promise<number> =>
      new Promise((resolve) => resolve(x * y));

    const [error, result] = await tryCatch(fnReturningPromise, 7, 7);

    expect(error).toBeNull();
    expect(result).toEqual(49);
  });

  it('should resolve to an object', async () => {
    const promise = new Promise<{
      status: string;
    }>((resolve) =>
      resolve({
        status: 'success',
      })
    );

    const [error, result] = await tryCatch(promise);

    expect(error).toBeNull();
    expect(result).toEqual({
      status: 'success',
    });
  });

  it('should accept any amount of extra arguments', async () => {
    const promise = (...args: string[]): Promise<string> =>
      new Promise((resolve) => resolve(args.join(',')));

    const [error, result] = await tryCatch(
      promise,
      'foobar',
      'foo',
      'bar',
      'baz',
      'qux',
      'quux',
      'quuz',
      'corge',
      'grault',
      'garply',
      'waldo',
      'fred',
      'plugh',
      'xyzzy',
      'thud'
    );

    expect(error).toBeNull();
    expect(result).toEqual(
      'foobar,foo,bar,baz,qux,quux,quuz,corge,grault,garply,waldo,fred,plugh,xyzzy,thud'
    );
  });

  it('should throw an error', async () => {
    const promise = new Promise<string>((resolve) => {
      if (Math.random() < 2) {
        throw new Error('An error was thrown');
      }

      resolve('success');
    });

    const [error, result] = await tryCatch(promise);

    expect(error).toBeInstanceOf(Error);
    expect(result).toBeUndefined();

    if (error) {
      expect(error.message).toEqual('An error was thrown');
    }
  });

  describe('Promise specific', () => {
    it('should error on reject', async () => {
      const promise = Promise.reject(new Error('An error occurred'));

      const [error, result] = await tryCatch(promise);

      expect(error).toBeInstanceOf(Error);
      expect(result).toBeUndefined();

      if (error) {
        expect(error.message).toEqual('An error occurred');
      }
    });

    it('should return all users from get request', async () => {
      const promise = fetchJSON<{
        data: { modelName: 'user'; models: User[] };
      }>('/api/users');

      const [error, result] = await tryCatch(promise);

      expect(error).toBeNull();
      expect(result?.data.models).toHaveLength(6);
    });

    it('should return user from get request', async () => {
      const promise = fetchJSON<User>('/api/users/1');

      const [error, result] = await tryCatch(promise);

      expect(error).toBeNull();
      expect(result).toMatchObject({
        id: '1',
        firstName: 'George',
        lastName: 'Bluth',
        email: 'george.bluth@test.test',
        avatar: 'https://eu.ui-avatars.com/api/?name=George+Bluth',
      });
    });

    it('should return newly created user from post request', async () => {
      const promise = fetchJSON<User>('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          firstName: 'Foo',
          lastName: 'Bar',
        }),
      });

      const [error, result] = await tryCatch(promise);

      expect(error).toBeNull();
      expect(result).toMatchObject({
        id: '7',
        firstName: 'Foo',
        lastName: 'Bar',
      });
    });

    it('should error out', async () => {
      const promise = fetchJSON('/api/error');

      const [error, result] = await tryCatch(promise);

      expect(error).toBeInstanceOf(Error);
      expect(result).toBeUndefined();
    });
  });
});

describe('Invalid Types', () => {
  it('should have an error when passed a boolean', async () => {
    const [error, result] = await tryCatch(true as any);

    expect(error).toBeInstanceOf(TypeError);
    expect(result).toBeUndefined();

    if (error) {
      expect(error.message).toEqual('Subject is not a function or promise');
    }
  });

  it('should have an error when passed a number', async () => {
    const [error, result] = await tryCatch(7 as any);

    expect(error).toBeInstanceOf(TypeError);
    expect(result).toBeUndefined();

    if (error) {
      expect(error.message).toEqual('Subject is not a function or promise');
    }
  });

  it('should have an error when passed an object', async () => {
    const [error, result] = await tryCatch({ foo: 'bar' } as any);

    expect(error).toBeInstanceOf(TypeError);
    expect(result).toBeUndefined();

    if (error) {
      expect(error.message).toEqual('Subject is not a function or promise');
    }
  });

  it('should have an error when passed a string', async () => {
    const [error, result] = await tryCatch('foo bar' as any);

    expect(error).toBeInstanceOf(TypeError);
    expect(result).toBeUndefined();

    if (error) {
      expect(error.message).toEqual('Subject is not a function or promise');
    }
  });

  it('should have an error when passed a symbol', async () => {
    const [error, result] = await tryCatch(Symbol('foo') as any);

    expect(error).toBeInstanceOf(TypeError);
    expect(result).toBeUndefined();

    if (error) {
      expect(error.message).toEqual('Subject is not a function or promise');
    }
  });

  it('should have an error when passed a undefined', async () => {
    const [error, result] = await tryCatch(undefined as any);

    expect(error).toBeInstanceOf(TypeError);
    expect(result).toBeUndefined();

    if (error) {
      expect(error.message).toEqual('Subject is not a function or promise');
    }
  });

  it('should have an error when passed a null', async () => {
    const [error, result] = await tryCatch(null as any);

    expect(error).toBeInstanceOf(TypeError);
    expect(result).toBeUndefined();

    if (error) {
      expect(error.message).toEqual('Subject is not a function or promise');
    }
  });
});
