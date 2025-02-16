import { apiClient, ApiError } from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface UseListOptions {
  resource: string;
  config?: any;
  params?: Record<string, any>; 
  staleTime?: number;
  retry?: number;
  refetchInterval?: number;
  queryKey?: string
}

export const useList = <T>({ resource, config, staleTime, params, retry = 0, refetchInterval, queryKey }: UseListOptions) => {
  const queryClient = useQueryClient();
  const [localState, setLocalState] = useState<T | null>(null); 

  const fetchData = async () => {
    const response = await apiClient.get<T>(resource, { ...config, params }); 
    return response;
  };

  const { data, isLoading, isError, error } = useQuery<T, ApiError>({
    queryKey: [resource, params, queryKey ],
    queryFn: fetchData,
    staleTime: staleTime,
    retry: retry,
    refetchInterval: refetchInterval,
  });

  useEffect(() => {
    if (data) {
      setLocalState(data);
    }
  }, [data]);

  const invalidateQueries = (queryKey: string[]) => {
    queryClient.invalidateQueries({ queryKey });
  };

  return {
    data: localState,
    isLoading,
    isError,
    error,
    invalidateQueries,
  };
};
