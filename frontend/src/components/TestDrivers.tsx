import { useEffect, useState } from 'react';
import { fetchDrivers } from '../api/api';
import { DriverSummary } from '../types/driver';

export default function TestDrivers() {
  const [drivers, setDrivers] = useState<DriverSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDrivers()
      .then(data => {
        setDrivers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Driver fetch error:', err);
        setError('Could not load drivers');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading drivers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Drivers</h2>
      <ul className="space-y-1">
        {drivers.slice(0, 10).map(driver => (
          <li key={driver.id} className="border-b pb-1">
            <strong>{driver.name}</strong> – {driver.podiumFinishes} podiums, {driver.totalRaces} races
          </li>
        ))}
      </ul>
    </div>
  );
}
