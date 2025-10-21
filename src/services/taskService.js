// src/services/taskService.ts
import { api } from '../api/axios';
export const taskService = {
    create: async (task) => {
        const token = localStorage.getItem('accessToken');
        const res = await api.post('/tasks', task, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },
    getAll: async () => {
        const token = localStorage.getItem('accessToken');
        const res = await api.get('/tasks', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },
    update: async (id, task) => {
        const token = localStorage.getItem('accessToken');
        const res = await api.put(`/tasks/${id}`, task, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },
    delete: async (id) => {
        const token = localStorage.getItem('accessToken');
        await api.delete(`/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};
