
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { Product } from '@/types/product';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ProductTabsProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const ProductTabs = ({ products, isLoading, error }: ProductTabsProps) => {
  // Extract unique categories
  const allCategories = products 
    ? Array.from(new Set(products.flatMap(p => p.categories || [])))
    : [];

  const [activeCategory, setActiveCategory] = useState<string>(allCategories[0] || 'All');
  
  // Update active category when products load
  useEffect(() => {
    if (allCategories.length > 0 && !allCategories.includes(activeCategory)) {
      setActiveCategory(allCategories[0]);
    }
  }, [products]);
  
  // Filter products by active category
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.categories?.includes(activeCategory));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-serif text-3xl">Our Products</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button className="px-4 py-2 bg-gold-600 text-white rounded hover:bg-gold-700">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl mb-3">Explore Our Collection</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover our exquisite range of handcrafted moissanite jewelry, each piece telling a unique story
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-2 border-b w-full pb-1">
            {['All', ...allCategories].map((category) => {
              const isActive = activeCategory === category;
              const tabWidth = `calc(${100 / (['All', ...allCategories].length)}% - 8px)`;
              
              return (
                <button
                  key={category}
                  className={`px-4 py-3 font-medium transition-all whitespace-nowrap text-center rounded-t-lg ${
                    isActive 
                      ? 'text-gold-700 border-b-2 border-gold-600' 
                      : 'text-neutral-500 hover:text-gold-600'
                  }`}
                  onClick={() => setActiveCategory(category)}
                  style={{ minWidth: '120px', maxWidth: '200px', width: tabWidth }}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid with Animation */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredProducts.slice(0, 8).map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link 
            to="/shop" 
            className="inline-flex items-center px-6 py-3 bg-gold-600 text-white rounded-md hover:bg-gold-700 transition-colors"
          >
            View All Products
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;
