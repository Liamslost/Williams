import { createContext } from "react";
import { CircuitSummary } from "../types/circuit";

export interface CircuitContextType {
  circuits: CircuitSummary[] | null;
  loading: boolean;
  error: string | null;
}

export const CircuitContext = createContext<CircuitContextType>({
  circuits: null,
  loading: false,
  error: null,
});
