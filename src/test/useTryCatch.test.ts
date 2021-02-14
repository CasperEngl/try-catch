import { renderHook, act } from '@testing-library/react-hooks';

import { setupServer, User } from './setup';
import { fetchJSON } from './fetch';
import { useTryCatch } from '../../lib/react';

const expectedUserData = {
  data: {
    id: '1',
    firstName: 'George',
    lastName: 'Bluth',
    email: 'george.bluth@test.test',
    avatar: 'https://eu.ui-avatars.com/api/?name=George+Bluth',
  },
};

let server: ReturnType<typeof setupServer>;

beforeAll(() => {
  server = setupServer();
});

afterAll(() => {
  server.shutdown();
});

describe('Hook', () => {
  it('should get users and pass lifecycle testing', async () => {
    await act(async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useTryCatch(fetchJSON<User>('/api/users/1'))
      );

      expect(result.current.data).toBe(undefined);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(undefined);

      await waitForNextUpdate();

      expect(result.current.data).toBe(undefined);
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBe(undefined);

      await waitForNextUpdate();

      expect(result.current.data).toMatchObject(expectedUserData);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);

      result.current.mutate(fetchJSON('/api/error'));

      await waitForNextUpdate();

      expect(result.current.data).toMatchObject(expectedUserData);
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBe(null);

      await waitForNextUpdate();

      expect(result.current.data).toBe(null);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeInstanceOf(Error);

      result.current.mutate(fetchJSON('/api/users/1'));

      await waitForNextUpdate();

      expect(result.current.data).toBe(null);
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBeInstanceOf(Error);

      await waitForNextUpdate();

      expect(result.current.data).toMatchObject(expectedUserData);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });
});
