
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Bride-to-be',
    comment: 'I couldn't be happier with my engagement ring from Fancy Moissanite. The craftsmanship is incredible, and the stone sparkles in any light. My fiancé was impressed with the quality and price.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Anniversary Gift',
    comment: 'For our 10th anniversary, I wanted something special. The custom design process was so personal, and the final piece exceeded all expectations. My wife tears up every time she puts it on.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Jewelry Collector',
    comment: 'As someone who collects fine jewelry, I'm extremely particular about quality. Fancy Moissanite's pieces stand alongside my most expensive items. The ethical sourcing is a significant bonus.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1288&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'David Thompson',
    position: 'Returning Customer',
    comment: 'I've purchased three pieces now, and each one has been perfect. The customer service team went above and beyond to help me find exactly what I was looking for. Highly recommend!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1287&auto=format&fit=crop'
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-neutral-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl mb-3">Customer Stories</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Hear from our clients who have found the perfect piece to celebrate their special moments
          </p>
        </div>

        <div className="relative">
          {/* Decorative elements */}
          <div className="hidden lg:block absolute -top-8 left-0 w-24 h-24 rounded-full bg-pink-100 opacity-50"></div>
          <div className="hidden lg:block absolute bottom-12 right-10 w-16 h-16 rounded-full bg-pink-100 opacity-50"></div>
          <div className="hidden lg:block absolute top-40 right-0 w-32 h-32 rounded-full bg-gold-100 opacity-40"></div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Testimonial quote */}
            <motion.div
              key={`quote-${testimonials[activeIndex].id}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white p-8 rounded-lg shadow-md relative z-10"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold-500 fill-gold-500" />
                ))}
              </div>

              <blockquote className="text-lg text-neutral-700 italic mb-6">
                "{testimonials[activeIndex].comment}"
              </blockquote>

              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={testimonials[activeIndex].image} 
                      alt={testimonials[activeIndex].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-medium text-neutral-900">{testimonials[activeIndex].name}</p>
                  <p className="text-sm text-neutral-500">{testimonials[activeIndex].position}</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial images gallery */}
            <div className="relative h-[400px] md:h-[500px]">
              {testimonials.map((testimonial, index) => {
                // Create a staggered animation effect
                const isActive = index === activeIndex;
                const zIndex = isActive ? 30 : 10 - index;
                const scale = isActive ? 1 : 0.85;
                const translateY = isActive ? 0 : 20;
                const opacity = isActive ? 1 : 0.7;
                
                return (
                  <motion.div
                    key={`image-${testimonial.id}`}
                    className="absolute inset-0"
                    style={{
                      zIndex: isActive ? 30 : 10 - Math.abs(activeIndex - index)
                    }}
                    animate={{
                      scale,
                      translateY,
                      opacity,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={`h-full overflow-hidden rounded-lg ${isActive ? 'shadow-xl' : 'shadow-md'} border border-neutral-100`}>
                      <img
                        src={`https://source.unsplash.com/random/${600 + index}x800/?jewelry,diamond,ring,gold`}
                        alt="Jewelry Product"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Testimonial navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex 
                    ? 'bg-gold-600 w-6' 
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
