
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryBar from '@/components/CategoryBar';
import { Button } from '@/components/ui/button';

// Collection data
const collections = [
  {
    id: 1,
    name: "Wedding Collection",
    slug: "wedding",
    description: "Beautiful rings and jewelry for your special day, crafted with love and precision.",
    image: "https://fancymoissanite.com/wp-content/uploads/ancy-2.png",
    productCount: 24
  },
  {
    id: 2,
    name: "Engagement Collection",
    slug: "engagement",
    description: "Perfect symbols of your commitment, designed to last a lifetime.",
    image: "https://fancymoissanite.com/wp-content/uploads/Fancy.png",
    productCount: 18
  },
  {
    id: 3,
    name: "Anniversary Collection",
    slug: "anniversary", 
    description: "Celebrate your journey together with our exquisite anniversary pieces.",
    image: "https://fancymoissanite.com/wp-content/uploads/product149.webp",
    productCount: 12
  },
  {
    id: 4,
    name: "Custom Collection",
    slug: "custom",
    description: "Personalized jewelry designed specifically to your requirements and preferences.",
    image: "https://fancymoissanite.com/wp-content/uploads/product150.webp", 
    productCount: 8
  }
];

const Collections = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar />
      
      <main className="container mx-auto mt-32 mb-10 px-4">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="font-serif text-3xl md:text-5xl font-semibold mb-4">Our Collections</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover our carefully curated collections of fine jewelry, each piece telling a unique story of elegance, craftsmanship, and timeless beauty.
          </p>
        </div>
        
        <div className="grid gap-16">
          {collections.map((collection, idx) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                idx % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={`${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-72 md:h-96 object-cover transform transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-end">
                    <div className="w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="text-white font-medium">{collection.productCount} Products</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                <h2 className="font-serif text-3xl font-medium mb-3">{collection.name}</h2>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {collection.description}
                </p>
                <Button asChild className="bg-gold-600 hover:bg-gold-700">
                  <Link to={`/collections/${collection.slug}`}>
                    Explore Collection
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 bg-pink-50 rounded-lg p-8 md:p-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-serif text-gold-600 text-5xl mb-4">"</div>
            <p className="font-serif text-xl md:text-2xl text-neutral-800 mb-6">
              Every piece from Fancy Moissanite carries a story of its own, a narrative of exceptional craftsmanship that transforms precious materials into heirlooms to be cherished for generations.
            </p>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                <img 
                  src="https://i.pravatar.cc/300" 
                  alt="Customer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-medium">Emily Johnson</div>
              <div className="text-sm text-neutral-600">Satisfied Customer</div>
            </div>
          </div>
        </motion.div>
        
        {/* Newsletter */}
        <div className="mt-24 bg-white border border-neutral-200 rounded-lg p-8 md:p-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-serif text-2xl font-medium mb-2">Join Our Community</h3>
            <p className="text-neutral-600 mb-6">
              Subscribe to receive updates on new collections, exclusive offers and jewelry care tips.
            </p>
            <div className="flex gap-3 flex-col md:flex-row">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gold-600"
              />
              <Button className="bg-gold-600 hover:bg-gold-700 md:shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Collections;
