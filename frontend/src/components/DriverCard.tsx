import { Flag, Trophy } from "lucide-react";
import { DriverSummary } from "../types/driver";

interface DriverCardProps {
  driver: DriverSummary;
}

export default function DriverCard({ driver }: DriverCardProps) {
  return (
    <div className="bg-[#1a1a1a] p-4 rounded-md border border-[#333] ">
      <h2 className="text-xl font-bold">{driver.name}</h2>
      <p className="text-gray-400">{driver.nationality}</p>

      <div className="mt-2">
        <p className="flex gap-3">
          <Trophy /> Podiums:{" "}
          <span className="font-bold">{driver.podiumFinishes}</span>
        </p>
        <p className="flex gap-3">
          <Flag /> Total Races:{" "}
          <span className="font-bold">{driver.totalRaces}</span>
        </p>
      </div>
    </div>
  );
}
