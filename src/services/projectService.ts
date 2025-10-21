// src/services/projectService.ts
import api from '../api/axios';
import { Project } from '../pages/Dashboard';

export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const token = localStorage.getItem('accessToken');
    const res = await api.get('/projects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  getById: async (id: string): Promise<Project> => {
    const token = localStorage.getItem('accessToken');
    const res = await api.get(`/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  create: async (project: Omit<Project, '_id'>): Promise<Project> => {
    const token = localStorage.getItem('accessToken');
    const res = await api.post('/projects', project, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    const token = localStorage.getItem('accessToken');
    const res = await api.put(`/projects/${id}`, project, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    const token = localStorage.getItem('accessToken');
    await api.delete(`/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
