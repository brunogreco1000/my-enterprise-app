import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const PrivateRoute = ({ children }) => {
    const { isLoggedIn, isLoading } = useContext(AuthContext);
    const location = useLocation();
    if (isLoading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("p", { children: "Cargando sesi\u00F3n..." }) }));
    }
    if (!isLoggedIn) {
        return _jsx(Navigate, { to: "/login", replace: true, state: { from: location } });
    }
    return _jsx(_Fragment, { children: children });
};
export default PrivateRoute;
