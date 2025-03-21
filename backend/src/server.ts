// backend/server.ts
import express from "express";
import cors from "cors";
import { getCircuits } from "./data/dataService";
import circuitRoutes from "./routes/circuits";
import driverRoutes from "./routes/drivers"

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// TEST
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the Node backend with TypeScript!" });
});

// ROUTES
app.use("/api/circuits", circuitRoutes);
app.use("/api/drivers", driverRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
