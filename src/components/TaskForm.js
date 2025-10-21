import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, memo } from 'react';
const TaskForm = ({ projectId, onAdd }) => {
    const [task, setTask] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task.trim() || loading || !projectId)
            return;
        setLoading(true);
        try {
            await onAdd(task.trim());
            setTask('');
        }
        catch (error) {
            console.error("Error al añadir tarea:", error);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2 w-full", children: [_jsx("input", { type: "text", placeholder: projectId ? "Nueva tarea" : "Selecciona un proyecto...", value: task, onChange: (e) => setTask(e.target.value), className: "flex-grow p-2 border border-gray-300 rounded outline-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-gray-100", disabled: !projectId || loading }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400", disabled: !projectId || loading || !task.trim(), children: loading ? 'Añadiendo...' : 'Añadir' })] }));
};
export default memo(TaskForm);
