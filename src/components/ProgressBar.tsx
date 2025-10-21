// src/components/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  progress: number;
  height?: string;
  bgColor?: string;
  trackColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 'h-4',
  bgColor = 'bg-blue-500',
  trackColor = 'bg-gray-300',
}) => {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full ${height} ${trackColor} rounded-full overflow-hidden`}>
      <div
        className={`${bgColor} h-full rounded-full transition-all duration-500`}
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
