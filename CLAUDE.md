# Proyecto Gastos Personales - Guía de Desarrollo

Aplicación fullstack para la gestión de gastos personales.

## Estructura del Proyecto
- `/frontend`: React + Vite + TypeScript + TailwindCSS
- `/backend`: Node.js + Express + TypeScript + Prisma

## Comandos Clave

### Frontend
- `cd frontend && npm install`: Instalar dependencias
- `npm run dev`: Iniciar servidor de desarrollo (Vite)
- `npm run build`: Generar build de producción
- `npm test`: Ejecutar tests (Jest + RTL)

### Backend
- `cd backend && npm install`: Instalar dependencias
- `npm run server`: Iniciar servidor de desarrollo (nodemon)
- `npm run build`: Compilar TypeScript a JS
- `npm test`: Ejecutar tests (Jest)
- `npx prisma migrate dev`: Ejecutar migraciones de base de datos
- `npx prisma studio`: Explorador visual de la base de datos (SQLite)

## Guías de Estilo y Convenciones

### General
- **Idioma**: Comentarios y documentación técnica en **español**. Variables y nombres de funciones en inglés.
- **Asincronía**: Usar siempre `async/await` en lugar de `.then()`.
- **Errores**: Manejo consistente con bloques `try/catch`.

### Frontend (React + TypeScript)
- **Componentes**: Usar componentes funcionales con definiciones de tipos claras.
- **Estilos**: TailwindCSS para el diseño. Seguir principios de diseño premium.
- **Estado**: Hooks nativos (`useState`, `useContext`, `useReducer`) o librerías de gestión de estado según complejidad.
- **Testing**: Jest + React Testing Library. Enfoque en testing de comportamiento.

### Backend (Node.js + Express)
- **Arquitectura**: Separación clara entre Rutas, Controladores y Servicios.
- **ORM**: Prisma para interactuar con SQLite.
- **Tipado**: Definir interfaces/tipos para todas las solicitudes (Request) y respuestas (Response).

### Calidad de Código
- **Linting**: ESLint + Prettier para consistencia.
- **Format**: `npm run format` (si está configurado).
