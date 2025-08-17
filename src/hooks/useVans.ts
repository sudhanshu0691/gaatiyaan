import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

export const useVans = () => {
  const { allProviders } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVans = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Data now comes from context, so we just simulate a refresh delay
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to fetch van data.');
      console.error(err);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (allProviders.length > 0) {
      setIsLoading(false);
    }
  }, [allProviders]);

  return { allProviders, vans: allProviders, isLoading, error, refreshVans: fetchVans };
};