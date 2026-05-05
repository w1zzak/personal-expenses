import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

/**
 * Servicio para registrar un nuevo usuario.
 */
export const register = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        nombre: data.nombre,
      },
    });
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw new Error('El usuario ya existe');
  }
};

/**
 * Servicio para iniciar sesión.
 */
export const login = async (data: any) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

  return {
    user: {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
    },
    token,
  };
};
