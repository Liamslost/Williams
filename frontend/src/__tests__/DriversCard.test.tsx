import { render, screen } from "@testing-library/react";
import DriverCard from "../components/DriverCard";
import { DriverSummary } from "../types/driver";

describe("DriverCard", () => {
  const mockDriver: DriverSummary = {
    id: 1,
    driverCode: "HAM",
    driverNumber: "44",
    name: "Lewis Hamilton",
    nationality: "British",
    totalRaces: 300,
    podiumFinishes: 150,
  };

  it("renders driver card with correct content", () => {
    render(<DriverCard driver={mockDriver} />);

    expect(screen.getByText("Lewis Hamilton")).toBeInTheDocument();
    expect(screen.getByText("British")).toBeInTheDocument();
    expect(screen.getByText(/Total Races:/i)).toBeInTheDocument();
    expect(screen.getByText("300")).toBeInTheDocument();
    expect(screen.getByText(/Podiums:/i)).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });
});
