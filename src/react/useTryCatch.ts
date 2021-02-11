import { useCallback, useEffect, useRef, useState } from 'react';

import { tryCatch } from '../try-catch';

export function useTryCatch<ReturnType>(
  subject?:
    | Promise<ReturnType>
    | ((..._args: any[]) => ReturnType)
    | ((..._args: Promise<any>[]) => Promise<ReturnType>),
  ...args: any[]
): {
  data?: ReturnType | null;
  loading: boolean;
  error?: Error | null;
  refetch(): Promise<void>;
  setSubject: React.Dispatch<
    React.SetStateAction<ReturnType | Promise<ReturnType> | undefined>
  >;
} {
  const [_subject, setSubject] = useState(
    typeof subject === 'function' ? subject(...args) : subject
  );
  const [data, setData] = useState<ReturnType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const componentIsMounted = useRef(true);

  useEffect(
    () => () => {
      componentIsMounted.current = false;
    },
    []
  );

  const refetch = useCallback(async () => {
    if (_subject) {
      setLoading(true);

      const [_error, _result] = await tryCatch<ReturnType>(
        typeof _subject === 'function' ? _subject(...args) : _subject
      );

      if (componentIsMounted.current) {
        if (_error) {
          setError(_error);
        } else {
          setData(_result);
        }

        setLoading(false);
      }
    }
  }, [_subject]);

  useEffect(() => {
    refetch();
  }, [_subject]);

  return {
    data: error ?? loading ? data : null,
    loading,
    error: data ?? loading ? error : null,
    refetch,
    setSubject,
  };
}
