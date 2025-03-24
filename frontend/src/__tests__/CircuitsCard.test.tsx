import { render, screen } from "@testing-library/react";
import CircuitsCard from "../components/CircuitsCard";

test("renders circuit card with content", () => {
    
  render(
    <CircuitsCard
      circuit={{
        id: 1,
        name: "Silverstone Circuit",
        location: "Silverstone",
        country: "UK",
        totalRaces: 59,
        fastestLap: 78739,
      }}
    />
  );
  
const nestedRacesEl = screen.getByText((_, el) =>
  el?.textContent === "Total Races: 59");

  expect(screen.getByText("Silverstone Circuit")).toBeInTheDocument();
  expect(screen.getByText(/Silverstone, UK/)).toBeInTheDocument();
  expect(screen.getByText("Fastest Lap:")).toBeInTheDocument();
  expect(nestedRacesEl).toBeInTheDocument();
});
