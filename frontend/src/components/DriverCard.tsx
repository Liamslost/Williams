import { DriverSummary } from '../types/driver';

interface DriverCardProps {
  driver: DriverSummary;
}

export default function DriverCard({ driver }: DriverCardProps) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl shadow-md w-72">
      <h2 className="text-xl font-bold">{driver.name}</h2>
      <p className="text-gray-400">{driver.nationality}</p>

      <div className="mt-2">
        <p>🏆 Podiums: <span className="font-bold">{driver.podiumFinishes}</span></p>
        <p>🏁 Total Races: <span className="font-bold">{driver.totalRaces}</span></p>
      </div>

      {/* {driver.fastestLap && (
        <div className="bg-gray-900 p-2 mt-3 rounded-lg">
          <p className="text-green-400 text-lg font-bold">{formatLapTime(driver.fastestLap)}</p>
          <p className="text-xs">{driver.year} - {driver.circuit}</p>
        </div>
      )} */}
    </div>
  );
}

// Convert milliseconds to `1:27.097`
// function formatLapTime(ms: number): string {
//   const minutes = Math.floor(ms / 60000);
//   const seconds = ((ms % 60000) / 1000).toFixed(3);
//   return `${minutes}:${seconds.padStart(6, '0')}`;
// }
