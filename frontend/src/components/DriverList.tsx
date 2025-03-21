import { useDrivers } from '../hooks/useDrivers';
import DriverCard from './DriverCard';

export default function DriverList() {
  const { drivers, loading, error } = useDrivers();

  if (loading) return <p>Loading drivers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!drivers) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {drivers.map(driver => (
        <DriverCard key={driver.id} driver={driver} />
      ))}
    </div>
  );
}
