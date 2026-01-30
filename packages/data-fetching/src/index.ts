import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, RequestConfig, Logger } from '@sushi-pub/core';

const logger = new Logger('DataFetching');

/**
 * Simple in-memory cache implementation
 */
class Cache {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();

  set(key: string, data: any, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + ttl,
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() > cached.timestamp) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new Cache();

/**
 * Fetch data from an API endpoint
 */
export async function fetchData<T = any>(
  url: string,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  const cacheKey = `${url}-${JSON.stringify(config || {})}`;

  // Check cache if enabled
  if (config?.cache?.enabled) {
    const cached = cache.get(cacheKey);
    if (cached) {
      logger.log('Cache hit:', url);
      return cached;
    }
  }

  try {
    const response = await fetch(url, {
      method: config?.method || 'GET',
      headers: config?.headers,
      body: config?.body ? JSON.stringify(config.body) : undefined,
    });

    const data = await response.json();

    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const result: ApiResponse<T> = {
      data,
      status: response.status,
      statusText: response.statusText,
      headers,
    };

    // Cache the result if enabled
    if (config?.cache?.enabled) {
      cache.set(cacheKey, result, config.cache.ttl);
      logger.log('Cached:', url);
    }

    return result;
  } catch (error) {
    logger.error('Fetch error:', error);
    throw error;
  }
}

/**
 * React hook for data fetching with loading and error states
 */
export function useFetch<T = any>(
  url: string | null,
  config?: RequestConfig
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetchData<T>(url, config);
      setData(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [url, config]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const refetch = useCallback(() => {
    return fetch();
  }, [fetch]);

  return { data, loading, error, refetch };
}

/**
 * React hook for mutations (POST, PUT, DELETE)
 */
export function useMutation<T = any, V = any>(
  url: string,
  config?: Omit<RequestConfig, 'method'>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (variables: V, method: 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'POST') => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchData<T>(url, {
          ...config,
          method,
          body: variables,
        });
        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, config]
  );

  return { data, loading, error, mutate };
}

/**
 * Clear all cached data
 */
export function clearCache(): void {
  cache.clear();
  logger.log('Cache cleared');
}

export default {
  fetchData,
  useFetch,
  useMutation,
  clearCache,
};
