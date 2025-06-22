'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCategories } from '@/hooks/use-categories';
import { useProducts } from '@/hooks/use-products';
import { formatPrice } from '@/lib/utils';

export default function Home() {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: products, isLoading: productsLoading } = useProducts();

  // Get featured products (first 4)
  const featuredProducts = products?.slice(0, 4);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to ShreyWhoMerse
            </h1>
            <p className="text-lg mb-6 text-muted-foreground">
              Discover amazing products at great prices. Shop our latest collections and find your perfect style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Hero image"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          
          {categoriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg p-4 h-60 animate-pulse">
                  <div className="bg-muted-foreground/20 h-40 rounded-md mb-4"></div>
                  <div className="bg-muted-foreground/20 h-4 rounded-md w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories?.slice(0, 3).map((category) => (
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
          
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/categories">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          
          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg p-4 h-80 animate-pulse">
                  <div className="bg-muted-foreground/20 h-40 rounded-md mb-4"></div>
                  <div className="bg-muted-foreground/20 h-4 rounded-md mb-2 w-3/4"></div>
                  <div className="bg-muted-foreground/20 h-4 rounded-md mb-4 w-1/2"></div>
                  <div className="bg-muted-foreground/20 h-8 rounded-md w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts?.map((product) => (
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
          
          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of high-quality products and find something you'll love.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}