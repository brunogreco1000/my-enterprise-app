// src/utils/helpers.ts
import { lazy } from 'react';
// Lazy loading con fallback default para evitar errores TS
export function lazyWithDefault(factory) {
    return lazy(factory);
}
// Función para obtener porcentaje de progreso según estado
export const getProgressPercentage = (status) => {
    switch (status) {
        case 'Pending':
            return 0;
        case 'In Progress':
            return 50;
        case 'Completed':
            return 100;
        default:
            return 0;
    }
};
