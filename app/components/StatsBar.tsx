'use client';

import { API } from '@/app/types/api';

interface StatsBarProps {
  totalApis: number;
  filteredApis: number;
  selectedCategory: string | null;
  authFilter: string | null;
}

export function StatsBar({ totalApis, filteredApis, selectedCategory, authFilter }: StatsBarProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>
            Showing <strong className="text-gray-900 dark:text-white">{filteredApis}</strong> of{' '}
            <strong className="text-gray-900 dark:text-white">{totalApis}</strong> APIs
          </span>
          {selectedCategory && (
            <span>
              in <strong className="text-blue-600">{selectedCategory}</strong>
            </span>
          )}
          {authFilter && (
            <span>
              with <strong className="text-blue-600">{authFilter === 'none' ? 'No Auth' : authFilter === 'key' ? 'API Key' : 'OAuth'}</strong>
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {selectedCategory && (
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">
              {selectedCategory}
            </span>
          )}
          {authFilter && (
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-full">
              {authFilter === 'none' ? 'No Auth' : authFilter === 'key' ? 'API Key' : 'OAuth'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}