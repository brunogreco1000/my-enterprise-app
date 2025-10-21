import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Reports.tsx
import { useEffect, useState, useMemo } from 'react';
import { api } from '../api/axios';
import { exportProjectsPDF, exportProjectsExcel } from '../utils/export';
import { getProgressPercentage } from '../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const Reports = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProjects = async () => {
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
    const chartData = useMemo(() => projects.map((p) => ({
        name: p.name,
        progress: getProgressPercentage(p.status),
    })), [projects]);
    if (loading)
        return _jsx("div", { className: "p-6 text-center", children: "Loading reports..." });
    if (error)
        return _jsx("div", { className: "p-6 text-center text-red-600", children: error });
    return (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Project Reports" }), _jsxs("div", { className: "flex gap-4 mb-6", children: [_jsx("button", { onClick: () => exportProjectsPDF(projects), className: "bg-green-500 text-white p-2 rounded", children: "Export PDF" }), _jsx("button", { onClick: () => exportProjectsExcel(projects), className: "bg-blue-500 text-white p-2 rounded", children: "Export Excel" })] }), _jsx("div", { className: "overflow-x-auto mb-6", children: _jsxs("table", { className: "min-w-full table-auto border border-gray-300 dark:border-gray-700", children: [_jsx("thead", { className: "bg-gray-100 dark:bg-gray-800", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-2 text-left", children: "Project" }), _jsx("th", { className: "px-4 py-2", children: "Status" }), _jsx("th", { className: "px-4 py-2", children: "Due Date" }), _jsx("th", { className: "px-4 py-2", children: "Progress" })] }) }), _jsx("tbody", { children: projects.map((p) => (_jsxs("tr", { className: "border-t border-gray-200 dark:border-gray-700", children: [_jsx("td", { className: "px-4 py-2", children: p.name }), _jsx("td", { className: "px-4 py-2 text-center", children: p.status }), _jsx("td", { className: "px-4 py-2 text-center", children: p.dueDate }), _jsxs("td", { className: "px-4 py-2 text-center", children: [getProgressPercentage(p.status), "%"] })] }, p._id))) })] }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Progress Chart" }), _jsx(ResponsiveContainer, { width: "100%", height: 200, children: _jsxs(BarChart, { data: chartData, children: [_jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "progress", fill: "#4f46e5" })] }) })] })] }));
};
export default Reports;
