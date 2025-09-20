'use client';

import { useState, useEffect, useMemo } from 'react';
import { API, CategoryCount } from './types/api';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ApiGrid } from './components/ApiGrid';
import { StatsBar } from './components/StatsBar';
import apiData from '../data/apis.json';
import apiData1 from '../data/apis1.json';
import apiData2 from '../data/apis2.json';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [authFilter, setAuthFilter] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Normalize authentication values to match the expected type
  const normalizeAuthentication = (auth: string): "none" | "key" | "oauth" => {
    if (!auth) return 'none';
    const authLower = auth.toLowerCase().trim();
    
    // Handle various authentication formats
    if (authLower.includes('key') || 
        authLower.includes('api key') || 
        authLower === 'apikey' ||
        authLower === 'api_key' ||
        authLower === 'token') {
      return 'key';
    }
    
    if (authLower.includes('oauth') || 
        authLower.includes('bearer') || 
        authLower === 'oauth2' ||
        authLower === 'oauth 2.0') {
      return 'oauth';
    }
    
    if (authLower === 'none' || 
        authLower === 'no' || 
        authLower === 'not required' ||
        authLower === 'free') {
      return 'none';
    }
    
    // Default fallback for unknown authentication types
    return 'key';
  };

  // Process and normalize all API data
  const apis: API[] = useMemo(() => {
    const rawApis = [...apiData, ...apiData1, ...apiData2];
    
    return rawApis.map((api: any) => ({
      id: api.id || '',
      name: api.name || '',
      description: api.description || '',
      category: api.category || 'Other',
      useCases: Array.isArray(api.useCases) ? api.useCases : [],
      url: api.url || '',
      documentation: api.documentation || undefined,
      authentication: normalizeAuthentication(api.authentication || 'none'),
      rateLimit: api.rateLimit || undefined,
      tags: Array.isArray(api.tags) ? api.tags : []
    }));
  }, []);

  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Calculate category counts
  const categoryStats: CategoryCount[] = useMemo(() => {
    const counts = apis.reduce((acc, api) => {
      acc[api.category] = (acc[api.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, [apis]);

  // Filter APIs based on search, category, and auth
  const filteredApis = useMemo(() => {
    return apis.filter((api) => {
      // Search filter
      const matchesSearch = !searchQuery || [
        api.name,
        api.description,
        api.category,
        ...api.tags,
        ...api.useCases
      ].some((field) => 
        field.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Category filter
      const matchesCategory = !selectedCategory || api.category === selectedCategory;

      // Auth filter
      const matchesAuth = !authFilter || api.authentication === authFilter;

      return matchesSearch && matchesCategory && matchesAuth;
    });
  }, [apis, searchQuery, selectedCategory, authFilter]);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleAuthFilterChange = (auth: string | null) => {
    setAuthFilter(auth);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuToggle={handleMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex">
        <Sidebar
          categories={categoryStats}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          authFilter={authFilter}
          onAuthFilterChange={handleAuthFilterChange}
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
        />

        <main className="flex-1 p-4 lg:p-6 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            <StatsBar
              totalApis={apis.length}
              filteredApis={filteredApis.length}
              selectedCategory={selectedCategory}
              authFilter={authFilter}
            />

            <ApiGrid apis={filteredApis} loading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  );
}