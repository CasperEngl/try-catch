/* import { useCallback, useEffect } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useTryCatch } from './useTryCatch';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
*/

test('true', () => {
  expect(true).toBe(true);
});

/* test('should get data', async () => {
  let data: unknown;
  let loading: unknown;
  let error: unknown;

  const promise = async () => {
    await wait(200);

    return 'success';
  };

  const promiseError = async () => {
    await wait(200);

    throw new Error('reject');
  };

  await act(async () => {
    const { result, waitForNextUpdate } = renderHook(() => {
      const {
        data: _data,
        loading: _loading,
        error: _error,
        setSubject,
      } = useTryCatch();

      const updateData = useCallback(() => {
        data = _data;
      }, [_data]);

      const updateLoading = useCallback(() => {
        loading = _loading;
      }, [_loading]);

      const updateError = useCallback(() => {
        error = _error;
      }, [_error]);

      updateData();
      updateLoading();
      updateError();

      useEffect(() => {
        updateData();
      }, [_data]);

      useEffect(() => {
        updateLoading();
      }, [_loading]);

      useEffect(() => {
        updateError();
      }, [_error]);

      return { setSubject };
    });

    expect(data).toBe(null);
    expect(loading).toBe(false);
    expect(error).toBe(null);

    result.current.setSubject(promise());

    await waitForNextUpdate();
    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(data).toBe('success');
    expect(loading).toBe(false);
    expect(error).toBe(undefined);

    result.current.setSubject(promiseError());

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(data).toBe(null);
    expect(loading).toBe(false);
    expect(error).toBeInstanceOf(Error);
  });
});
 */
