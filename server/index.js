import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.js';
import { ordersRouter } from './routes/orders.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRouter);

// Protected routes
app.use('/api/orders', authenticateToken, ordersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});