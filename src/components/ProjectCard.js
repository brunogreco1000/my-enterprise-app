import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ProgressBar from './ProgressBar';
const ProjectCard = ({ name, status, dueDate, progress }) => {
    return (_jsxs("div", { className: "border p-4 rounded shadow-sm bg-white dark:bg-gray-800", children: [_jsx("h3", { className: "font-semibold", children: name }), _jsxs("p", { className: "text-sm mb-2", children: ["Estado: ", status] }), _jsxs("p", { className: "text-sm mb-2", children: ["Fecha l\u00EDmite: ", new Date(dueDate).toLocaleDateString()] }), _jsx(ProgressBar, { progress: progress })] }));
};
export default ProjectCard;
