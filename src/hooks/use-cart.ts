import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Product } from './use-products';

type CartItem = {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
};

async function fetchCart(): Promise<CartItem[]> {
  const response = await fetch('/api/cart');
  
  if (!response.ok) {
    if (response.status === 401) {
      // User is not authenticated
      return [];
    }
    throw new Error('Failed to fetch cart');
  }
  
  return response.json();
}

async function addToCart(productId: number, quantity: number = 1): Promise<CartItem> {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add item to cart');
  }
  
  return response.json();
}

async function updateCartItem(id: number, quantity: number): Promise<CartItem> {
  const response = await fetch(`/api/cart/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update cart item');
  }
  
  return response.json();
}

async function removeCartItem(id: number): Promise<{ success: boolean }> {
  const response = await fetch(`/api/cart/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to remove cart item');
  }
  
  return response.json();
}

export function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity?: number }) =>
      addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      updateCartItem(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => removeCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export type { CartItem };