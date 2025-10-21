// src/pages/Projects.tsx
import React, { useEffect, useState, useMemo } from 'react';
import api from '../api/axios';
import ProjectCard from '../components/ProjectCard';
import { Project } from '../hooks/useProjects';
import { getProgressPercentage } from '../utils/helpers';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error(err);
        setError('Error cargando los proyectos.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const projectCards = useMemo(
    () =>
      projects.map((p) => (
        <ProjectCard
          key={p._id ?? p.name}             // fallback si _id no existe
          _id={p._id!}                      // forzamos que no es undefined
          name={p.name}
          status={p.status}
          dueDate={p.dueDate}
          progress={getProgressPercentage(p.status)}
        />
      )),
    [projects]
  );

  if (loading) return <div className="p-6 text-center">Cargando proyectos...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectCards.length > 0 ? projectCards : <p>No hay proyectos disponibles.</p>}
      </div>
    </div>
  );
};

export default Projects;
