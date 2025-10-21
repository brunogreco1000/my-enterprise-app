// server.ts
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Importa tus rutas y middleware
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import authMiddleware from './middleware/authMiddleware';

connectDB();

const app = express();

// --- Configuración de CORS ---
const allowedOrigins = [
  'http://localhost:3000', // desarrollo local
  'https://my-enterprise-pi8y47jux-bruno-grecos-projects.vercel.app' // frontend desplegado
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('CORS no permitido'));
  },
  credentials: true, // permite cookies
}));

// --- Middlewares ---
app.use(cookieParser());
app.use(express.json());

// --- Rutas públicas ---
app.use('/api/auth', authRoutes);

// --- Rutas protegidas (requieren authMiddleware) ---
app.use('/api/projects', authMiddleware, projectRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);

// --- Ruta de prueba para usuario autenticado ---
import { AuthRequest } from './middleware/authMiddleware';
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

// --- Inicio del servidor ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
