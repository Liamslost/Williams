import { useEffect, useState } from 'react';
import { fetchCircuits } from '../api/api';
import { CircuitSummary } from '../types/circuit';

export default function TestCircuits() {
  const [circuits, setCircuits] = useState<CircuitSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCircuits()
      .then(data => {
        setCircuits(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Circuit fetch error:', err);
        setError('Could not load circuits');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading circuits...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Circuits</h2>
      <ul className="space-y-1">
        {circuits.slice(0, 10).map(circuit => (
          <li key={circuit.id} className="border-b pb-1">
            <strong>{circuit.name}</strong> – {circuit.location}, {circuit.country}<br />
            Races: {circuit.totalRaces}, Fastest Lap: {circuit.fastestLap ?? 'N/A'} ms
          </li>
        ))}
      </ul>
    </div>
  );
}
