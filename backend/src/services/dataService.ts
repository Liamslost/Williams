import fs from 'fs';
import path from 'path';

interface Circuit {
  circuitId: number;
  name: string;
  location: string;
  country: string;
}

interface Race {
  raceId: number;
  circuitId: number;
  driverId?: number;
}

interface LapTime {
  raceId: number;
  milliseconds: number;
}

interface Driver {
  driverId: number;
  code: string;
  number: string;
  forename: string;
  surname: string;
  nationality: string;
}

interface DriverStanding {
  driverId: number;
  raceId: number;
  position: string | number;
}

// Helper to load a JSON file
function loadJSON<T = any>(fileName: string): T {
  const filePath = path.join(__dirname, '../data', fileName);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

// Cached data
let circuitsCache: any[] | null = null;
let driversCache: any[] | null = null;

export function getCircuits() {
  if (circuitsCache) return circuitsCache;

  const circuits: Circuit[] = loadJSON('circuits.json');
  const races: Race[] = loadJSON('races.json');
  const lapTimes: LapTime[] = loadJSON('lap_times.json'); // loads once here

  circuitsCache = circuits.map(circuit => {
    const circuitRaces = races.filter(r => r.circuitId === circuit.circuitId);
    const totalRaces = circuitRaces.length;

    let fastestLap = Infinity;

    circuitRaces.forEach(race => {
      const laps = lapTimes.filter(lap => lap.raceId === race.raceId);
      if (laps.length > 0) {
        const bestLap = Math.min(...laps.map(lap => lap.milliseconds));
        if (bestLap < fastestLap) fastestLap = bestLap;
      }
    });

    return {
      id: circuit.circuitId,
      name: circuit.name,
      location: circuit.location,
      country: circuit.country,
      totalRaces,
      fastestLap: fastestLap === Infinity ? null : fastestLap,
    };
  });

  return circuitsCache;
}

export function getDrivers() {
  if (driversCache) return driversCache;

  const drivers: Driver[] = loadJSON('drivers.json');
  const standings: DriverStanding[] = loadJSON('driver_standings.json');

  driversCache = drivers.map(driver => {
    const driverResults = standings.filter(s => s.driverId === driver.driverId);
    const totalRaces = new Set(driverResults.map(s => s.raceId)).size;

    const podiums = driverResults.filter(s =>
      s.position && Number(s.position) <= 3
    ).length;

    return {
      id: driver.driverId,
      driverCode: driver.code,
      driverNumber: driver.number,
      name: `${driver.forename} ${driver.surname}`,
      nationality: driver.nationality,
      totalRaces,
      podiumFinishes: podiums,
    };
  });

  return driversCache;
}