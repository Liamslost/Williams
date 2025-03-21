import TestDrivers from "./components/TestDrivers";
import TestCircuits from "./components/TestCircuits";

function App() {
  return (
    <>

        <div className="App p-6">
          <h1 className="text-2xl font-bold mb-6">F1 Dashboard</h1>
          <TestDrivers />
        </div>
        <div className="App p-6">
          <h1 className="text-2xl font-bold mb-6">F1 Dashboard</h1>
          <TestCircuits />
        </div>
 
    </>
  );
}

export default App;
