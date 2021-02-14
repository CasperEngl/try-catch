import { useEffect, useRef, useState } from 'react';

import { tryCatch } from '../tryCatch';

export function useTryCatch<ReturnType>(
  subject?: Promise<ReturnType> | undefined,
  ...args: any[]
): {
  data?: ReturnType | null;
  loading: boolean;
  error?: Error | null;
  mutate: React.Dispatch<React.SetStateAction<Promise<ReturnType> | undefined>>;
} {
  const [_subject, mutate] = useState(subject);
  const [data, setData] = useState<ReturnType | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>();
  const componentIsMounted = useRef(true);

  useEffect(
    () => () => {
      componentIsMounted.current = false;
    },
    []
  );

  const refetch = async () => {
    setLoading(true);

    const [_error, _result] = await tryCatch<ReturnType>(_subject, args);

    if (componentIsMounted.current) {
      if (_error) {
        setData(null);
        setError(_error);
      } else {
        setData(_result);
        setError(null);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    refetch();
  }, [_subject]);

  return {
    data: loading && error ? null : data,
    loading,
    error: loading && data ? null : error,
    mutate,
  };
}
