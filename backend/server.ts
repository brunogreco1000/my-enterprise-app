// server.ts (Limpio y Funcional con Express v5)

import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';

connectDB();

const app = express();

// --- Middlewares Iniciales ---
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());

// --- Definición de Rutas ---
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// --- 🛑 Middleware de Manejo de Errores Final ---
// (Esencial para capturar todos los errores pasados por next(error))
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); 
    
    // Si el error fue un 401 o 404 manejado previamente, usa ese status.
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
    
    res.status(statusCode).json({
        message: 'Error interno del servidor.',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// --- Inicio del Servidor ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));