import { useCallback, useEffect, useState } from 'react';

import { tryCatch } from '../try-catch';

export function useTryCatch<ReturnType>(
  subject: Promise<ReturnType>
): {
  data?: ReturnType;
  loading: boolean;
  error?: Error;
  refetch(): Promise<void>;
} {
  const [data, setData] = useState<ReturnType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const refetch = useCallback(async () => {
    if (subject) {
      setLoading(true);

      const [_error, _result] = await tryCatch(subject);

      if (_error) {
        setError(_error);
      } else {
        setData(_result);
      }

      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [subject]);

  return { data, loading, error, refetch };
}
