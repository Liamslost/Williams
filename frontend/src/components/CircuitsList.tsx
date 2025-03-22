import { useCircuits } from "../hooks/useCircuits";

import { useState, useMemo, ChangeEvent } from "react";
import { CircuitSummary } from "../types/circuit";
import CircuitsCard from "./CircuitsCard";
import { SlidersIcon } from "lucide-react";

type SortKey = "name" | "races" | "fastestLap";

export default function CircuitsList() {
  const { circuits, loading, error } = useCircuits();
  const [search, setSearch] = useState<string>("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [showAll, setShowAll] = useState<boolean>(false);
  const VISIBLE_LIMIT = 9;

  const filteredAndSortedCircuits = useMemo((): CircuitSummary[] => {
    if (!circuits) return [];

    const filtered = circuits.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortKey) {
        case "races":
          return b.totalRaces - a.totalRaces;
        case "fastestLap":
          return (a.fastestLap ?? Infinity) - (b.fastestLap ?? Infinity);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [circuits, search, sortKey]);

  const circuitsToDisplay = showAll
    ? filteredAndSortedCircuits
    : filteredAndSortedCircuits.slice(0, VISIBLE_LIMIT);

  if (loading) return <p>Loading circuits...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!circuits) return <p>No circuit data found</p>;

  return (
    <div>
      {/* filters */}
      <div className="bg-[#1a1a1a] p-4 rounded-md border ring-0 border-[#333] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search circuits..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          className="bg-[#222] text-gray-400 p-2 border border-[#333] rounded focus:outline-none w-full sm:max-w-xs "
        />

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <SlidersIcon className="text-gray-400" />
          <select
            value={sortKey}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSortKey(e.target.value as SortKey)
            }
            className="bg-[#222] text-gray-400 p-2 border border-[#333] rounded focus:outline-none sm:max-w-xs "
          >
            <option value="name">Sort by Name (A–Z)</option>
            <option value="races">Sort by Total Races (High–Low)</option>
            <option value="fastestLap">
              Sort by Fastest Lap (Quickest First)
            </option>
          </select>

          {filteredAndSortedCircuits.length > VISIBLE_LIMIT && (
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="py-2 px-3 border rounded bg-gray-100 hover:bg-gray-200 transition"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>
          )}
        </div>
      </div>

      {/* Circuit Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {circuitsToDisplay.map((circuit) => (
          <CircuitsCard key={circuit.id} circuit={circuit} />
        ))}
      </div>
    </div>
  );
}
