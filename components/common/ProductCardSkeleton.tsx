import React from 'react';
import { PistachioIcon } from '../icons/Icons';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-lg shadow-md dark:shadow-none dark:border dark:border-gray-800 overflow-hidden flex flex-col animate-pulse">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <PistachioIcon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-4/5 mb-2"></div>
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-2/5"></div>
        
        <div className="mt-auto pt-4 flex justify-between items-center">
          <div className="h-7 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
          <div className="h-9 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};