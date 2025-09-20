'use client';

import { API } from '@/app/types/api';
import { ApiCard } from './ApiCard';

interface ApiGridProps {
  apis: API[];
  loading?: boolean;
}

export function ApiGrid({ apis, loading = false }: ApiGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-20"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-16"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                <div className="flex gap-1">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                </div>
              </div>
              <div className="pt-2">
                <div className="h-9 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (apis.length === 0) {
    return (
      <div
        className="text-center py-12"
      >
        <div className="text-gray-600 dark:text-gray-400">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">No APIs found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {apis.map((api, index) => (
        <ApiCard key={api.id} api={api} index={index} />
      ))}
    </div>
  );
}