// src/pages/Dashboard.tsx
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Project } from '../types/project';
import ProjectCard from '../components/ProjectCard';
import TaskForm from '../components/TaskForm';
import ProgressChart from '../components/ProgressChart';
import { getProgressPercentage } from '../utils/helpers';
import { useTasks } from '../hooks/useTasks';
import api from '../api/axios';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(''); 

  const { tasks, loading: tasksLoading, createTask } = useTasks(selectedProjectId); 

  // --- Carga de proyectos
  useEffect(() => {
    const fetchProjects = async () => {
      if (isLoading) return; 
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/projects'); 
        const fetchedProjects: Project[] = res.data;
        setProjects(fetchedProjects);

        // Selecciona el primer proyecto si no hay ninguno seleccionado
        if (fetchedProjects.length > 0 && !selectedProjectId) { 
          setSelectedProjectId(fetchedProjects[0]._id);
        }

      } catch (err) {
        const errorMessage = axios.isAxiosError(err) 
          ? err.response?.data?.message || 'No se pudieron cargar los proyectos.'
          : 'Error de red desconocido.';
        console.error(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [isLoading, selectedProjectId]);

  // --- Datos del gráfico
  const chartData = useMemo(
    () =>
      projects.map((p) => ({
        name: p.name,
        progress: getProgressPercentage(p.status),
      })),
    [projects]
  );

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {user && !isLoading && (
        <p className="mb-4">
          Hola, <span className="font-semibold">{user.username}</span>!
        </p>
      )}

      {loading && <div className="p-6 text-center">Cargando proyectos...</div>}
      {error && <div className="p-6 text-center text-red-600">{error}</div>}

      {!loading && !error && (
        <>
          {/* Lista de proyectos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {projects.map((p) => (
              <ProjectCard
                key={p._id}
                {...p}
                progress={getProgressPercentage(p.status)}
              />
            ))}
          </div>

          {/* Formulario de tareas */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Agregar Tarea</h2>
            
            {projects.length > 0 ? (
              <>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="p-2 border rounded mb-3"
                >
                  {projects.map(p => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </select>

                {selectedProjectId ? (
                  <TaskForm projectId={selectedProjectId} onAdd={(taskName) => createTask(taskName)} />
                ) : (
                  <p className="text-gray-500">Selecciona un proyecto para agregar tareas.</p>
                )}

                {tasksLoading && <p>Cargando tareas...</p>}
                {!tasksLoading && tasks.length === 0 && <p className="text-gray-500">No hay tareas en este proyecto.</p>}
                {tasks.length > 0 && (
                  <ul className="mt-2 list-disc list-inside">
                    {tasks.map((t) => (
                      <li key={t._id}>{t.title}</li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p className="text-gray-500">Crea un proyecto para agregar tareas.</p>
            )}
          </div>

          {/* Gráfico de progreso */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Progreso de Proyectos</h2>
            {projects.length > 0 ? (
              <ProgressChart data={chartData} />
            ) : (
              <p>No hay datos para mostrar el progreso.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
