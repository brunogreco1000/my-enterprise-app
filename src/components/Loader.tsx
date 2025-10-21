// src/components/Loader.tsx
import React from 'react';

const Loader: React.FC<{ message?: string }> = ({ message = 'Cargando...' }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Loader;
