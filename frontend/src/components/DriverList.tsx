import { useDrivers } from "../hooks/useDrivers";
import DriverCard from "./DriverCard";
import { useState, useMemo, ChangeEvent } from "react";
import { DriverSummary } from "../types/driver";
import { SlidersIcon } from "lucide-react";
import { motion } from "framer-motion";

type SortKey = "name" | "podiums" | "races";

export default function DriverList() {
  const { drivers, loading, error } = useDrivers();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("podiums");
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_LIMIT = 9;

  const filteredAndSortedDrivers = useMemo((): DriverSummary[] => {
    if (!drivers) return [];

    // filtering and sorting
    const filtered = drivers.filter(
      (driver) =>
        driver.name.toLowerCase().includes(search.toLowerCase()) ||
        driver.nationality.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortKey) {
        case "podiums":
          return b.podiumFinishes - a.podiumFinishes;
        case "races":
          return b.totalRaces - a.totalRaces;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [drivers, search, sortKey]);

  const driversToDisplay = showAll
    ? filteredAndSortedDrivers
    : filteredAndSortedDrivers.slice(0, VISIBLE_LIMIT);

  if (loading) return <p>Loading drivers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!drivers) return <p>No driver data found</p>;

  return (
    <div>
      <div className="bg-[#1a1a1a] p-4 rounded-md border border-[#333] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        {/* Filter bar */}
        <input
          type="text"
          placeholder="Search drivers..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          className="bg-[#222] text-gray-400 p-2 border border-[#333] rounded focus:outline-none w-full sm:max-w-xs "
        />

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <SlidersIcon className="text-gray-400 hidden sm:block" />
          <select
            value={sortKey}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSortKey(e.target.value as SortKey)
            }
            className="bg-[#222] text-gray-400 p-2 border border-[#333] rounded focus:outline-none sm:max-w-xs "
          >
            <option value="podiums">Sort by Podiums (High–Low)</option>
            <option value="name">Sort by Name (A–Z)</option>
            <option value="races">Sort by Total Races (High–Low)</option>
          </select>
          {filteredAndSortedDrivers.length > VISIBLE_LIMIT && (
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="p-2 px-3 border rounded bg-gray-100 hover:bg-gray-200 transition"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>
          )}
        </div>
      </div>

      {/* Driver Grid */}
      <motion.div
        key={sortKey + search}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {driversToDisplay.map((driver) => (
          <motion.div
            key={driver.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <DriverCard driver={driver} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
