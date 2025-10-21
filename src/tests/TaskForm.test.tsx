import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';
import { vi } from 'vitest';

describe('TaskForm', () => {
  test('calls onAdd with the correct task', () => {
    const handleAdd = vi.fn();
    render(<TaskForm onAdd={handleAdd} projectId="mock-project-id" />); // ✅ agregar projectId

    const input = screen.getByPlaceholderText('New task') as HTMLInputElement;
    const addButton = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);

    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith('Test Task');
    expect(input.value).toBe('');
  });

  test('does not call onAdd when input is empty', () => {
    const handleAdd = vi.fn();
    render(<TaskForm onAdd={handleAdd} projectId="mock-project-id" />); // ✅ agregar projectId

    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(handleAdd).not.toHaveBeenCalled();
  });
});

