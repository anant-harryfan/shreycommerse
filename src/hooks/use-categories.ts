import { useQuery } from '@tanstack/react-query';

type Category = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch('/api/categories');
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}

export type { Category };