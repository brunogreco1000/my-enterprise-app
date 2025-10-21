// src/components/ProjectCard.tsx
import React from 'react';
import ProgressBar from './ProgressBar';

export interface ProjectCardProps {
  _id: string;
  name: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
  progress: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, status, dueDate, progress }) => {
  return (
    <div className="border p-4 rounded shadow-sm bg-white dark:bg-gray-800">
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm mb-2">Estado: {status}</p>
      <p className="text-sm mb-2">Fecha límite: {new Date(dueDate).toLocaleDateString()}</p>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default ProjectCard;
