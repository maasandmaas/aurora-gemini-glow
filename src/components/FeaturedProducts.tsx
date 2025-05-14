
import { useState } from 'react';
import { motion } from 'framer-motion';

const featuredItems = [
  {
    id: 1,
    name: "Celestial Diamond Ring",
    price: "$2,499",
    image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop",
    category: "Rings"
  },
  {
    id: 2,
    name: "Stardust Pendant",
    price: "$1,299",
    image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=1470&auto=format&fit=crop",
    category: "Necklaces"
  },
  {
    id: 3,
    name: "Aurora Tennis Bracelet",
    price: "$2,899",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1470&auto=format&fit=crop",
    category: "Bracelets"
  }
];

const FeaturedProducts = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-3 text-neutral-800">Featured Pieces</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover our most coveted designs, curated for those who appreciate exceptional craftsmanship.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {featuredItems.map((item) => (
            <motion.div
              key={item.id}
              className="relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredItem === item.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.7 }}
                />
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                  animate={{
                    opacity: hoveredItem === item.id ? 0.85 : 0.7,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-6 text-white"
                animate={{
                  y: hoveredItem === item.id ? -10 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="block text-sm opacity-80 mb-1">{item.category}</span>
                <h3 className="font-serif text-2xl mb-1">{item.name}</h3>
                <p className="text-lg font-light">{item.price}</p>
                
                <motion.button 
                  className="mt-4 px-6 py-2 bg-gold-600 hover:bg-gold-700 text-white rounded-md transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredItem === item.id ? 1 : 0,
                    y: hoveredItem === item.id ? 0 : 20
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  Shop Now
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
