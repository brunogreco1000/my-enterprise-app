// src/hooks/useTasks.ts
import { useState, useEffect } from 'react';
import { api } from '../api/axios';
export const useTasks = (projectId) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await api.get('/tasks', { params: { projectId } });
            setTasks(response.data);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };
    const createTask = async (title) => {
        const response = await api.post('/tasks', { title, projectId });
        setTasks([...tasks, response.data]);
    };
    const updateTask = async (id, task) => {
        const response = await api.put(`/tasks/${id}`, task);
        setTasks(tasks.map(t => (t._id === id ? response.data : t)));
    };
    const deleteTask = async (id) => {
        await api.delete(`/tasks/${id}`);
        setTasks(tasks.filter(t => t._id !== id));
    };
    useEffect(() => {
        if (projectId)
            fetchTasks();
    }, [projectId]);
    return { tasks, loading, fetchTasks, createTask, updateTask, deleteTask };
};
