// src/types/project.ts
export interface Project {
  _id: string;
  name: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
}
