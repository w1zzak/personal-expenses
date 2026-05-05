import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Servicio para obtener todos los gastos de un usuario específico.
 */
export const getAllExpenses = async (userId: number) => {
  try {
    return await prisma.gasto.findMany({
      where: { userId },
      orderBy: { fecha: 'desc' },
    });
  } catch (error) {
    throw new Error('Error al obtener los gastos');
  }
};

/**
 * Servicio para crear un nuevo gasto vinculado a un usuario.
 */
export const createExpense = async (userId: number, data: any) => {
  try {
    return await prisma.gasto.create({
      data: {
        titulo: data.titulo,
        monto: data.monto,
        categoria: data.categoria,
        descripcion: data.descripcion,
        userId: userId,
      },
    });
  } catch (error) {
    throw new Error('Error al crear el gasto');
  }
};

/**
 * Servicio para eliminar un gasto por ID, verificando que pertenezca al usuario.
 */
export const deleteExpense = async (userId: number, id: number) => {
  try {
    return await prisma.gasto.deleteMany({
      where: { 
        id,
        userId // Seguridad extra
      },
    });
  } catch (error) {
    throw new Error('Error al eliminar el gasto');
  }
};

interface ExpenseUpdateData {
  titulo?: string;
  monto?: number;
  categoria?: string;
  descripcion?: string;
  fecha?: string;
}

/**
 * Servicio para actualizar un gasto existente, verificando pertenencia.
 */
export const updateExpense = async (userId: number, id: number, data: ExpenseUpdateData) => {
  try {
    // Primero verificamos que exista y pertenezca al usuario
    const existing = await prisma.gasto.findFirst({
      where: { id, userId }
    });

    if (!existing) throw new Error('Gasto no encontrado');

    return await prisma.gasto.update({
      where: { id },
      data: {
        titulo: data.titulo,
        monto: data.monto,
        categoria: data.categoria,
        descripcion: data.descripcion,
        fecha: data.fecha ? new Date(data.fecha) : undefined,
      },
    });
  } catch (error) {
    throw new Error('Error al actualizar el gasto');
  }
};
