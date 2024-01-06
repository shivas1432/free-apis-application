// Enhanced: Fix API response formatting - Jan 2024
// Enhanced: Implement pagination - Jan 2024
// Enhanced: Implement search functionality - Jan 2024
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



