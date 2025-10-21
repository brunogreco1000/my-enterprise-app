import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
describe('Dashboard', () => {
    test('renders dashboard heading', () => {
        render(_jsx(Dashboard, {}));
        expect(screen.getByText(/Project Dashboard/i)).toBeInTheDocument();
    });
    test('renders initial projects', () => {
        render(_jsx(Dashboard, {}));
        expect(screen.getByText('Project Alpha')).toBeInTheDocument();
        expect(screen.getByText('Project Beta')).toBeInTheDocument();
    });
});
