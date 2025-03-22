export interface CircuitSummary {
  id: number;
  name: string;
  location: string;
  country: string;
  totalRaces: number;
  fastestLap: number | null;
}
