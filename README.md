# Gastos - Control Financiero Inteligente

Una aplicación Fullstack moderna y elegante para la gestión de gastos personales. Construida con un enfoque en diseño de alta calidad (premium aesthetics), arquitectura multi-usuario segura y excelente experiencia de usuario.

![Gastos App](https://img.shields.io/badge/Status-Completed-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Características Principales

*   **Autenticación Completa**: Sistema de registro e inicio de sesión seguro usando JWT y Bcrypt.
*   **Gestión de Gastos (CRUD)**: Crea, lee, actualiza y elimina tus registros financieros fácilmente.
*   **Privacidad (Multi-tenant)**: Tus datos están aislados; solo tú puedes ver y gestionar tus propios gastos.
*   **Diseño Premium**: Interfaz moderna utilizando TailwindCSS, fuentes cuidadosamente seleccionadas (Sora y Outfit) y micro-animaciones fluidas.
*   **Resumen Financiero**: Cálculo en tiempo real de tu balance total de gastos.

## 🛠️ Stack Tecnológico

**Frontend:**
*   React 18
*   Vite
*   TailwindCSS (Styling & Design System)
*   Axios (HTTP Client)
*   Lucide React (Iconografía)
*   Jest & React Testing Library (Testing)

**Backend:**
*   Node.js & Express
*   Prisma ORM
*   SQLite (Base de datos relacional ligera)
*   JSON Web Tokens (JWT) & BcryptJS (Seguridad)
*   Jest & Supertest (Testing)

## 📁 Estructura del Proyecto

El proyecto está dividido en dos monorepositorios principales:

```text
gastos-antigravity/
├── backend/                # Servidor API y Base de Datos
│   ├── prisma/             # Esquemas de Prisma y SQLite DB
│   ├── src/
│   │   ├── controllers/    # Lógica de las peticiones HTTP
│   │   ├── middleware/     # Protección de rutas (JWT Auth)
│   │   ├── routes/         # Definición de endpoints de Express
│   │   └── services/       # Lógica de negocio y consultas a DB
│   └── .env.example        # Plantilla de variables de entorno
│
└── frontend/               # Interfaz de Usuario React
    ├── src/
    │   ├── components/     # Componentes de UI (Formularios, Listas)
    │   ├── context/        # Estado global (AuthContext)
    │   ├── services/       # Integración con la API (Axios)
    │   └── App.tsx         # Componente principal y Layout
    └── vite.config.ts      # Configuración de Vite y Proxy de API
```

## ⚙️ Instrucciones para correr localmente

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local.

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd gastos-antigravity
```

### 2. Configurar el Backend
```bash
cd backend

# Instalar dependencias
npm install

# Copiar el archivo de entorno y configurarlo
cp .env.example .env

# Ejecutar las migraciones de la base de datos
npx prisma migrate dev

# Iniciar el servidor de desarrollo (corre en el puerto 3001)
npm run dev
```

### 3. Configurar el Frontend
Abre una nueva terminal y navega a la carpeta del frontend:
```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo (corre en el puerto 3000)
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## 🔐 Variables de Entorno Necesarias

Para que el backend funcione correctamente, debes crear un archivo `.env` en el directorio `/backend` (puedes basarte en el `.env.example`). 

```env
# Puerto en el que correrá el servidor
PORT=3001

# Ruta de la base de datos de SQLite
DATABASE_URL="file:./dev.db"

# Llave secreta para firmar los tokens JWT
JWT_SECRET=tu_llave_secreta_super_segura
```

## 🧪 Tests

Ambos entornos están configurados con Jest para pruebas unitarias y de integración.

*   Para correr las pruebas del backend: `cd backend && npm test`
*   Para correr las pruebas del frontend: `cd frontend && npm test`
