import request from 'supertest';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import expenseRoutes from './routes/expense.routes';
import { authMiddleware } from './middleware/auth.middleware';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/gastos', authMiddleware, expenseRoutes);

describe('Auth & Expenses Security Check', () => {
  it('should block access to /gastos without a token', async () => {
    const response = await request(app).get('/gastos');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Token no proporcionado');
  });

  it('should have auth routes registered', () => {
    expect(authRoutes).toBeDefined();
  });
});
