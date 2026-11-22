import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { siteConfig } from '@/src/config/site';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: siteConfig.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompactINR(amount: number): string {
  return `INR ${new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}
