/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-constant-condition */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import axios from 'axios'

import { tryCatch } from '../lib/index'

describe('Function', () => {
  it('should return the value', async () => {
    const fn = (): string => 'success'

    const [error, result] = await tryCatch(fn)

    expect(error).toBeNull()
    expect(result).toEqual('success')
  })

  it('should return the passed argument value', async () => {
    const fn = (x: string): string => x

    const [error, result] = await tryCatch(fn, 'success')

    expect(error).toBeNull()
    expect(result).toEqual('success')
  })

  it('should return the passed arguments multiplied', async () => {
    const fn = (x: number, y: number): number => x * y

    const [error, result] = await tryCatch(fn, 7, 7)

    expect(error).toBeNull()
    expect(result).toEqual(49)
  })

  it('should resolve to an object', async () => {
    const fn = (): { status: string } => ({
      status: 'success',
    })

    const [error, result] = await tryCatch(fn)

    expect(error).toBeNull()
    expect(result).toEqual({
      status: 'success',
    })
  })

  it('should throw an error', async () => {
    const fn = (): string => {
      if (Math.random() < 2) {
        throw new Error('An error occurred')
      }

      return 'success'
    }

    const [error, result] = await tryCatch(fn)

    expect(fn).toThrowError('An error occurred')
    expect(error).toBeInstanceOf(Error)
    expect(result).toBeUndefined()

    if (error) {
      expect(error.message).toEqual('An error occurred')
    }
  })
})

describe('Promise', () => {
  it('should return the value', async () => {
    const promise = new Promise<string>((resolve) => resolve('success'))

    const [error, result] = await tryCatch(promise)

    expect(error).toBeNull()
    expect(result).toEqual('success')
  })

  it('should return the passed argument value', async () => {
    const fnReturningPromise = (
      x: string,
    ): Promise<string> => new Promise((resolve) => resolve(x))

    const [error, result] = await tryCatch(fnReturningPromise, 'success')

    expect(error).toBeNull()
    expect(result).toEqual('success')
  })

  it('should return the passed arguments multiplied', async () => {
    const fnReturningPromise = (
      x: number,
      y: number,
    ): Promise<number> => new Promise((resolve) => resolve(x * y))

    const [error, result] = await tryCatch(fnReturningPromise, 7, 7)

    expect(error).toBeNull()
    expect(result).toEqual(49)
  })

  it('should resolve to an object', async () => {
    const promise = new Promise<{
      status: string;
    }>((resolve) => resolve({
      status: 'success',
    }))

    const [error, result] = await tryCatch(promise)

    expect(error).toBeNull()
    expect(result).toEqual({
      status: 'success',
    })
  })

  it('should throw an error', async () => {
    const promise = new Promise<any>((resolve) => {
      if (Math.random() < 2) {
        throw new Error('An error was thrown')
      }

      resolve('success')
    })

    const [error, result] = await tryCatch(promise)

    expect(error).toBeInstanceOf(Error)
    expect(result).toBeUndefined()

    if (error) {
      expect(error.message).toEqual('An error was thrown')
    }
  })

  describe('Promise specific', () => {
    it('should error on reject', async () => {
      const promise = Promise.reject(new Error('An error occurred'))

      const [error, result] = await tryCatch(promise)

      expect(error).toBeInstanceOf(Error)
      expect(result).toBeUndefined()

      if (error) {
        expect(error.message).toEqual('An error occurred')
      }
    })

    it('should return user from get request', async () => {
      const promise = axios.get('https://reqres.in/api/users/1')

      const [error, result] = await tryCatch(promise)

      expect(error).toBeNull()
      expect(result).toMatchObject({
        data: {
          data: {
            first_name: 'George',
            last_name: 'Bluth',
          },
        },
      })
    })

    it('should return newly created user from post request', async () => {
      const promise = axios.post('https://reqres.in/api/users', {
        first_name: 'Foo',
        last_name: 'Bar',
      })

      const [error, result] = await tryCatch(promise)

      expect(error).toBeNull()
      expect(result).toMatchObject({
        data: {
          first_name: 'Foo',
          last_name: 'Bar',
        },
      })
    })
  })
})

describe('Invalid Types', () => {
  it('should have an error when passed a boolean', async () => {
    const [error, result] = await tryCatch((true as any))

    expect(error).toBeInstanceOf(TypeError)
    expect(result).toBeUndefined()

    if (error) {
      expect(error.message).toEqual('\'true\' is not a function or promise')
    }
  })

  it('should have an error when passed a number', async () => {
    const [error, result] = await tryCatch((7 as any))

    expect(error).toBeInstanceOf(TypeError)
    expect(result).toBeUndefined()

    if (error) {
      expect(error.message).toEqual('\'7\' is not a function or promise')
    }
  })

  it('should have an error when passed an object', async () => {
    const [error, result] = await tryCatch(({ foo: 'bar' } as any))

    expect(error).toBeInstanceOf(TypeError)
    expect(result).toBeUndefined()

    if (error) {
      expect(error.message).toEqual('\'[object Object]\' is not a function or promise')
    }
  })

  it('should have an error when passed a string', async () => {
    const [error, result] = await tryCatch(('foo bar' as any))

    expect(error).toBeInstanceOf(TypeError)
    expect(result).toBeUndefined()

    if (error) {
      expect(error.message).toEqual('\'foo bar\' is not a function or promise')
    }
  })

  it('should have an error when passed a symbol', async () => {
    const [error, result] = await tryCatch((Symbol('foo') as any))

    expect(error).toBeInstanceOf(TypeError)
    expect(result).toBeUndefined()

    if (error) {
      expect(error.message).toEqual('\'Symbol(foo)\' is not a function or promise')
    }
  })

  it('should have an error when passed a undefined', async () => {
    const [error, result] = await tryCatch((undefined as any))

    expect(error).toBeInstanceOf(TypeError)
    expect(result).toBeUndefined()

    if (error) {
      expect(error.message).toEqual('\'undefined\' is not a function or promise')
    }
  })

  it('should have an error when passed a null', async () => {
    const [error, result] = await tryCatch((null as any))

    expect(error).toBeInstanceOf(TypeError)
    expect(result).toBeUndefined()

    if (error) {
      expect(error.message).toEqual('\'null\' is not a function or promise')
    }
  })
})
