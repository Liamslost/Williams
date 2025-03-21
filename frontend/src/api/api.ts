const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
import { DriverSummary } from '../types/driver';
import { CircuitSummary } from '../types/circuit';

// TEST
export async function fetchHello() {
  const response = await fetch(`${API_BASE_URL}/hello`);
  return response.json();
}

// API FETCH

export async function fetchDrivers(): Promise<DriverSummary[]> {
    const res = await fetch(`${API_BASE_URL}/api/drivers`);
    if (!res.ok) throw new Error('Failed to fetch drivers');
    return await res.json();
  }

  export async function fetchCircuits(): Promise<CircuitSummary[]> {
    const res = await fetch(`${API_BASE_URL}/api/circuits`);
    if (!res.ok) throw new Error('Failed to fetch circuits');
    return await res.json();
  }