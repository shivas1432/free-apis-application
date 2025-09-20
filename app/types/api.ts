export interface API {
  id: string;
  name: string;
  description: string;
  category: string;
  useCases: string[];
  url: string;
  documentation?: string;
  authentication: "none" | "key" | "oauth";
  rateLimit?: string;
  tags: string[];
}

export interface CategoryCount {
  category: string;
  count: number;
}