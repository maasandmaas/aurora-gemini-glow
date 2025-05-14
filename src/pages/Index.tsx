import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import HeroBanner from '@/components/HeroBanner';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import { fetchProducts } from '@/services/api';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Gift, Truck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden w-full">
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
              <Link to="/collections" className="inline-flex items-center font-medium text-gold-600 hover:text-gold-700">
                Discover Our Story <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Featured Products Section - Keep this section */}
        <FeaturedProducts />
        
        {/* Custom Design Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2215&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
          <div className="container relative mx-auto px-4 z-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl mb-4">Design Your Dream Piece</h2>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  Can't find exactly what you're looking for? Our custom design service brings your vision to life. Work directly with our expert jewelers to create a one-of-a-kind piece that tells your unique story.
                </p>
                <div className="space-y-3 mb-8">
                  {["Personal consultation", "3D design previews", "Handcrafted execution", "Lifetime warranty"].map((item, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-600 mr-3"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Button className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-2.5">
                  Begin Your Custom Journey
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative aspect-square max-w-md mx-auto"
              >
                <div className="absolute inset-0 rounded-full bg-pink-50 opacity-50 animate-pulse"></div>
                <img 
                  src="https://fancymoissanite.com/wp-content/uploads/ancy-2.png" 
                  alt="Custom Design" 
                  className="relative z-10 p-8"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Collection Highlights */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl mb-3">Our Collections</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Discover our carefully curated collections, each telling a unique story through exceptional jewelry
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Wedding",
                  image: "https://fancymoissanite.com/wp-content/uploads/product149.webp",
                  description: "Celebrate your special day with our stunning wedding collection"
                },
                {
                  title: "Engagement",
                  image: "https://fancymoissanite.com/wp-content/uploads/Fancy.png",
                  description: "Begin your journey together with a symbol of eternal love"
                },
                {
                  title: "Anniversary",
                  image: "https://fancymoissanite.com/wp-content/uploads/product150.webp",
                  description: "Mark your milestones with pieces as enduring as your love"
                }
              ].map((collection, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group overflow-hidden rounded-lg border border-neutral-100"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src={collection.image} 
                      alt={collection.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl mb-2">{collection.title} Collection</h3>
                    <p className="text-neutral-600 text-sm mb-4">{collection.description}</p>
                    <Link to={`/collections/${collection.title.toLowerCase()}`} className="text-gold-600 font-medium text-sm inline-flex items-center">
                      Explore Collection <ArrowRight size={14} className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild className="bg-white text-gold-600 border border-gold-600 hover:bg-gold-50">
                <Link to="/collections">View All Collections</Link>
              </Button>
            </div>
          </div>
        </section>
        
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
                <Button className="bg-gold-600 hover:bg-gold-700 px-6">
                  Subscribe
                </Button>
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
