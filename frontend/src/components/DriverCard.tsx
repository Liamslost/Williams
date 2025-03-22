import { Flag, Trophy } from "lucide-react";
import { DriverSummary } from "../types/driver";

interface DriverCardProps {
  driver: DriverSummary;
}

export default function DriverCard({ driver }: DriverCardProps) {
  return (
    <div className="bg-[#1a1a1a] p-4 text-gray-400 rounded-md border border-[#333] ">
      <h2 className="text-xl font-bold">{driver.name}</h2>
      <p className="text-gray-600 mb-5">{driver.nationality}</p>

      <div className=" flex gap-2">
        <div className="w-1/2 bg-[#222] py-2 px-4 rounded-md">
          <p className="flex gap-3 mb-2">
            <Trophy className="text-yellow-500" /> Podiums:{" "}
          </p>
          <p className="font-bold text-3xl">{driver.podiumFinishes}</p>
        </div>
        <div className="w-1/2 bg-[#222] py-2 px-4 rounded-md">
          <p className="flex gap-3 mb-2">
            <Flag className="text-[#00ffbb]" /> Total Races:{" "}
          </p>
          <p className="font-bold text-3xl ">{driver.totalRaces}</p>
        </div>
      </div>
    </div>
  );
}
