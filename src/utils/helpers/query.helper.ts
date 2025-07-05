// utils/query.ts

import type { Filters } from '@/types';

export const buildQueryParams = (filters: Filters, page: number): string => {
  const validFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) =>
        value !== undefined &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0)
    )
  );

  const params = new URLSearchParams({
    page: page.toString(),
    ...Object.entries(validFilters).reduce((acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    }, {} as Record<string, string>),
  });

  return params.toString();
};
