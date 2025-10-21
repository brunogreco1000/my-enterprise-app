// src/utils/date.ts
import dayjs from 'dayjs';

// Formatea una fecha a YYYY-MM-DD por defecto
export const formatDate = (date: string | Date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};

// Retorna diferencia en días entre dos fechas
export const diffInDays = (start: string | Date, end: string | Date) => {
  return dayjs(end).diff(dayjs(start), 'day');
};

// Retorna true si la fecha ya pasó
export const isPastDate = (date: string | Date) => {
  return dayjs(date).isBefore(dayjs(), 'day');
};
