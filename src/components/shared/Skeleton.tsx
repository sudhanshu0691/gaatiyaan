import React from 'react';

export const VanCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-4 animate-pulse">
    <div className="flex justify-between items-start">
      <div>
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    </div>
    <div className="mt-4 flex justify-between items-center">
      <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);