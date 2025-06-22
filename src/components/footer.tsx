import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t py-6 bg-muted/50">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">ShreyWhoMerse</h3>
          <p className="text-sm text-muted-foreground">
            Your one-stop shop for all your shopping needs. Discover amazing products at unbeatable prices.
          </p>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Shop</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cart
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Account</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/sign-in" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/sign-up" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 pt-4 border-t">
        <p className="text-center text-sm text-muted-foreground">
          © {currentYear} ShreyWhoMerse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}