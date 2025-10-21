import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Loader = ({ message = 'Cargando...' }) => {
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4" }), _jsx("p", { children: message })] }) }));
};
export default Loader;
