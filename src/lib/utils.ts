import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number to 2 digits with leading zero (e.g. 1 -> "01")
 */
export function formatIndex(index: number): string {
  return (index + 1).toString().padStart(2, '0');
}
