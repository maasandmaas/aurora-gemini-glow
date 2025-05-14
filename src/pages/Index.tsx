
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import HeroBanner from '@/components/HeroBanner';
import Footer from '@/components/Footer';
import { fetchProducts } from '@/services/api';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import { Award, Gift, Truck, ShieldCheck } from 'lucide-react';
import ProductTabs from '@/components/ProductTabs';
import LuxuryShowcase from '@/components/LuxuryShowcase';
import Testimonials from '@/components/Testimonials';

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
    <div className="min-h-screen flex flex-col bg-white w-full overflow-x-hidden">
      <Header />
      <CategoryBar />
      <main className="flex-1">
        <HeroBanner />
        
        {/* Value Propositions */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Award className="h-8 w-8 text-gold-600" />, title: "Premium Quality", desc: "Handcrafted with precision and care" },
                { icon: <ShieldCheck className="h-8 w-8 text-gold-600" />, title: "Certified Authentic", desc: "Every piece comes with a certificate of authenticity" },
                { icon: <Truck className="h-8 w-8 text-gold-600" />, title: "Free Shipping", desc: "On all orders over $500" },
                { icon: <Gift className="h-8 w-8 text-gold-600" />, title: "Gift Packaging", desc: "Elegant packaging for every purchase" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center p-6 border border-neutral-100 rounded-lg"
                >
                  <div className="mb-4 p-3 bg-neutral-50 rounded-full">{item.icon}</div>
                  <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                  <p className="text-neutral-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Elegance Statement */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Exquisite Craftsmanship for Life's Special Moments</h2>
              <p className="text-neutral-600 leading-relaxed mb-8">
                At Fancy Moissanite, we believe that every milestone deserves to be commemorated with stunning, ethically-created jewelry that lasts a lifetime. Our master artisans combine traditional techniques with innovative design to create pieces that capture light and imagination.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Product Tabs Section */}
        <ProductTabs 
          products={products}
          isLoading={isLoading}
          error={error}
        />
        
        {/* Luxury Showcase - Replacing Custom Design Section */}
        <LuxuryShowcase />
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Newsletter Sign Up */}
        <section className="py-16 bg-pink-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="font-serif text-3xl md:text-4xl mb-3">Join Our Inner Circle</h2>
              <p className="text-neutral-600 mb-8">
                Subscribe to receive exclusive offers, early access to new collections, and expert jewelry care tips
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gold-600"
                />
                <button className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-3 rounded-md transition-colors">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
