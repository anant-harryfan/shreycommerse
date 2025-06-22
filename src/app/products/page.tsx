'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProducts } from '@/hooks/use-products';
import { useCategories } from '@/hooks/use-categories';
import { formatPrice } from '@/lib/utils';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const { data: products, isLoading: productsLoading } = useProducts(selectedCategory);
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      
      {/* Categories filter */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        {categoriesLoading ? (
          <p>Loading categories...</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`px-4 py-2 rounded-md ${!selectedCategory ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
            >
              All
            </button>
            {categories?.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md ${selectedCategory === category.id ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Products grid */}
      {productsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-muted rounded-lg p-4 h-80 animate-pulse">
              <div className="bg-muted-foreground/20 h-40 rounded-md mb-4"></div>
              <div className="bg-muted-foreground/20 h-4 rounded-md mb-2 w-3/4"></div>
              <div className="bg-muted-foreground/20 h-4 rounded-md mb-4 w-1/2"></div>
              <div className="bg-muted-foreground/20 h-8 rounded-md w-full"></div>
            </div>
          ))}
        </div>
      ) : products?.length === 0 ? (
        <p className="text-center py-8">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-card rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-square relative overflow-hidden bg-muted">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary">
                    <span className="text-secondary-foreground">No image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {product.category?.name}
                </p>
                <p className="font-bold">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}