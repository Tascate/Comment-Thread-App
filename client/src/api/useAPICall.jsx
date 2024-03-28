import { useState, useCallback } from "react";

export function useAPICall(apiCall, dependencies = []) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [response, setResponse] = useState();

  const request = useCallback((...params) => {
    setLoading(true);
    return apiCall(...params)
      .then((res) => {
        setError(undefined);
        setResponse(res);
        return res;
      })
      .catch((error) => {
        setError(error);
        return Promise.reject(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies);
  return { request, res: response, loading, error };
}
