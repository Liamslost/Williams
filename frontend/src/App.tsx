import CircuitsList from "./components/CircuitsList";
import DriverList from "./components/DriverList";
import { Routes, Route, NavLink } from 'react-router-dom';

function App() {


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">F1 Dashboard</h1>
      
      {/* Navigation Links */}
      <nav className="mb-4 flex gap-4">
        <NavLink 
          to="/drivers" 
          className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-gray-600"}
        >
          Drivers
        </NavLink>
        <NavLink 
          to="/circuits" 
          className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-gray-600"}
        >
          Circuits
        </NavLink>
        {/* Add another link for telemetry if needed */}
      </nav>
      
      {/* Define Routes */}
      <Routes>
        <Route path="/drivers" element={<DriverList />} />
        <Route path="/circuits" element={<CircuitsList />} />
        {/* Optional: default route */}
        <Route path="*" element={<DriverList />} />
      </Routes>
    </div>
  );
}

export default App;
