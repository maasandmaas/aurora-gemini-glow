
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight, MessageSquare, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryBar from '@/components/CategoryBar';
import { useToast } from '@/components/ui/use-toast';
import { fetchProducts } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

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
        <div className="container mx-auto mt-24 mb-10 px-4 flex flex-col items-center">
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
        <div className="container mx-auto mt-24 mb-10 px-4 flex flex-col items-center">
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
      
      <main className="container mx-auto mt-24 mb-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-neutral-500 mb-6">
            <a href="/" className="hover:text-gold-600 transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/shop" className="hover:text-gold-600 transition-colors">Shop</a>
            {product.categories && product.categories[0] && (
              <>
                <span className="mx-2">/</span>
                <a href={`/shop/${product.categories[0].toLowerCase()}`} className="hover:text-gold-600 transition-colors">
                  {product.categories[0]}
                </a>
              </>
            )}
            <span className="mx-2">/</span>
            <span className="text-neutral-400 truncate max-w-[150px] sm:max-w-xs">{product.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="relative">
              {/* Main image display */}
              <div className="relative aspect-square overflow-hidden rounded-xl border border-neutral-200">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={product.images?.[currentImage] || 'https://fancymoissanite.com/wp-content/uploads/placeholder.png'} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Navigation arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white shadow-md transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white shadow-md transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                
                {/* Status labels */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
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
              </div>
              
              {/* Thumbnail gallery */}
              {product.images && product.images.length > 1 && (
                <div className="mt-4">
                  <Carousel
                    opts={{
                      align: "start",
                      loop: product.images.length > 5,
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="ml-0">
                      {product.images.map((img, idx) => (
                        <CarouselItem key={idx} className="pl-2 basis-1/5 md:basis-1/6">
                          <button 
                            className={`w-full aspect-square rounded-md overflow-hidden border-2 transition-all ${
                              idx === currentImage ? 'border-gold-600 ring-1 ring-gold-600' : 'border-neutral-200 hover:border-gold-300'
                            }`}
                            onClick={() => selectImage(idx)}
                          >
                            <img 
                              src={img} 
                              alt={`${product.name} view ${idx + 1}`} 
                              className="w-full h-full object-cover" 
                            />
                          </button>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {product.images.length > 5 && (
                      <>
                        <CarouselPrevious className="left-0 -translate-x-1/4" />
                        <CarouselNext className="right-0 translate-x-1/4" />
                      </>
                    )}
                  </Carousel>
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-neutral-800">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mt-3 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={18} 
                    className={star <= 4 ? "fill-gold-400 text-gold-400" : "text-neutral-300"} 
                  />
                ))}
                <span className="text-sm text-neutral-600 ml-2">(4.0) | 12 Reviews</span>
              </div>
              
              {/* Price */}
              <div className="text-2xl font-semibold text-gold-600 mb-4">
                {product.price && parseFloat(product.price) > 0 ? `$${parseFloat(product.price).toFixed(2)}` : 'Price on request'}
                {product.regular_price && product.sale_price && (
                  <span className="ml-3 text-base line-through text-neutral-500">
                    ${parseFloat(product.regular_price).toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Divider */}
              <div className="border-t border-neutral-200 my-4"></div>
              
              {/* Short description */}
              <div className="text-neutral-600 mb-6 prose max-w-none">
                <p>{product.short_description}</p>
              </div>
              
              {/* Variants/Attributes */}
              {product.attributes && product.attributes
                .filter(attr => attr.visible)
                .map((attribute) => (
                  <div key={attribute.name} className="mb-5">
                    <h3 className="font-medium text-neutral-800 mb-3">
                      {attribute.name.replace('pa_', '').split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {attribute.options.map((option, idx) => {
                        const isColorAttr = attribute.name.toLowerCase().includes('color');
                        const optionStr = String(option);
                        const isSelected = selectedVariant[attribute.name] === optionStr;
                        
                        if (isColorAttr) {
                          // For color attributes, show color circles
                          const colorMap: Record<string, string> = {
                            'gold': '#D4AF37',
                            'rose-gold': '#B76E79',
                            'silver': '#C0C0C0',
                            'platinum': '#E5E4E2',
                            'white-gold': '#F2F2F2',
                            'yellow-gold': '#FFDF00',
                          };
                          
                          const colorKey = optionStr.toLowerCase().replace(' ', '-');
                          const bgColor = colorMap[colorKey] || '#888888';
                          
                          return (
                            <button
                              key={idx}
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                isSelected ? 'ring-2 ring-offset-2 ring-gold-600' : 'hover:scale-110'
                              }`}
                              style={{ backgroundColor: bgColor }}
                              onClick={() => handleVariantChange(attribute.name, optionStr)}
                              title={optionStr}
                            >
                              {isSelected && <Check size={14} className="text-white" />}
                            </button>
                          );
                        }
                        
                        return (
                          <button
                            key={idx}
                            className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                              isSelected
                                ? 'bg-gold-100 border-gold-600 text-gold-800 font-medium'
                                : 'border-neutral-200 hover:border-gold-300'
                            }`}
                            onClick={() => handleVariantChange(attribute.name, optionStr)}
                          >
                            {optionStr}
                          </button>
                        );
                      })}
                    </div>
                  </div>
              ))}
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-medium text-neutral-800 mb-3">Quantity:</h3>
                <div className="flex items-center">
                  <button 
                    className="w-10 h-10 border border-neutral-300 flex items-center justify-center rounded-l-md hover:bg-neutral-50 disabled:opacity-50 transition-colors"
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
                    className="w-16 h-10 border-y border-neutral-300 text-center text-neutral-800 focus:outline-none"
                  />
                  <button 
                    className="w-10 h-10 border border-neutral-300 flex items-center justify-center rounded-r-md hover:bg-neutral-50 transition-colors"
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
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleAddToWishlist}
                  className="border-gold-300 text-gold-600 hover:bg-gold-50"
                >
                  <Heart size={18} />
                </Button>
                
                <Button 
                  className="bg-green-600 hover:bg-green-700 flex-1 py-6"
                >
                  <MessageSquare size={18} className="mr-2" />
                  Order Through Chat
                </Button>
              </div>
              
              {/* Meta info */}
              <div className="border-t border-neutral-200 pt-4 text-sm text-neutral-600">
                <div className="grid grid-cols-2 gap-2">
                  <p className="flex items-center"><span className="font-medium w-20">SKU:</span> {product.sku || 'N/A'}</p>
                  <p className="flex items-center">
                    <span className="font-medium w-20">Categories:</span> 
                    <span className="truncate">{product.categories?.join(', ') || 'Uncategorized'}</span>
                  </p>
                  {product.tags && product.tags.length > 0 && (
                    <p className="flex items-center col-span-2">
                      <span className="font-medium w-20">Tags:</span> {product.tags.join(', ')}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Social sharing */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-medium">Share:</span>
                <div className="flex gap-2">
                  {['facebook', 'twitter', 'instagram', 'pinterest'].map(social => (
                    <a 
                      key={social}
                      href="#" 
                      className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-gold-100 transition-colors"
                    >
                      <span className="sr-only">Share on {social}</span>
                      {/* Icon placeholder */}
                      <div className="w-4 h-4 rounded-full bg-neutral-400"></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs for Product Details */}
          <div className="mt-12 border-t border-neutral-200 pt-6">
            <div className="flex border-b border-neutral-200">
              <button
                className={`px-6 py-3 font-medium text-sm transition-colors ${
                  activeTab === 'description' 
                    ? 'border-b-2 border-gold-600 text-gold-800' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm transition-colors ${
                  activeTab === 'specifications' 
                    ? 'border-b-2 border-gold-600 text-gold-800' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm transition-colors ${
                  activeTab === 'reviews' 
                    ? 'border-b-2 border-gold-600 text-gold-800' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews (12)
              </button>
            </div>
            
            <div className="py-6">
              {activeTab === 'description' && (
                <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
              )}
              
              {activeTab === 'specifications' && (
                <div>
                  {product.meta_data?._product_specifications && product.meta_data._product_specifications.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.meta_data._product_specifications.map((spec, idx) => (
                        <div key={idx} className="flex justify-between p-3 bg-neutral-50 rounded text-sm border border-neutral-100">
                          <span className="font-medium text-neutral-700">{spec.label}</span>
                          <span className="text-neutral-600">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-neutral-600">No specifications available for this product.</p>
                  )}
                  
                  {product.meta_data?.enovathemes_addons_features && (
                    <div className="mt-6">
                      <h3 className="font-serif text-xl font-medium mb-3">Features</h3>
                      <ul className="list-disc list-inside text-neutral-600 space-y-1">
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
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <div className="mb-6 flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 rounded-lg">
                      <span className="text-4xl font-bold text-gold-600">4.0</span>
                      <div className="flex mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={14} 
                            className={star <= 4 ? "fill-gold-400 text-gold-400" : "text-neutral-300"} 
                          />
                        ))}
                      </div>
                      <span className="text-xs mt-1 text-neutral-500">Based on 12 reviews</span>
                    </div>
                    
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const percentage = rating === 4 ? 60 : rating === 5 ? 30 : 10;
                        
                        return (
                          <div key={rating} className="flex items-center mb-1">
                            <div className="flex items-center mr-2">
                              <span className="text-xs text-neutral-600 mr-1">{rating}</span>
                              <Star size={12} className="fill-gold-400 text-gold-400" />
                            </div>
                            <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gold-400 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-neutral-500 ml-2">{percentage}%</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div>
                      <Button className="bg-gold-600 hover:bg-gold-700">
                        Write a Review
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="p-4 border border-neutral-100 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-neutral-200 mr-3"></div>
                            <div>
                              <p className="font-medium">Customer {i+1}</p>
                              <p className="text-xs text-neutral-500">2 months ago</p>
                            </div>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                size={14} 
                                className={star <= 4 ? "fill-gold-400 text-gold-400" : "text-neutral-300"} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-neutral-600">
                          This product exceeded my expectations. The quality is amazing and it looks even better in person.
                          I've received many compliments and would definitely recommend it to others looking for fine jewelry.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
