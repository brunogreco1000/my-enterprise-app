// src/services/projectService.ts
import { api } from '../api/axios';
export const projectService = {
    getAll: async () => {
        const token = localStorage.getItem('accessToken');
        const res = await api.get('/projects', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },
    getById: async (id) => {
        const token = localStorage.getItem('accessToken');
        const res = await api.get(`/projects/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },
    create: async (project) => {
        const token = localStorage.getItem('accessToken');
        const res = await api.post('/projects', project, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },
    update: async (id, project) => {
        const token = localStorage.getItem('accessToken');
        const res = await api.put(`/projects/${id}`, project, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    },
    delete: async (id) => {
        const token = localStorage.getItem('accessToken');
        await api.delete(`/projects/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};
