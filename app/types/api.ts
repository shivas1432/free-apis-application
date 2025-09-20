export interface API {
  id: string;
  name: string;
  description: string;
  category: string;
  useCases: string[];
  url: string;
  documentation?: string; // Made optional
  authentication: "none" | "key" | "oauth";
  rateLimit?: string;
  tags: string[];
}

export interface CategoryCount {
  category: string;
  count: number;
}

export interface FilterState {
  searchTerm: string;
  selectedCategory: string;
  selectedAuth: string;
}