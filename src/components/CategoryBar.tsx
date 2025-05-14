
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryProps {
  name: string;
  image: string;
  subcategories: string[];
}

const categories: CategoryProps[] = [
  {
    name: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1470&auto=format&fit=crop",
    subcategories: ["Engagement Rings", "Wedding Bands", "Eternity Rings", "Fashion Rings"]
  },
  {
    name: "Necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1287&auto=format&fit=crop",
    subcategories: ["Pendants", "Chains", "Chokers", "Lockets"]
  },
  {
    name: "Earrings",
    image: "https://images.unsplash.com/photo-1633810541695-a1ebc26eff04?q=80&w=1287&auto=format&fit=crop",
    subcategories: ["Studs", "Hoops", "Drops", "Climbers"]
  },
  {
    name: "Bracelets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1170&auto=format&fit=crop",
    subcategories: ["Tennis", "Bangles", "Cuffs", "Charm"]
  },
  {
    name: "Sets",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1287&auto=format&fit=crop",
    subcategories: ["Wedding Sets", "Matching Sets", "Layering Sets", "Gift Sets"]
  },
  {
    name: "Moissanite",
    image: "https://images.unsplash.com/photo-1586864090002-9f4699618867?q=80&w=1287&auto=format&fit=crop",
    subcategories: ["Loose Stones", "Custom Designs", "Special Cuts", "Colored Moissanite"]
  }
];

const CategoryBar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeCategory && categoryRefs.current.every(ref => ref && !ref.contains(event.target as Node))) {
        setActiveCategory(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeCategory]);

  return (
    <div className="w-full bg-white border-b border-gold-100 z-40 pt-20">
      <div className="container mx-auto">
        {/* Category Navigation */}
        <div className="flex justify-center space-x-8 px-4 py-4 relative">
          {categories.map((category, index) => (
            <div
              key={category.name}
              ref={el => (categoryRefs.current[index] = el)}
              className="relative"
            >
              <button
                className={`text-sm font-medium transition-all px-1 py-2 hover:text-gold-600 ${
                  activeCategory === category.name 
                    ? 'text-gold-600 after:content-[""] after:absolute after:left-0 after:right-0 after:-bottom-[1px] after:h-[2px] after:bg-gold-600' 
                    : 'text-neutral-700'
                }`}
                onMouseEnter={() => setActiveCategory(category.name)}
                onClick={() => setActiveCategory(prevState => 
                  prevState === category.name ? null : category.name
                )}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        
        {/* Dropdown Content */}
        <AnimatePresence>
          {activeCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative w-full border-t border-gold-100 overflow-hidden"
            >
              {categories.map(category => 
                category.name === activeCategory && (
                  <div key={category.name} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 px-4">
                    <div className="md:col-span-1">
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="h-full"
                      >
                        <div className="overflow-hidden rounded-lg h-full">
                          <img 
                            src={category.image} 
                            alt={category.name} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" 
                          />
                        </div>
                      </motion.div>
                    </div>
                    <div className="md:col-span-2 flex flex-col justify-center">
                      <motion.h3 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="font-serif text-2xl mb-4 text-neutral-800"
                      >
                        {category.name} Collection
                      </motion.h3>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="grid grid-cols-2 gap-y-2 gap-x-8"
                      >
                        {category.subcategories.map((subcat, i) => (
                          <motion.a
                            key={subcat}
                            href={`/category/${category.name.toLowerCase()}/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.15 + (i * 0.05) }}
                            className="hover:text-gold-600 transition-colors flex items-center"
                          >
                            <span className="w-1 h-1 bg-gold-600 rounded-full mr-2"></span>
                            {subcat}
                          </motion.a>
                        ))}
                      </motion.div>
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="mt-6 self-start px-6 py-2 bg-white border border-gold-600 text-gold-600 rounded-md hover:bg-gold-600 hover:text-white transition-all"
                      >
                        View All {category.name}
                      </motion.button>
                    </div>
                  </div>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CategoryBar;
