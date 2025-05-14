
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryBar from '@/components/CategoryBar';
import { useToast } from '@/hooks/use-toast';
import { fetchProducts } from '@/services/api';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({});

  // Fetch product data
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Find the current product by slug
  const product = products?.find(p => p.slug === slug);

  // Functions for image gallery
  const nextImage = () => {
    if (!product?.images?.length) return;
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product?.images?.length) return;
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const selectImage = (index: number) => {
    setCurrentImage(index);
  };

  // Handles
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product?.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product?.name} has been added to your wishlist.`,
    });
  };

  const handleVariantChange = (name: string, value: string) => {
    setSelectedVariant(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CategoryBar />
        <div className="container mx-auto mt-32 mb-10 px-4 flex flex-col items-center">
          <div className="w-full max-w-4xl h-96 rounded-md bg-neutral-100 animate-pulse"></div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CategoryBar />
        <div className="container mx-auto mt-32 mb-10 px-4 flex flex-col items-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Product Not Found</h3>
            <p>We couldn't find the product you're looking for. Please try again or browse our other products.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar />
      
      <main className="container mx-auto mt-32 mb-10 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-gold-100">
              <motion.img 
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={product.images?.[currentImage] || 'https://fancymoissanite.com/wp-content/uploads/placeholder.png'} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation arrows */}
              {product.images && product.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              
              {/* Status labels */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
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
            </div>
            
            {/* Thumbnail gallery */}
            {product.images && product.images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      idx === currentImage ? 'border-gold-600 ring-1 ring-gold-600' : 'border-neutral-200 hover:border-gold-300'
                    }`}
                    onClick={() => selectImage(idx)}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-neutral-500 mb-3">
              <a href="/" className="hover:text-gold-600">Home</a>
              <span className="mx-2">/</span>
              <a href="/shop" className="hover:text-gold-600">Shop</a>
              {product.categories && product.categories[0] && (
                <>
                  <span className="mx-2">/</span>
                  <a href={`/shop/${product.categories[0].toLowerCase()}`} className="hover:text-gold-600">
                    {product.categories[0]}
                  </a>
                </>
              )}
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-neutral-800 mb-2">{product.name}</h1>
            
            {/* Price */}
            <div className="text-2xl font-semibold text-gold-600 my-3">
              {product.price && parseFloat(product.price) > 0 ? `$${parseFloat(product.price).toFixed(2)}` : 'Price on request'}
              {product.regular_price && product.sale_price && (
                <span className="ml-3 text-base line-through text-neutral-500">
                  ${parseFloat(product.regular_price).toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Rating placeholder */}
            <div className="flex items-center gap-1 mb-5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={18} 
                  className={star <= 4 ? "fill-gold-400 text-gold-400" : "text-neutral-300"} 
                />
              ))}
              <span className="text-sm text-neutral-600 ml-2">(4.0) | 12 Reviews</span>
            </div>
            
            {/* Short description */}
            <div className="text-neutral-600 mb-6 prose">
              <p>{product.short_description}</p>
            </div>
            
            {/* Variants/Attributes */}
            {product.attributes && product.attributes
              .filter(attr => attr.visible)
              .map((attribute) => (
                <div key={attribute.name} className="mb-5">
                  <h3 className="font-medium text-neutral-800 mb-2">
                    {attribute.name.replace('pa_', '').split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {attribute.options.map((option, idx) => (
                      <button
                        key={idx}
                        className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                          selectedVariant[attribute.name] === String(option)
                            ? 'bg-gold-100 border-gold-600 text-gold-800'
                            : 'border-neutral-200 hover:border-gold-300'
                        }`}
                        onClick={() => handleVariantChange(attribute.name, String(option))}
                      >
                        Option {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
            ))}
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-medium text-neutral-800 mb-2">Quantity:</h3>
              <div className="flex items-center">
                <button 
                  className="w-10 h-10 border border-neutral-300 flex items-center justify-center rounded-l-md hover:bg-neutral-50 disabled:opacity-50"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-14 h-10 border-y border-neutral-300 text-center text-neutral-800 focus:outline-none"
                />
                <button 
                  className="w-10 h-10 border border-neutral-300 flex items-center justify-center rounded-r-md hover:bg-neutral-50"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button 
                onClick={handleAddToCart} 
                className="bg-gold-600 hover:bg-gold-700 flex-1 py-6"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                onClick={handleAddToWishlist}
                className="border-gold-600 text-gold-600 hover:bg-gold-50"
              >
                <Heart size={18} />
              </Button>
              
              <Button 
                className="bg-green-600 hover:bg-green-700 flex-1 py-6"
              >
                <MessageSquare size={18} />
                Order Through Chat
              </Button>
            </div>
            
            {/* Meta info */}
            <div className="border-t border-neutral-200 pt-4 text-sm text-neutral-600">
              <p className="mb-1"><span className="font-medium">SKU:</span> {product.sku || 'N/A'}</p>
              <p className="mb-1">
                <span className="font-medium">Categories:</span> {product.categories?.join(', ') || 'Uncategorized'}
              </p>
              {product.tags && product.tags.length > 0 && (
                <p>
                  <span className="font-medium">Tags:</span> {product.tags.join(', ')}
                </p>
              )}
            </div>
            
            {/* Specifications */}
            {product.meta_data?._product_specifications && product.meta_data._product_specifications.length > 0 && (
              <div className="mt-6 border-t border-neutral-200 pt-4">
                <h3 className="font-serif text-xl font-medium mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.meta_data._product_specifications.slice(0, 5).map((spec, idx) => (
                    <div key={idx} className="flex justify-between p-2 bg-neutral-50 rounded text-sm">
                      <span className="font-medium">{spec.label}</span>
                      <span>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Features */}
            {product.meta_data?.enovathemes_addons_features && (
              <div className="mt-6 border-t border-neutral-200 pt-4">
                <h3 className="font-serif text-xl font-medium mb-3">Features</h3>
                <ul className="list-disc list-inside text-neutral-600">
                  {product.meta_data.enovathemes_addons_features
                    .split('\n')
                    .map((feature, idx) => (
                      <li key={idx} className="mb-1">{feature}</li>
                    ))
                  }
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Product Description */}
        <div className="max-w-7xl mx-auto mt-12 border-t border-neutral-200 pt-8">
          <h2 className="font-serif text-2xl font-medium mb-4">Description</h2>
          <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
