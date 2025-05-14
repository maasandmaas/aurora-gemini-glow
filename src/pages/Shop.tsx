
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, ArrowUpDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryBar from '@/components/CategoryBar';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/services/api';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSorting, setActiveSorting] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  
  // Filter products by category
  const filteredProducts = activeCategory 
    ? products.filter(product => product.categories && product.categories.includes(activeCategory))
    : products;
    
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (activeSorting) {
      case 'price-asc':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-desc':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });
  
  // Get unique categories from all products
  const allCategories = Array.from(
    new Set(
      products
        .flatMap(product => product.categories || [])
        .filter(Boolean)
    )
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar />
      
      <main className="container mx-auto mt-32 mb-10 px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">Shop</h1>
        
        <div className="flex flex-wrap items-center justify-between mt-8 mb-6">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <Button 
              variant="outline" 
              className="border-neutral-300"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <Filter size={18} className="mr-2" />
              Filters
            </Button>
            
            <div className="relative">
              <select 
                value={activeSorting}
                onChange={(e) => setActiveSorting(e.target.value)}
                className="appearance-none bg-white border border-neutral-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-gold-600 focus:border-gold-600 cursor-pointer text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ArrowUpDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
            </div>
          </div>
          
          <p className="text-neutral-600 text-sm">
            Showing {sortedProducts.length} products
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Filters sidebar */}
          <div className={`col-span-12 md:col-span-3 lg:col-span-2 ${filtersOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg border border-neutral-200 p-4 sticky top-24">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <button
                  className={`block w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
                    activeCategory === null
                      ? 'bg-gold-50 text-gold-800'
                      : 'hover:bg-neutral-50'
                  }`}
                  onClick={() => setActiveCategory(null)}
                >
                  All Products
                </button>
                
                {allCategories.map(category => (
                  <button
                    key={category}
                    className={`block w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
                      activeCategory === category
                        ? 'bg-gold-50 text-gold-800'
                        : 'hover:bg-neutral-50'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="mt-6 border-t border-neutral-200 pt-4">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-neutral-600 block mb-1">Min</label>
                    <input 
                      type="number" 
                      className="w-full border border-neutral-300 rounded-md px-2 py-1 text-sm"
                      placeholder="$0" 
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-600 block mb-1">Max</label>
                    <input 
                      type="number"
                      className="w-full border border-neutral-300 rounded-md px-2 py-1 text-sm"
                      placeholder="$1000" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t border-neutral-200 pt-4">
                <h3 className="font-medium mb-3">Material</h3>
                <div className="space-y-2">
                  {['Gold', 'Silver', 'Platinum', 'Rose Gold'].map(material => (
                    <div key={material} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={material.toLowerCase().replace(' ', '-')}
                        className="h-4 w-4 rounded border-neutral-300 text-gold-600 focus:ring-gold-600" 
                      />
                      <label 
                        htmlFor={material.toLowerCase().replace(' ', '-')} 
                        className="ml-2 text-sm text-neutral-700"
                      >
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full bg-gold-600 hover:bg-gold-700">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product grid */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(8).fill(0).map((_, i) => (
                  <div key={i} className="border border-neutral-200 rounded-lg overflow-hidden">
                    <div className="aspect-square bg-neutral-100 animate-pulse" />
                    <div className="p-4">
                      <div className="h-4 bg-neutral-200 rounded animate-pulse mb-2" />
                      <div className="h-4 bg-neutral-200 rounded animate-pulse w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600">Failed to load products. Please try again later.</p>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12 bg-neutral-50 rounded-lg border border-neutral-200">
                <h3 className="text-lg font-medium mb-2">No Products Found</h3>
                <p className="text-neutral-600">Try changing your filters or check back later.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <button
                      className="h-8 w-8 rounded-md border border-neutral-300 flex items-center justify-center hover:bg-neutral-50 disabled:opacity-50"
                      disabled={page === 1}
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                    >
                      &lt;
                    </button>
                    
                    {[1, 2, 3].map(p => (
                      <button
                        key={p}
                        className={`h-8 w-8 rounded-md flex items-center justify-center ${
                          page === p 
                            ? 'bg-gold-600 text-white'
                            : 'border border-neutral-300 hover:bg-neutral-50'
                        }`}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </button>
                    ))}
                    
                    <button
                      className="h-8 w-8 rounded-md border border-neutral-300 flex items-center justify-center hover:bg-neutral-50 disabled:opacity-50"
                      disabled={page === 3}
                      onClick={() => setPage(p => Math.min(3, p + 1))}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
