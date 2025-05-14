
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/product';
import { useToast } from '@/components/ui/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [hovering, setHovering] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { toast } = useToast();
  
  // Handle multiple images if available
  const hasMultipleImages = product.images && product.images.length > 1;
  
  // Reset current image when product changes
  useEffect(() => {
    setCurrentImage(0);
  }, [product.id]);
  
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

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImage((prev) => (prev + 1) % product.images!.length);
    }
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImage((prev) => (prev - 1 + product.images!.length) % product.images!.length);
    }
  };
  
  return (
    <motion.div 
      className="group relative overflow-hidden bg-white border border-neutral-100 hover:border-gold-200 hover:shadow-xl transition-all duration-300 rounded-xl"
      whileHover={{ y: -5 }}
      transition={{ type: "tween" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <a href={`/product/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-xl">
          {/* Status badges */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
            {product.stock_status === "instock" ? (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md font-medium">In Stock</span>
            ) : (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md font-medium">Out of Stock</span>
            )}
            
            {product.meta_data?.joice_enovathemes_label1 && (
              <span 
                className="text-white text-xs px-2 py-1 rounded-md font-medium"
                style={{ 
                  backgroundColor: product.meta_data.joice_enovathemes_label1_color || '#D4AF37' 
                }}
              >
                {product.meta_data.joice_enovathemes_label1}
              </span>
            )}
          </div>
          
          {/* Main product image with animation */}
          <motion.div
            key={`img-${currentImage}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
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
          </motion.div>
          
          {/* Navigation arrows for multiple images */}
          {hasMultipleImages && hovering && (
            <>
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-1.5 shadow-md hover:bg-white transition-colors"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={16} className="text-neutral-800" />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-1.5 shadow-md hover:bg-white transition-colors"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight size={16} className="text-neutral-800" />
              </button>
            </>
          )}

          {/* Image dots indicator */}
          {hasMultipleImages && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-20">
              {product.images!.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    currentImage === idx 
                      ? 'bg-gold-600 scale-125' 
                      : 'bg-white/70 hover:bg-white/90'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImage(idx);
                  }}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          
          {/* Quick action buttons */}
          <div 
            className={`absolute inset-0 bg-black/5 flex items-end justify-center gap-3 transition-opacity duration-300 z-10 p-4 ${
              hovering ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={hovering ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gold-600 hover:text-white transition-colors"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </motion.button>
            
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={hovering ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-full p-2 shadow-md hover:bg-pink-200 hover:text-red-500 transition-colors"
              onClick={handleWishlist}
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
            </motion.button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="mb-1 text-xs text-neutral-500 font-medium">
            {product.categories && product.categories.join(' • ')}
          </div>
          
          <h3 className="font-medium text-base line-clamp-2 text-neutral-800 group-hover:text-gold-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="mt-2 font-semibold text-gold-600">
            {formatPrice(product.price)}
            {product.regular_price && product.sale_price && (
              <span className="ml-2 text-sm line-through text-neutral-400">
                ${parseFloat(product.regular_price).toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="mt-3 transform origin-top max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
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
