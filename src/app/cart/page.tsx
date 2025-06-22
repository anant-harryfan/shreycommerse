'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart, useUpdateCartItem, useRemoveCartItem } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/nextjs';

export default function CartPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { data: cartItems, isLoading } = useCart();
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();

  // Calculate cart totals
  const subtotal = cartItems?.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  ) ?? 0;

  const handleUpdateQuantity = (id: number, quantity: number) => {
    updateCartItem.mutate({ id, quantity });
  };

  const handleRemoveItem = (id: number) => {
    removeCartItem.mutate(id);
  };

  // Show loading state while auth is loading
  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="bg-muted-foreground/20 h-8 rounded-md mb-8 w-1/4"></div>
          <div className="bg-muted-foreground/20 h-40 rounded-md mb-4 w-full"></div>
          <div className="bg-muted-foreground/20 h-40 rounded-md mb-4 w-full"></div>
        </div>
      </div>
    );
  }

  // Redirect to sign in if not authenticated
  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="mb-6">Please sign in to view your cart.</p>
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
        <div className="animate-pulse">
          <div className="bg-muted-foreground/20 h-40 rounded-md mb-4 w-full"></div>
          <div className="bg-muted-foreground/20 h-40 rounded-md mb-4 w-full"></div>
        </div>
      </div>
    );
  }

  // Empty cart
  if (!cartItems?.length) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="mb-6">Your cart is empty.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex border rounded-lg overflow-hidden bg-card">
              {/* Product Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative flex-shrink-0 bg-muted">
                {item.product.imageUrl ? (
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary">
                    <span className="text-secondary-foreground text-xs">No image</span>
                  </div>
                )}
              </div>
              
              {/* Product Details */}
              <div className="flex-1 p-4 flex flex-col">
                <div className="flex justify-between">
                  <Link 
                    href={`/products/${item.product.id}`}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {item.product.name}
                  </Link>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove item"
                  >
                    &times;
                  </button>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {item.product.category?.name}
                </p>
                
                <div className="mt-auto flex justify-between items-center">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 text-sm border-r hover:bg-muted transition-colors"
                      aria-label="Decrease quantity"
                      disabled={updateCartItem.isPending}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 text-sm border-l hover:bg-muted transition-colors"
                      aria-label="Increase quantity"
                      disabled={updateCartItem.isPending}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(item.product.price)} each
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 bg-card sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
            
            <Button className="w-full mb-2">
              Checkout
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}