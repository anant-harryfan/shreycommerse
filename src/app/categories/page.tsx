'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCategories } from '@/hooks/use-categories';

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-muted rounded-lg p-4 h-60 animate-pulse">
              <div className="bg-muted-foreground/20 h-40 rounded-md mb-4"></div>
              <div className="bg-muted-foreground/20 h-4 rounded-md w-1/2"></div>
            </div>
          ))}
        </div>
      ) : categories?.length === 0 ? (
        <p className="text-center py-8">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category) => (
            <Link
              key={category.id}
              href={`/products?categoryId=${category.id}`}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video relative bg-muted">
                {category.imageUrl ? (
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary">
                    <span className="text-secondary-foreground">{category.name}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-1">{category.name}</h3>
                    {category.description && (
                      <p className="text-white/80 text-sm line-clamp-2">{category.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}