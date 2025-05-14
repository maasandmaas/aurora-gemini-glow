
import { motion } from 'framer-motion';

const ProductSkeleton = () => {
  return (
    <div className="border border-neutral-100 rounded-lg overflow-hidden bg-white">
      {/* Image skeleton */}
      <div className="aspect-square bg-neutral-100 animate-pulse relative">
        <div className="absolute top-3 left-3 w-12 h-5 bg-neutral-200 rounded animate-pulse"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="p-4">
        <div className="w-1/3 h-4 bg-neutral-200 rounded animate-pulse mb-2"></div>
        <div className="w-full h-5 bg-neutral-200 rounded animate-pulse mb-2"></div>
        <div className="w-1/4 h-6 bg-neutral-200 rounded animate-pulse mt-2"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
