import { useEffect, useState } from 'react';
import { CircuitSummary } from '../types/circuit';
import { fetchCircuits } from '../api/api';
import { CircuitContext } from './CircuitContextObject';

export function CircuitProvider({ children }: { children: React.ReactNode }) {
  const [circuits, setCircuits] = useState<CircuitSummary[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCircuits()
      .then(data => {
        setCircuits(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load circuits' + error);
        setLoading(false);
      });
  }, []);

  return (
    <CircuitContext.Provider value={{ circuits, loading, error }}>
      {children}
    </CircuitContext.Provider>
  );
}
