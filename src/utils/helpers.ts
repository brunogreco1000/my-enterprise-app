// src/utils/helpers.ts
import React, { lazy, ComponentType } from 'react';

// Lazy loading con fallback default para evitar errores TS
export function lazyWithDefault<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(factory) as React.LazyExoticComponent<T>;
}

// Función para obtener porcentaje de progreso según estado
export const getProgressPercentage = (status: 'Pending' | 'In Progress' | 'Completed'): number => {
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
