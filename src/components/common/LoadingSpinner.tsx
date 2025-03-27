import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          animate-spin rounded-full
          border-t-2 border-b-2 border-accent-500
          ${sizeClasses[size]}
          ${className}
        `}
      />
    </div>
  );
};

export default LoadingSpinner; 