import CircuitsList from "./components/CircuitsList";
import DriverList from "./components/DriverList";
import { Routes, Route, NavLink } from "react-router-dom";
import { CircuitProvider } from "./context/CircuitContext";
import { MapIcon, User2Icon } from "lucide-react";

function App() {
  return (
    <CircuitProvider>
      <div className="min-h-screen pt-6 px-8 bg-black">
        <h1 className="text-2xl font-bold mb-6">F1 Dashboard</h1>
      
        <nav className="mb-4 gap-4 bg-[#1a1a1a] p-4 rounded-md border border-[#333] flex ">
          <NavLink
            to="/drivers"
            className={({ isActive }) =>
              isActive ? "text-[#00ffbb] flex bg-[#333] p-3 rounded-md" : "text-gray-600 flex p-3"
            }
          >
            <User2Icon className="mr-2"/> Drivers
          </NavLink>
          <NavLink
            to="/circuits"
            className={({ isActive }) =>
              isActive ? "text-[#00ffbb] flex bg-[#333] p-3 rounded-md" : "text-gray-600 flex p-3"
            }
          >
             <MapIcon className="mr-2"/> Circuits
          </NavLink>
        </nav>

        <Routes>
          <Route path="/drivers" element={<DriverList />} />
          <Route path="/circuits" element={<CircuitsList />} />
          <Route path="*" element={<DriverList />} />
        </Routes>
      </div>
    </CircuitProvider>
  );
}

export default App;
