import { useEffect, useState } from 'react';
import { DriverSummary } from '../types/driver'; 
import { fetchDrivers } from '../api/api';

export function useDrivers() {
  const [drivers, setDrivers] = useState<DriverSummary[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDrivers()
      .then((data) => {
        setDrivers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Driver fetch error:', err);
        setError('Failed to load drivers');
        setLoading(false);
      });
  }, []);

  return { drivers, loading, error };
}
