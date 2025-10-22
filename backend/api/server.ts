// server.ts
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// !!! NECESARIO PARA LAS RUTAS Y LA CONEXIÓN A LA BASE DE DATOS !!!
// (Asegúrate de que estas rutas de importación sean correctas respecto a server.ts)
import connectDB from '../config/db';
import authRoutes from '../routes/authRoutes';
import projectRoutes from '../routes/projectRoutes';
import taskRoutes from '../routes/taskRoutes';
import authMiddleware, { AuthRequest } from '../middleware/authMiddleware';


// Conectar a la base de datos
connectDB(); 

const app = express();

// --- Configuración de CORS (Actualizada) ---
const allowedDomains = [
    'http://localhost:3000', // Desarrollo local
    'https://my-enterprise-app-plum.vercel.app' // Dominio de producción
    // Puedes añadir otros dominios específicos aquí si los tienes
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Postman / server-side requests

        // 1. Verificar si es un dominio permitido (local o producción)
        if (allowedDomains.includes(origin)) {
            return callback(null, true);
        }

        // 2. Permitir URLs de preview de Vercel (si terminan en .vercel.app)
        // Esto permite previews como 'my-enterprise-app-plum-branch-name-hash.vercel.app'
        if (origin.endsWith('.vercel.app') && origin.includes('my-enterprise-app-plum')) {
            return callback(null, true);
        }

        // Si no cumple ninguna condición, rechazar
        return callback(new Error(`CORS no permitido para el origen: ${origin}`));
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

// --- Solo para desarrollo local (Bloqueo necesario para Vercel) ---
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

// --- Export para Vercel ---
export default app;
