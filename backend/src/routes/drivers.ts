import express from "express";
import { getDrivers } from "../services/dataService";

const router = express.Router();

router.get("/", async(req, res) => {
  try {
    const drivers = await getDrivers();
    res.status(200).json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ error: "Failed to fetch driver data" });
  }
});

export default router;
