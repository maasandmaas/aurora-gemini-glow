
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LuxuryShowcase = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=2096&auto=format&fit=crop"
                    alt="Luxury Ring"
                    className="w-full h-[240px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1287&auto=format&fit=crop"
                    alt="Luxury Necklace"
                    className="w-full h-[180px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1170&auto=format&fit=crop"
                    alt="Luxury Bracelet"
                    className="w-full h-[180px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1586864090002-9f4699618867?q=80&w=1287&auto=format&fit=crop"
                    alt="Loose Moissanite"
                    className="w-full h-[240px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-pink-100 z-[-1]"></div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-gold-100 z-[-1]"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-pink-50 opacity-50"></div>
            
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              Timeless Elegance, <span className="text-gold-600">Contemporary Design</span>
            </h2>
            
            <p className="text-neutral-700 mb-8 leading-relaxed">
              At Fancy Moissanite, we blend traditional craftsmanship with modern aesthetic sensibilities. Each piece in our collection is meticulously created to capture light in extraordinary ways, rivaling the brilliance of diamonds at a fraction of the environmental and financial cost.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="border-l-2 border-gold-300 pl-4">
                <h3 className="font-serif text-xl mb-2">Ethical Sourcing</h3>
                <p className="text-neutral-600 text-sm">
                  All our moissanite is ethically lab-created, ensuring no environmental harm.
                </p>
              </div>
              
              <div className="border-l-2 border-gold-300 pl-4">
                <h3 className="font-serif text-xl mb-2">Lifetime Warranty</h3>
                <p className="text-neutral-600 text-sm">
                  We stand behind the quality of our craftsmanship with a lifetime warranty.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Link to="/collections" className="inline-flex items-center text-gold-600 hover:text-gold-700 font-medium">
                Explore Our Collections <ArrowRight size={16} className="ml-2" />
              </Link>
              <br/>
              <Link to="/shop" className="inline-flex items-center px-6 py-3 bg-gold-600 text-white rounded-md hover:bg-gold-700 transition-colors">
                Shop Now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryShowcase;
