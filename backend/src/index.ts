import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import expenseRoutes from './routes/expense.routes';
import authRoutes from './routes/auth.routes';
import { authMiddleware } from './middleware/auth.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/gastos', authMiddleware, expenseRoutes);

// Ruta básica de salud
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Servidor de gastos funcionando correctamente' });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
