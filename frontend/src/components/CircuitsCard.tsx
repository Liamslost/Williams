import { CircuitSummary } from "../types/circuit";
import { FlagIcon, MapIcon, TimerIcon } from "lucide-react";

interface CircuitCardProps {
  circuit: CircuitSummary;
}

export default function CircuitsCard({ circuit }: CircuitCardProps) {
  function millisToMinutesAndSeconds(millis: number): string {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000);
    return `${minutes}:${seconds.toFixed(3).padStart(6, '0')}`;
  }
  return (
    <div
      key={circuit.id}
      className="bg-[#1a1a1a] p-4 rounded-md border border-[#333]"
    >
      <h2 className="text-xl font-bold text-gray-400 mb-4">{circuit.name}</h2>
      <p className="text-sm text-gray-600 mb-6 flex gap-3">
        <MapIcon className="size-6 text-blue-500" /> {circuit.location},{" "}
        {circuit.country}
      </p>
      <div className="bg-[#222] py-4 px-4 rounded-md space-y-4">
        <p className="text-sm flex text-gray-300">
          <FlagIcon className="size-4 text-[#00ffbb] mr-2" />
          <strong className="text-gray-400 pr-2">Total Races:</strong>{" "}
          {circuit.totalRaces}
        </p>
        <p className="text-sm flex text-gray-300">
          <TimerIcon className="size-4 text-[#00ffbb] mr-2" />
          <strong className="text-gray-400 pr-2">Fastest Lap:</strong>{" "}
          {circuit.fastestLap !== null
            ? millisToMinutesAndSeconds(circuit.fastestLap)
            : "N/A"}
        </p>
      </div>
    </div>
  );
}
