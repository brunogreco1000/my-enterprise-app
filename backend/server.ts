// server.ts
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import authMiddleware, { AuthRequest } from './middleware/authMiddleware';

// Conectar a la base de datos
connectDB();

const app = express();

// --- Configuración de CORS ---
const allowedOrigins = [
  'http://localhost:3000', // desarrollo local
  'https://my-enterprise-app-plum.vercel.app', // preview deploy
  'https://my-enterprise-app.vercel.app' // producción
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman / server-side requests
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS no permitido'));
  },
  credentials: true
}));

// --- Middlewares ---
app.use(cookieParser());
app.use(express.json());

// --- Rutas públicas ---
app.use('/api/auth', authRoutes);

// --- Rutas protegidas ---
app.use('/api/projects', authMiddleware, projectRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);

// --- Ruta de prueba usuario autenticado ---
app.get('/api/auth/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Usuario no autenticado' });
  res.json({ user: req.user });
});

// --- Middleware de manejo de errores ---
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

// --- Solo para desarrollo local ---
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

// --- Export para Vercel ---
export default app;
