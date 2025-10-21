import { jsx as _jsx } from "react/jsx-runtime";
const ProgressBar = ({ progress, height = 'h-4', bgColor = 'bg-blue-500', trackColor = 'bg-gray-300', }) => {
    const safeProgress = Math.min(Math.max(progress, 0), 100);
    return (_jsx("div", { className: `w-full ${height} ${trackColor} rounded-full overflow-hidden`, children: _jsx("div", { className: `${bgColor} h-full rounded-full transition-all duration-500`, style: { width: `${safeProgress}%` } }) }));
};
export default ProgressBar;
