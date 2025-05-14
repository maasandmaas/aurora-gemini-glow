
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [hovering, setHovering] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { toast } = useToast();
  
  // Handle multiple images if available
  const hasMultipleImages = product.images && product.images.length > 1;
  
  // Price formatting
  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return !isNaN(numPrice) ? `$${numPrice.toFixed(2)}` : 'Price on request';
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
      duration: 3000,
    });
  };
  
  return (
    <motion.div 
      className="group relative rounded-lg overflow-hidden bg-white border border-neutral-100 hover:border-gold-200 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
      transition={{ type: "tween" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <a href={`/product/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.stock_status === "instock" ? (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">In Stock</span>
            ) : (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Out of Stock</span>
            )}
            
            {product.meta_data?.joice_enovathemes_label1 && (
              <span 
                className="text-white text-xs px-2 py-1 rounded"
                style={{ 
                  backgroundColor: product.meta_data.joice_enovathemes_label1_color || '#D4AF37' 
                }}
              >
                {product.meta_data.joice_enovathemes_label1}
              </span>
            )}
          </div>
          
          <img
            src={product.images && product.images.length > 0 
              ? product.images[currentImage] 
              : 'https://fancymoissanite.com/wp-content/uploads/placeholder.png'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://fancymoissanite.com/wp-content/uploads/placeholder.png';
            }}
          />
          
          {/* Image switch dots for multiple images */}
          {hasMultipleImages && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImage === idx 
                      ? 'bg-gold-600 scale-125' 
                      : 'bg-white/60 hover:bg-white'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImage(idx);
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Quick action buttons */}
          <div 
            className={`absolute inset-0 bg-black/5 flex items-center justify-center gap-3 transition-opacity duration-300 ${
              hovering ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={hovering ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gold-600 hover:text-white transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
            </motion.button>
            
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={hovering ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-full p-2 shadow-md hover:bg-pink-200 hover:text-red-500 transition-colors"
              onClick={handleWishlist}
            >
              <Heart size={18} />
            </motion.button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="mb-1 text-sm text-neutral-500">
            {product.categories && product.categories.join(', ')}
          </div>
          
          <h3 className="font-medium text-lg line-clamp-2 text-neutral-800 group-hover:text-gold-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="mt-2 text-lg font-semibold text-gold-600">
            {formatPrice(product.price)}
          </div>
          
          <div className="mt-3 h-0 overflow-hidden opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300">
            <p className="text-sm text-neutral-600 line-clamp-2">
              {product.short_description}
            </p>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default ProductCard;
