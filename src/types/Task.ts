// src/types.ts
export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  projectId: string;
  dueDate?: string;
}
