import { jsx as _jsx } from "react/jsx-runtime";
// src/components/ErrorBoundary.tsx
import { Component } from 'react';
class ErrorBoundary extends Component {
    state = { hasError: false };
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error", error, info);
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback || _jsx("div", { className: "p-6 text-center", children: "Something went wrong." });
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
