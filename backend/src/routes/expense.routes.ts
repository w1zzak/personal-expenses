import { Router } from 'express';
import * as expenseController from '../controllers/expense.controller';

const router = Router();

// Rutas para /api/gastos
router.get('/', expenseController.getExpenses);
router.post('/', expenseController.postExpense);
router.put('/:id', expenseController.putExpense);
router.delete('/:id', expenseController.deleteExpense);

export default router;
