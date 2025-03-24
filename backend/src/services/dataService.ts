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

interface CircuitData {
  id: number;
  name: string;
  location: string;
  country: string;
  totalRaces: number;
  fastestLap: number | null;
}
interface DriversData {
  id: number;
  driverCode: string | null;
  driverNumber: string | null;
  name: string;
  nationality: string;
  totalRaces: number;
  podiumFinishes: number;
}


function loadJSON<T = CircuitData | DriversData>(fileName: string): T {
  const filePath = path.join(__dirname, '../data', fileName);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

// CACHED DATA

export let circuitsCache: CircuitData[] | null = null;

export let driversCache: DriversData[] | null = null;

export async function getCircuits() {
  if (circuitsCache) return circuitsCache;

  const circuits: Circuit[] = loadJSON('circuits.json');
  const races: Race[] = loadJSON('races.json');
  const lapTimes: LapTime[] = loadJSON('lap_times.json');
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

export async function getDrivers() {
  if (driversCache) return driversCache;

  const drivers: Driver[] = loadJSON('drivers.json');
  const standings: DriverStanding[] = loadJSON('driver_standings.json');

  
  driversCache = drivers.map(driver => {
    const driverResults = standings.filter(s => s.driverId === driver.driverId);

    const totalRaces = driverResults.length;
    const podiums = driverResults.filter(s => Number(s.position) <= 3).length;

    return {
      id: driver.driverId,
      driverCode: driver.code !== "\\N" ? driver.code : null,
      driverNumber: driver.number !== "\\N" ? driver.number : null,
      name: `${driver.forename} ${driver.surname}`,
      nationality: driver.nationality,
      totalRaces: totalRaces,
      podiumFinishes: podiums,
    };
  });

  return driversCache;
}

export async function preloadData() {
  console.time("drivers");
  await getDrivers();
  console.timeEnd("drivers");

  console.time("circuits");
  await getCircuits();
  console.timeEnd("circuits");
}