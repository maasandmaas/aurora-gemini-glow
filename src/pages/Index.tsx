
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import HeroBanner from '@/components/HeroBanner';
import FeaturedProducts from '@/components/FeaturedProducts';
import ProductSection from '@/components/ProductSection';
import Footer from '@/components/Footer';
import { fetchProducts } from '@/services/api';
import { Product } from '@/types/product';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <CategoryBar />
      <main className="flex-1">
        <HeroBanner />
        
        <section className="container mx-auto py-16 px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-3 text-neutral-800">Our Collection</h2>
          <p className="text-center text-neutral-600 mb-10 max-w-2xl mx-auto">
            Discover our exquisite selection of handcrafted jewelry pieces, designed to captivate and inspire.
          </p>
          
          <ProductSection 
            products={products} 
            isLoading={isLoading} 
            error={error} 
          />
        </section>
        
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
