import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Projects.tsx
import { useEffect, useState, useMemo } from 'react';
import { api } from '../api/axios';
import ProjectCard from '../components/ProjectCard';
import { getProgressPercentage } from '../utils/helpers';
const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const res = await api.get('/projects');
                setProjects(res.data);
            }
            catch (err) {
                console.error(err);
                setError('Error cargando los proyectos.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);
    const projectCards = useMemo(() => projects.map((p) => (_jsx(ProjectCard, { _id: p._id, name: p.name, status: p.status, dueDate: p.dueDate, progress: getProgressPercentage(p.status) }, p._id ?? p.name))), [projects]);
    if (loading)
        return _jsx("div", { className: "p-6 text-center", children: "Cargando proyectos..." });
    if (error)
        return _jsx("div", { className: "p-6 text-center text-red-600", children: error });
    return (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Projects" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: projectCards.length > 0 ? projectCards : _jsx("p", { children: "No hay proyectos disponibles." }) })] }));
};
export default Projects;
