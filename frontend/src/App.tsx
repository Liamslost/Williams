import {
  Routes,
  Route,
  NavLink,
  useLocation,
  Navigate,
} from "react-router-dom";
import CircuitsList from "./components/CircuitsList";
import DriverList from "./components/DriverList";
import { CircuitProvider } from "./context/CircuitContext";
import { MapIcon, User2Icon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen p-4">
      <nav className="mb-4 gap-4 bg-[#1a1a1a] p-4 rounded-md border border-[#333] flex ">
        <NavLink
          to="/drivers"
          className={({ isActive }) =>
            isActive
              ? "text-[#00ffbb] flex bg-[#333] p-3 rounded-md"
              : "text-gray-600 flex p-3"
          }
        >
          <User2Icon className="mr-2" /> Drivers
        </NavLink>
        <NavLink
          to="/circuits"
          className={({ isActive }) =>
            isActive
              ? "text-[#00ffbb] flex bg-[#333] p-3 rounded-md"
              : "text-gray-600 flex p-3"
          }
        >
          <MapIcon className="mr-2" /> Circuits
        </NavLink>
      </nav>

      <CircuitProvider>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/drivers"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <DriverList />
                </motion.div>
              }
            />
            <Route
              path="/circuits"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <CircuitsList />
                </motion.div>
              }
            />
            <Route path="/" element={<Navigate to="/drivers" replace />} />
            <Route path="*" element={<Navigate to="/drivers" replace />} />
          </Routes>
        </AnimatePresence>
      </CircuitProvider>
    </div>
  );
}

export default App;
