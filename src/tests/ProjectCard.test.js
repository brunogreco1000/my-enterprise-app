import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProjectCard from '../components/ProjectCard';
describe('ProjectCard', () => {
    const project = {
        _id: '1',
        name: 'Project Alpha',
        status: 'In Progress',
        dueDate: '2025-12-01',
        progress: 50,
    };
    test('renders project details', () => {
        render(_jsx(ProjectCard, { ...project }));
        expect(screen.getByText('Project Alpha')).toBeInTheDocument();
        expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
        expect(screen.getByText(/2025-12-01/i)).toBeInTheDocument();
    });
});
