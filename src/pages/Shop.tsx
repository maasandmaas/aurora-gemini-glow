
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, ArrowUpDown, X, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryBar from '@/components/CategoryBar';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/services/api';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';

// Available color options with their hex values
const colorOptions = [
  { name: 'Gold', color: '#D4AF37' },
  { name: 'Rose Gold', color: '#B76E79' },
  { name: 'Silver', color: '#C0C0C0' },
  { name: 'Platinum', color: '#E5E4E2' },
  { name: 'White Gold', color: '#F2F2F2' },
  { name: 'Yellow Gold', color: '#FFDF00' },
];

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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Set price range based on actual product data
  useEffect(() => {
    if (products.length > 0) {
      const prices = products
        .map(p => parseFloat(p.price))
        .filter(p => !isNaN(p));
      
      if (prices.length) {
        const minPrice = Math.floor(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices));
        setPriceRange([minPrice, maxPrice]);
      }
    }
  }, [products]);
  
  // Filter products by all criteria
  const filteredProducts = products.filter(product => {
    // Category filter
    const passesCategory = !activeCategory || 
      (product.categories && product.categories.includes(activeCategory));
    
    // Price filter
    const price = parseFloat(product.price);
    const passesPrice = isNaN(price) || 
      (price >= priceRange[0] && price <= priceRange[1]);
    
    // Color filter (placeholder logic - would need real product color data)
    const passesColor = selectedColors.length === 0 || 
      (product.attributes?.some(attr => 
        attr.name === 'pa_color' && 
        attr.options?.some(opt => selectedColors.includes(String(opt)))
      ));
    
    // Material filter
    const passesMaterial = selectedMaterials.length === 0 || 
      (product.attributes?.some(attr => 
        attr.name === 'pa_material' && 
        attr.options?.some(opt => selectedMaterials.includes(String(opt)))
      ));
    
    return passesCategory && passesPrice && passesColor && passesMaterial;
  });
    
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

  // Handle price slider change
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  // Toggle color selection
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };

  // Toggle material selection
  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material) 
        ? prev.filter(m => m !== material) 
        : [...prev, material]
    );
  };

  // Apply filters
  const applyFilters = () => {
    setIsFilterApplied(true);
    setFiltersOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setActiveCategory(null);
    setPriceRange([0, 5000]);
    setSelectedColors([]);
    setSelectedMaterials([]);
    setIsFilterApplied(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar />
      
      <main className="container mx-auto mt-24 mb-10 px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">Discover Our Collections</h1>
        <p className="text-neutral-600 max-w-3xl">Browse our exquisite selection of high-quality moissanite jewelry, crafted with precision and care for your special moments.</p>
        
        <div className="flex flex-wrap items-center justify-between mt-8 mb-6">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <Button 
              variant="outline" 
              className={`border-neutral-300 ${filtersOpen ? 'bg-gold-50 text-gold-700 border-gold-300' : ''}`}
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <Filter size={18} className="mr-2" />
              Filters {isFilterApplied && <span className="ml-1 text-xs bg-gold-600 text-white rounded-full px-1.5">!</span>}
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
          <AnimatePresence>
            {filtersOpen && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="col-span-12 md:col-span-3 lg:col-span-2"
              >
                <div className="bg-white rounded-lg border border-neutral-200 p-5 sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-lg">Filters</h3>
                    {isFilterApplied && (
                      <button 
                        className="text-xs text-neutral-600 hover:text-red-500 underline"
                        onClick={resetFilters}
                      >
                        Reset all
                      </button>
                    )}
                  </div>
                
                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-2 flex items-center">
                      <span>Categories</span>
                    </h4>
                    <div className="space-y-2">
                      <button
                        className={`block w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
                          activeCategory === null
                            ? 'bg-gold-50 text-gold-800 font-medium'
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
                              ? 'bg-gold-50 text-gold-800 font-medium'
                              : 'hover:bg-neutral-50'
                          }`}
                          onClick={() => setActiveCategory(category)}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div className="border-t border-neutral-200 pt-6 mb-6">
                    <h4 className="font-medium mb-4 flex items-center justify-between">
                      <span>Price Range</span>
                      <span className="text-sm font-normal text-neutral-500">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </h4>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 5000]} 
                        value={[priceRange[0], priceRange[1]]}
                        min={0}
                        max={5000}
                        step={50}
                        onValueChange={handlePriceChange}
                        className="[&>span]:bg-gold-500"
                      />
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-neutral-500">
                      <span>$0</span>
                      <span>$5000+</span>
                    </div>
                  </div>
                  
                  {/* Colors */}
                  <div className="border-t border-neutral-200 pt-6 mb-6">
                    <h4 className="font-medium mb-3">Colors</h4>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map((colorOpt) => (
                        <button
                          key={colorOpt.name}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            selectedColors.includes(colorOpt.name) 
                              ? 'ring-2 ring-offset-2 ring-gold-600' 
                              : 'hover:scale-110'
                          }`}
                          style={{ backgroundColor: colorOpt.color }}
                          onClick={() => toggleColor(colorOpt.name)}
                          title={colorOpt.name}
                        >
                          {selectedColors.includes(colorOpt.name) && (
                            <Check size={14} className="text-black/70" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Materials */}
                  <div className="border-t border-neutral-200 pt-6 mb-6">
                    <h4 className="font-medium mb-3">Material</h4>
                    <div className="space-y-2">
                      {['Gold', 'Silver', 'Platinum', 'Rose Gold'].map(material => (
                        <div key={material} className="flex items-center">
                          <button 
                            className={`h-5 w-5 rounded flex items-center justify-center transition-colors ${
                              selectedMaterials.includes(material)
                                ? 'bg-gold-600' 
                                : 'border border-neutral-300 hover:border-gold-400'
                            }`}
                            onClick={() => toggleMaterial(material)}
                          >
                            {selectedMaterials.includes(material) && (
                              <Check size={14} className="text-white" />
                            )}
                          </button>
                          <label 
                            className="ml-2 text-sm text-neutral-700 cursor-pointer"
                            onClick={() => toggleMaterial(material)}
                          >
                            {material}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Apply filters button for mobile */}
                  <Button 
                    className="w-full md:hidden bg-gold-600 hover:bg-gold-700"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Product grid */}
          <div className={`col-span-12 ${filtersOpen ? 'md:col-span-9 lg:col-span-10' : 'md:col-span-12'}`}>
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
                {isFilterApplied && (
                  <Button 
                    variant="outline" 
                    className="mt-4 border-gold-300 text-gold-700"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                )}
              </div>
            ) : (
              <>
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {sortedProducts.slice((page - 1) * 12, page * 12).map(product => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Pagination */}
                {sortedProducts.length > 12 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex items-center space-x-2">
                      <button
                        className="h-10 w-10 rounded-md border border-neutral-300 flex items-center justify-center hover:bg-neutral-50 disabled:opacity-50 transition-colors"
                        disabled={page === 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                      >
                        &lt;
                      </button>
                      
                      {Array.from({ length: Math.ceil(sortedProducts.length / 12) }).map((_, i) => (
                        <button
                          key={i}
                          className={`h-10 w-10 rounded-md flex items-center justify-center transition-colors ${
                            page === i + 1 
                              ? 'bg-gold-600 text-white'
                              : 'border border-neutral-300 hover:bg-neutral-50'
                          }`}
                          onClick={() => setPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))}
                      
                      <button
                        className="h-10 w-10 rounded-md border border-neutral-300 flex items-center justify-center hover:bg-neutral-50 disabled:opacity-50 transition-colors"
                        disabled={page === Math.ceil(sortedProducts.length / 12)}
                        onClick={() => setPage(p => Math.min(Math.ceil(sortedProducts.length / 12), p + 1))}
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                )}
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
