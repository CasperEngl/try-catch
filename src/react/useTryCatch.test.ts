import { useCallback, useEffect } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useTryCatch } from './useTryCatch';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test('should get data', async () => {
  let data: unknown;
  let loading: unknown;
  let error: unknown;

  const promise: Promise<string> = new Promise((resolve) => {
    wait(200).then(() => {
      resolve('success');
    });
  });

  await act(async () => {
    const { waitForNextUpdate } = renderHook(() => {
      const { data: _data, loading: _loading, error: _error } = useTryCatch(
        promise
      );

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
    });

    expect(data).toBe(undefined);
    expect(loading).toBe(false);
    expect(error).toBe(undefined);

    await waitForNextUpdate();

    expect(data).toBe(undefined);
    expect(loading).toBe(true);
    expect(error).toBe(undefined);

    await waitForNextUpdate();

    expect(data).toBe('success');
    expect(loading).toBe(false);
    expect(error).toBe(undefined);
  });
});
