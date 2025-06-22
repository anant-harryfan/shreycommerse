import { useQuery } from '@tanstack/react-query';

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  categoryId: number | null;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    description: string | null;
    imageUrl: string | null;
  } | null;
};

async function fetchProducts(categoryId?: number): Promise<Product[]> {
  const url = categoryId
    ? `/api/products?categoryId=${categoryId}`
    : '/api/products';
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}

async function fetchProduct(id: number): Promise<Product> {
  const response = await fetch(`/api/products/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  
  return response.json();
}

export function useProducts(categoryId?: number) {
  return useQuery({
    queryKey: ['products', { categoryId }],
    queryFn: () => fetchProducts(categoryId),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
}

export type { Product };