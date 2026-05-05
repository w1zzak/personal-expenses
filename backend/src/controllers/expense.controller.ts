import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import * as expenseService from '../services/expense.service';

/**
 * Controlador para obtener la lista de gastos del usuario autenticado.
 */
export const getExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const expenses = await expenseService.getAllExpenses(req.userId!);
    res.json(expenses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controlador para crear un nuevo gasto para el usuario autenticado.
 */
export const postExpense = async (req: AuthRequest, res: Response) => {
  try {
    const newExpense = await expenseService.createExpense(req.userId!, req.body);
    res.status(201).json(newExpense);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Controlador para eliminar un gasto.
 */
export const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await expenseService.deleteExpense(req.userId!, parseInt(id));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controlador para actualizar un gasto.
 */
export const putExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updatedExpense = await expenseService.updateExpense(req.userId!, parseInt(id), req.body);
    res.json(updatedExpense);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
