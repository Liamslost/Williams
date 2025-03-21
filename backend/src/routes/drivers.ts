import express from 'express';
import { getDrivers } from '../data/dataService';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const drivers = getDrivers();
    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ error: 'Failed to fetch driver data' });
  }
});

export default router;
