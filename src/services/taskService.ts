// src/services/taskService.ts
import api from '../api/axios';
import { Task } from '../pages/Dashboard';

export const taskService = {
  create: async (task: Omit<Task, '_id'>): Promise<Task> => {
    const token = localStorage.getItem('accessToken');
    const res = await api.post('/tasks', task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  getAll: async (): Promise<Task[]> => {
    const token = localStorage.getItem('accessToken');
    const res = await api.get('/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  update: async (id: string, task: Partial<Task>): Promise<Task> => {
    const token = localStorage.getItem('accessToken');
    const res = await api.put(`/tasks/${id}`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    const token = localStorage.getItem('accessToken');
    await api.delete(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
