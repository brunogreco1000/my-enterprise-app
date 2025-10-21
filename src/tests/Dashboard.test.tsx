import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';

describe('Dashboard', () => {
  test('renders dashboard heading', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Project Dashboard/i)).toBeInTheDocument();
  });

  test('renders initial projects', () => {
    render(<Dashboard />);
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.getByText('Project Beta')).toBeInTheDocument();
  });
});
