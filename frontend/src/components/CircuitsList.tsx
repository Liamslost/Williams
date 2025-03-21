import { useCircuits } from '../hooks/useCircuits';

export default function CircuitsList() {
  const { circuits, loading, error } = useCircuits();

  if (loading) return <p>Loading circuits...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!circuits) return null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Circuits</h2>
      <ul className="space-y-2">
        {circuits.map(circuit => (
          <li key={circuit.id} className="border p-2 rounded">
            <strong>{circuit.name}</strong> {circuit.location}, {circuit.country}<br />
            Races: {circuit.totalRaces}, Fastest Lap: {circuit.fastestLap ?? 'N/A'} ms
          </li>
        ))}
      </ul>
    </div>
  );
}