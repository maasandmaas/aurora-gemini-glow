
import { useState, useEffect } from 'react';
import { ChevronDown, Search, ShoppingCart, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gold-600" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="/" 
              className="font-serif text-xl md:text-2xl font-bold text-gold-600 tracking-wider"
            >
              FANCY MOISSANITE
            </a>
          </div>

          {/* Main Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavItem label="Home" href="/" />
            <NavItem label="Shop" href="/shop" hasChildren />
            <NavItem label="Collections" href="/collections" hasChildren />
            <NavItem label="About" href="/about" />
            <NavItem label="Contact" href="/contact" />
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="hover:text-gold-600 transition-colors">
              <Search size={20} />
            </button>
            <button className="hover:text-gold-600 transition-colors">
              <User size={20} />
            </button>
            <button className="hover:text-gold-600 transition-colors relative">
              <Heart size={20} />
              <span className="absolute -top-1 -right-1 bg-pink-200 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </button>
            <button className="hover:text-gold-600 transition-colors relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-gold-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t mt-3 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <a href="/" className="px-2 py-2 hover:bg-pink-50 rounded-md">Home</a>
            <a href="/shop" className="px-2 py-2 hover:bg-pink-50 rounded-md flex justify-between">
              Shop
              <ChevronDown size={18} />
            </a>
            <a href="/collections" className="px-2 py-2 hover:bg-pink-50 rounded-md flex justify-between">
              Collections
              <ChevronDown size={18} />
            </a>
            <a href="/about" className="px-2 py-2 hover:bg-pink-50 rounded-md">About</a>
            <a href="/contact" className="px-2 py-2 hover:bg-pink-50 rounded-md">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
};

const NavItem = ({ label, href = "#", hasChildren = false }) => {
  return (
    <div className="relative group">
      <a 
        href={href} 
        className="font-medium tracking-wide hover:text-gold-600 transition-colors flex items-center"
      >
        {label}
        {hasChildren && <ChevronDown className="ml-1" size={16} />}
      </a>
    </div>
  );
};

export default Header;
