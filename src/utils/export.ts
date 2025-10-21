// src/utils/export.ts
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Project } from '../types/project';

export const exportProjectsPDF = (projects: Project[]) => {
  const doc = new jsPDF();
  doc.text('Projects', 10, 10);
  projects.forEach((p, i) => {
    doc.text(`${i + 1}. ${p.name} - ${p.status}`, 10, 20 + i * 10);
  });
  doc.save('projects.pdf');
};

export const exportProjectsExcel = (projects: Project[]) => {
  const ws = XLSX.utils.json_to_sheet(projects);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Projects');
  XLSX.writeFile(wb, 'projects.xlsx');
};
