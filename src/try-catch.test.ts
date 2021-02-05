/* eslint-disable camelcase */
/* eslint-disable no-constant-condition */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import axios from 'axios';
import { createServer, Model, Registry } from 'miragejs';
// eslint-disable-next-line import/no-unresolved
import { ModelDefinition } from 'miragejs/-types';
// eslint-disable-next-line import/no-unresolved
import Schema from 'miragejs/orm/schema';

import { tryCatch } from '../lib/try-catch.es';

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

const UserModel: ModelDefinition<User> = Model.extend({});

type AppRegistry = Registry<
  { user: typeof UserModel },
  {
    /* factories can be defined here */
  }
>;
type AppSchema = Schema<AppRegistry>;

let server: any;

beforeEach(() => {
  server = createServer({
    models: {
      user: UserModel,
    },
    routes() {
      this.namespace = 'api';

      this.get('/users', (schema: AppSchema) => ({
        data: schema.all('user'),
      }));

      this.get('/users/:id', async (schema: AppSchema, request) => ({
        data: schema.find('user', request.params.id),
      }));

      this.post('/users', (schema: AppSchema, request) => ({
        data: schema.create('user', {
          ...JSON.parse(request.requestBody),
        }),
      }));
    },
    seeds(_server) {
      (_server.schema as AppSchema).create('user', {
        email: 'george.bluth@test.test',
        first_name: 'George',
        last_name: 'Bluth',
        avatar: 'https://eu.ui-avatars.com/api/?name=George+Bluth',
      });
      (_server.schema as AppSchema).create('user', {
        email: 'janet.weaver@test.test',
        first_name: 'Janet',
        last_name: 'Weaver',
        avatar: 'https://eu.ui-avatars.com/api/?name=Janet+Weaver',
      });
      (_server.schema as AppSchema).create('user', {
        email: 'emma.wong@test.test',
        first_name: 'Emma',
        last_name: 'Wong',
        avatar: 'https://eu.ui-avatars.com/api/?name=Emma+Wong',
      });
      (_server.schema as AppSchema).create('user', {
        email: 'eve.holt@test.test',
        first_name: 'Eve',
        last_name: 'Holt',
        avatar: 'https://eu.ui-avatars.com/api/?name=Eve+Holt',
      });
      (_server.schema as AppSchema).create('user', {
        email: 'charles.morris@test.test',
        first_name: 'Charles',
        last_name: 'Morris',
        avatar: 'https://eu.ui-avatars.com/api/?name=Charles+Morris',
      });
      (_server.schema as AppSchema).create('user', {
        email: 'tracey.ramos@test.test',
        first_name: 'Tracey',
        last_name: 'Ramos',
        avatar: 'https://eu.ui-avatars.com/api/?name=Tracey+Ramos',
      });
    },
  });
});

afterEach(() => {
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
      const promise = axios.get<{
        data: { modelName: 'user'; models: User[] };
      }>('/api/users');

      const [error, result] = await tryCatch(promise);

      expect(error).toBeNull();
      expect(result?.data.data.models).toHaveLength(6);
    });

    it('should return user from get request', async () => {
      const promise = axios.get<User>('/api/users/1');

      const [error, result] = await tryCatch(promise);

      expect(error).toBeNull();
      expect(result?.data).toMatchObject({
        data: {
          id: '1',
          first_name: 'George',
          last_name: 'Bluth',
          email: 'george.bluth@test.test',
          avatar: 'https://eu.ui-avatars.com/api/?name=George+Bluth',
        },
      });
    });

    it('should return newly created user from post request', async () => {
      const promise = axios.post<User>('/api/users', {
        first_name: 'Foo',
        last_name: 'Bar',
      });

      const [error, result] = await tryCatch(promise);

      expect(error).toBeNull();
      expect(result?.data).toMatchObject({
        data: {
          id: '7',
          first_name: 'Foo',
          last_name: 'Bar',
        },
      });
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
