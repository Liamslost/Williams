import express from 'express';
import cors from 'cors';
import circuitRoutes from './routes/circuits';
import driverRoutes from './routes/drivers';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/circuits', circuitRoutes);
app.use('/api/drivers', driverRoutes);

export default app;
