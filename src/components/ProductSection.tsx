
import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { Product } from '@/types/product';

interface ProductSectionProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const ProductSection = ({ products, isLoading, error }: ProductSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Extract unique categories from products
  const categories = products
    ? ['all', ...Array.from(new Set(products.flatMap(p => p.categories || [])))]
    : ['all'];

  // Filter products by category
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => 
        product.categories && product.categories.includes(activeCategory)
      );

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium">Loading Products...</h3>
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
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">{error}</div>
        <button className="px-4 py-2 bg-gold-600 text-white rounded hover:bg-gold-700">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1 text-sm rounded-full border transition-all ${
              activeCategory === category
                ? 'border-gold-600 bg-gold-600 text-white'
                : 'border-neutral-200 hover:border-gold-600 hover:text-gold-600'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-neutral-500">No products found in this category.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ProductSection;
