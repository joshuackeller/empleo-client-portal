import { useEffect, useState } from "react";

const useQuery = <TData>(
  queryFn: (props?: any) => Promise<any>,
  props?: any,
  options?: {
    enabled?: boolean;
  }
) => {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true || options?.enabled);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [isSettled, setIsSettled] = useState<boolean>(false);

  useEffect(() => {
    const query = async () => {
      setIsLoading(true);
      try {
        const response = await queryFn(props);
        setData(response?.data || response);
        setIsSettled(true);
      } catch (error) {
        setIsError(true);
        setError(error);
      }

      setIsLoading(false);
    };
    if (options?.enabled !== false) {
      query();
    } else {
      setIsLoading(false);
    }
  }, [options?.enabled]);

  return {
    data,
    isLoading,
    isError,
    error,
    isSettled,
  };
};
export default useQuery;
