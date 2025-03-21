import express from 'express';
import { getCircuits } from '../data/dataService';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const circuits = getCircuits();
    res.status(200).json(circuits);
  } catch (error) {
    console.error('Error fetching circuits:', error);
    res.status(500).json({ error: 'Failed to fetch circuit data' });
  }
});

export default router;
