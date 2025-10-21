// src/pages/Reports.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Project } from './Dashboard';
import api from '../api/axios';
import { exportProjectsPDF, exportProjectsExcel } from '../utils/export';
import { getProgressPercentage } from '../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Reports: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error(err);
        setError('Error cargando los proyectos.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const chartData = useMemo(
    () =>
      projects.map((p) => ({
        name: p.name,
        progress: getProgressPercentage(p.status),
      })),
    [projects]
  );

  if (loading) return <div className="p-6 text-center">Loading reports...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Reports</h1>

      {/* Export buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => exportProjectsPDF(projects)}
          className="bg-green-500 text-white p-2 rounded"
        >
          Export PDF
        </button>
        <button
          onClick={() => exportProjectsExcel(projects)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Export Excel
        </button>
      </div>

      {/* Summary table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Project</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Due Date</th>
              <th className="px-4 py-2">Progress</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2 text-center">{p.status}</td>
                <td className="px-4 py-2 text-center">{p.dueDate}</td>
                <td className="px-4 py-2 text-center">{getProgressPercentage(p.status)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Progress Chart</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
