'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProduct } from '@/hooks/use-products';
import { useAddToCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  const { data: product, isLoading, error } = useProduct(productId);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCart();
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const handleAddToCart = () => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    addToCart.mutate(
      { productId, quantity },
      {
        onSuccess: () => {
          // Optionally show a success message
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 animate-pulse">
          <div className="md:w-1/2 bg-muted-foreground/20 rounded-lg aspect-square"></div>
          <div className="md:w-1/2">
            <div className="bg-muted-foreground/20 h-8 rounded-md mb-4 w-3/4"></div>
            <div className="bg-muted-foreground/20 h-6 rounded-md mb-6 w-1/4"></div>
            <div className="bg-muted-foreground/20 h-4 rounded-md mb-2 w-full"></div>
            <div className="bg-muted-foreground/20 h-4 rounded-md mb-2 w-full"></div>
            <div className="bg-muted-foreground/20 h-4 rounded-md mb-8 w-3/4"></div>
            <div className="bg-muted-foreground/20 h-10 rounded-md mb-4 w-full"></div>
            <div className="bg-muted-foreground/20 h-10 rounded-md w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">Sorry, the product you are looking for does not exist.</p>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2 bg-muted rounded-lg overflow-hidden">
          {product.imageUrl ? (
            <div className="relative aspect-square">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="aspect-square flex items-center justify-center bg-secondary">
              <span className="text-secondary-foreground">No image available</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl font-semibold mb-4 text-primary">
            {formatPrice(product.price)}
          </p>
          
          {product.category && (
            <Link 
              href={`/products?categoryId=${product.category.id}`}
              className="inline-block mb-4 text-sm bg-secondary px-3 py-1 rounded-full hover:bg-secondary/80 transition-colors"
            >
              {product.category.name}
            </Link>
          )}
          
          <p className="text-muted-foreground mb-6">
            {product.description || 'No description available.'}
          </p>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border-r hover:bg-muted transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border-l hover:bg-muted transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleAddToCart} 
              className="flex-1"
              disabled={!product.inStock || addToCart.isPending}
            >
              {addToCart.isPending ? 'Adding...' : 'Add to Cart'}
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
          
          {!product.inStock && (
            <p className="mt-4 text-destructive font-medium">Out of stock</p>
          )}
        </div>
      </div>
    </div>
  );
}