
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1374&auto=format&fit=crop",
    title: "Timeless Elegance",
    subtitle: "Discover our exclusive collection",
    ctaText: "Shop Now",
    position: "center"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1561828995-aa79a2db86dd?q=80&w=1480&auto=format&fit=crop",
    title: "Bridal Collection",
    subtitle: "Make your special day unforgettable",
    ctaText: "Explore",
    position: "right"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=1470&auto=format&fit=crop",
    title: "Moissanite Magic",
    subtitle: "Ethical luxury for the modern woman",
    ctaText: "Discover",
    position: "left"
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Position helpers for text alignment
  const getTextPosition = (position: string) => {
    switch(position) {
      case "left": return "items-start text-left";
      case "right": return "items-end text-right";
      default: return "items-center text-center";
    }
  };

  // Auto play control
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000); // 5s per slide
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentSlide]);
  
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
  };
  
  const resumeAutoPlay = () => {
    setIsAutoPlaying(true);
  };

  return (
    <div 
      className="w-full h-[70vh] md:h-[85vh] relative overflow-hidden"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slides[currentSlide].image})`,
              backgroundPosition: "center"
            }}
          >
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
              className="w-full h-full bg-cover bg-center"
            />
          </div>
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className={`container mx-auto px-4 h-full flex flex-col justify-center ${getTextPosition(slides[currentSlide].position)}`}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4 drop-shadow-lg"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl text-white mb-8 max-w-xl drop-shadow-md"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="px-8 py-3 bg-gold-600 text-white rounded-md hover:bg-gold-700 transition-colors text-lg font-medium self-start"
              >
                {slides[currentSlide].ctaText}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-0 right-0 z-30 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <motion.div 
          className="h-full bg-gold-600"
          initial={{ width: "0%" }}
          animate={{ 
            width: "100%", 
            transition: { 
              duration: 5,
              ease: "linear",
              repeat: isAutoPlaying ? Infinity : 0,
              repeatType: "loop"
            } 
          }}
          key={currentSlide + "progress"}
        />
      </div>
    </div>
  );
};

export default HeroBanner;
