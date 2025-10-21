import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/Dashboard.tsx
import { useState, useEffect, useMemo, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';
import TaskForm from '../components/TaskForm';
import ProgressChart from '../components/ProgressChart';
import { getProgressPercentage } from '../utils/helpers';
import { useTasks } from '../hooks/useTasks';
import { api } from '../api/axios';
import axios from 'axios';
const Dashboard = () => {
    const { user, isLoading } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const { tasks, loading: tasksLoading, createTask } = useTasks(selectedProjectId);
    // --- Carga de proyectos
    useEffect(() => {
        const fetchProjects = async () => {
            if (isLoading)
                return;
            setLoading(true);
            setError(null);
            try {
                const res = await api.get('/projects');
                const fetchedProjects = res.data;
                setProjects(fetchedProjects);
                // Selecciona el primer proyecto si no hay ninguno seleccionado
                if (fetchedProjects.length > 0 && !selectedProjectId) {
                    setSelectedProjectId(fetchedProjects[0]._id);
                }
            }
            catch (err) {
                const errorMessage = axios.isAxiosError(err)
                    ? err.response?.data?.message || 'No se pudieron cargar los proyectos.'
                    : 'Error de red desconocido.';
                console.error(err);
                setError(errorMessage);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, [isLoading, selectedProjectId]);
    // --- Datos del gráfico
    const chartData = useMemo(() => projects.map((p) => ({
        name: p.name,
        progress: getProgressPercentage(p.status),
    })), [projects]);
    return (_jsxs("div", { className: "p-6 min-h-screen", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Dashboard" }), user && !isLoading && (_jsxs("p", { className: "mb-4", children: ["Hola, ", _jsx("span", { className: "font-semibold", children: user.username }), "!"] })), loading && _jsx("div", { className: "p-6 text-center", children: "Cargando proyectos..." }), error && _jsx("div", { className: "p-6 text-center text-red-600", children: error }), !loading && !error && (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6", children: projects.map((p) => (_jsx(ProjectCard, { ...p, progress: getProgressPercentage(p.status) }, p._id))) }), _jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Agregar Tarea" }), projects.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("select", { value: selectedProjectId, onChange: (e) => setSelectedProjectId(e.target.value), className: "p-2 border rounded mb-3", children: projects.map(p => (_jsx("option", { value: p._id, children: p.name }, p._id))) }), selectedProjectId ? (_jsx(TaskForm, { projectId: selectedProjectId, onAdd: (taskName) => createTask(taskName) })) : (_jsx("p", { className: "text-gray-500", children: "Selecciona un proyecto para agregar tareas." })), tasksLoading && _jsx("p", { children: "Cargando tareas..." }), !tasksLoading && tasks.length === 0 && _jsx("p", { className: "text-gray-500", children: "No hay tareas en este proyecto." }), tasks.length > 0 && (_jsx("ul", { className: "mt-2 list-disc list-inside", children: tasks.map((t) => (_jsx("li", { children: t.title }, t._id))) }))] })) : (_jsx("p", { className: "text-gray-500", children: "Crea un proyecto para agregar tareas." }))] }), _jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Progreso de Proyectos" }), projects.length > 0 ? (_jsx(ProgressChart, { data: chartData })) : (_jsx("p", { children: "No hay datos para mostrar el progreso." }))] })] }))] }));
};
export default Dashboard;
