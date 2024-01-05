// Enhanced: Fix TypeScript types - Jan 2024
'use client';

import { API } from '@/app/types/api';
import { ExternalLink, Key, Lock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface ApiCardProps {
  api: API;
  index: number;
}

const getAuthIcon = (auth: string) => {
  switch (auth) {
    case 'none':
      return <Shield className="w-4 h-4 text-green-600" />;
    case 'key':
      return <Key className="w-4 h-4 text-yellow-600" />;
    case 'oauth':
      return <Lock className="w-4 h-4 text-red-600" />;
    default:
      return null;
  }
};

const getAuthLabel = (auth: string) => {
  switch (auth) {
    case 'none':
      return 'No Auth';
    case 'key':
      return 'API Key';
    case 'oauth':
      return 'OAuth';
    default:
      return auth;
  }
};

export function ApiCard({ api, index }: ApiCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-600 group"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {api.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                {api.category}
              </span>
              <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs">
                {getAuthIcon(api.authentication)}
                <span className="text-gray-600 dark:text-gray-400">{getAuthLabel(api.authentication)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {api.description}
        </p>

        {/* Use Cases */}
        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">Use Cases:</h4>
          <div className="flex flex-wrap gap-1">
            {api.useCases.slice(0, 3).map((useCase) => (
              <span
                key={useCase}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-400"
              >
                {useCase}
              </span>
            ))}
            {api.useCases.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-400">
                +{api.useCases.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Rate Limit */}
        {api.rateLimit && (
          <div className="text-xs text-gray-600 dark:text-gray-400">
            <strong>Rate Limit:</strong> {api.rateLimit}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {api.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-xs rounded text-gray-700 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-2 flex gap-2">
          <a
            href={api.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Visit API
          </a>
          {api.documentation && (
            <a
              href={api.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg transition-colors"
            >
              Documentation
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
