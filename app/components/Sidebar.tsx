// Enhanced: Update styling - Feb 2024
// Enhanced: Add new API endpoint - Feb 2024
// Enhanced: Fix TypeScript types - Feb 2024
'use client';

import { CategoryCount } from '@/app/types/api';

interface SidebarProps {
  categories: CategoryCount[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  authFilter: string | null;
  onAuthFilterChange: (auth: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  authFilter, 
  onAuthFilterChange,
  isOpen,
  onClose
}: SidebarProps) {
  const authTypes = [
    { value: 'none', label: 'No Auth Required', color: 'text-green-600 dark:text-green-400' },
    { value: 'key', label: 'API Key', color: 'text-yellow-600 dark:text-yellow-400' },
    { value: 'oauth', label: 'OAuth', color: 'text-red-600 dark:text-red-400' },
  ];

  const handleCategoryClick = (category: string | null) => {
    onCategorySelect(category);
    // Close mobile menu after selection
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleAuthClick = (auth: string | null) => {
    onAuthFilterChange(auth);
    // Close mobile menu after selection
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[89px] left-0 z-50 lg:z-auto w-80 h-screen lg:h-[calc(100vh-89px)] bg-background dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto p-6 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-8">
          {/* Categories */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Categories</h2>
            <div className="space-y-2">
              <button
                onClick={() => handleCategoryClick(null)}
                className={`w-full text-left p-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  selectedCategory === null 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>All Categories</span>
                  <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-400">
                    {categories.reduce((total, cat) => total + cat.count, 0)}
                  </span>
                </div>
              </button>

              {categories.map((category) => (
                <button
                  key={category.category}
                  onClick={() => handleCategoryClick(category.category)}
                  className={`w-full text-left p-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    selectedCategory === category.category 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{category.category}</span>
                    <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-400">
                      {category.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Authentication Filter */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Authentication</h2>
            <div className="space-y-2">
              <button
                onClick={() => handleAuthClick(null)}
                className={`w-full text-left p-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  authFilter === null 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                All Types
              </button>

              {authTypes.map((auth) => (
                <button
                  key={auth.value}
                  onClick={() => handleAuthClick(auth.value)}
                  className={`w-full text-left p-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    authFilter === auth.value 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className={`text-sm ${auth.color}`}>
                    {auth.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}


