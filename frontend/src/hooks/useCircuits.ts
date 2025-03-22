import { useContext } from "react";
import { CircuitContext } from "../context/CircuitContextObject";

export function useCircuits() {
  return useContext(CircuitContext);
}
