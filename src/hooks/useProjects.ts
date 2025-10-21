// src/hooks/useProjects.ts
import { useState, useEffect } from 'react';
import {api} from '../api/axios';

export interface Project {
  _id?: string;
  name: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
  progress: number;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (project: Project) => {
    const response = await api.post('/projects', project);
    setProjects([...projects, response.data]);
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    const response = await api.put(`/projects/${id}`, project);
    setProjects(projects.map(p => (p._id === id ? response.data : p)));
  };

  const deleteProject = async (id: string) => {
    await api.delete(`/projects/${id}`);
    setProjects(projects.filter(p => p._id !== id));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, fetchProjects, createProject, updateProject, deleteProject };
};
