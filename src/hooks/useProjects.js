// src/hooks/useProjects.ts
import { useState, useEffect } from 'react';
import { api } from '../api/axios';
export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await api.get('/projects');
            setProjects(response.data);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };
    const createProject = async (project) => {
        const response = await api.post('/projects', project);
        setProjects([...projects, response.data]);
    };
    const updateProject = async (id, project) => {
        const response = await api.put(`/projects/${id}`, project);
        setProjects(projects.map(p => (p._id === id ? response.data : p)));
    };
    const deleteProject = async (id) => {
        await api.delete(`/projects/${id}`);
        setProjects(projects.filter(p => p._id !== id));
    };
    useEffect(() => {
        fetchProjects();
    }, []);
    return { projects, loading, fetchProjects, createProject, updateProject, deleteProject };
};
