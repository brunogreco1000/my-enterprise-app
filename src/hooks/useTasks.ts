// src/hooks/useTasks.ts
import { useState, useEffect } from 'react';
import api from '../api/axios';

export interface Task {
  _id?: string;
  title: string;
  completed: boolean;
  projectId: string;
}

export const useTasks = (projectId: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/tasks', { params: { projectId } });
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (title: string) => {
    const response = await api.post('/tasks', { title, projectId });
    setTasks([...tasks, response.data]);
  };

  const updateTask = async (id: string, task: Partial<Task>) => {
    const response = await api.put(`/tasks/${id}`, task);
    setTasks(tasks.map(t => (t._id === id ? response.data : t)));
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  useEffect(() => {
    if (projectId) fetchTasks();
  }, [projectId]);

  return { tasks, loading, fetchTasks, createTask, updateTask, deleteTask };
};
