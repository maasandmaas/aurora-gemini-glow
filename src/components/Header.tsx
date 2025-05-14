
import { useState, useEffect } from 'react';
import { ChevronDown, Search, ShoppingCart, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
            <Link 
              to="/" 
              className="font-serif text-xl md:text-2xl font-bold text-gold-600 tracking-wider"
            >
              FANCY MOISSANITE
            </Link>
          </div>

          {/* Main Navigation (Desktop) */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/" className="font-medium tracking-wide hover:text-gold-600 transition-colors p-2 text-sm">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium tracking-wide hover:text-gold-600 transition-colors p-2 text-sm bg-transparent hover:bg-transparent">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-lg border border-gold-100">
                  <div className="grid gap-3 p-4 w-[400px] md:w-[600px] lg:grid-cols-2">
                    <div>
                      <h4 className="font-serif text-lg font-medium mb-2 text-gold-600">Categories</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Link to="/shop/rings" className="text-sm p-2 hover:bg-gold-50 rounded-md">Rings</Link>
                        <Link to="/shop/necklaces" className="text-sm p-2 hover:bg-gold-50 rounded-md">Necklaces</Link>
                        <Link to="/shop/earrings" className="text-sm p-2 hover:bg-gold-50 rounded-md">Earrings</Link>
                        <Link to="/shop/bracelets" className="text-sm p-2 hover:bg-gold-50 rounded-md">Bracelets</Link>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <img 
                        src="https://fancymoissanite.com/wp-content/uploads/ancy-2.png" 
                        alt="Featured Collection" 
                        className="rounded-md h-full object-cover"
                      />
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium tracking-wide hover:text-gold-600 transition-colors p-2 text-sm bg-transparent hover:bg-transparent">
                  Collections
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-lg border border-gold-100">
                  <div className="grid gap-3 p-4 w-[400px] md:w-[600px] lg:grid-cols-2">
                    <div>
                      <h4 className="font-serif text-lg font-medium mb-2 text-gold-600">Our Collections</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Link to="/collections/wedding" className="text-sm p-2 hover:bg-gold-50 rounded-md">Wedding</Link>
                        <Link to="/collections/engagement" className="text-sm p-2 hover:bg-gold-50 rounded-md">Engagement</Link>
                        <Link to="/collections/anniversary" className="text-sm p-2 hover:bg-gold-50 rounded-md">Anniversary</Link>
                        <Link to="/collections/custom" className="text-sm p-2 hover:bg-gold-50 rounded-md">Custom</Link>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <img 
                        src="https://fancymoissanite.com/wp-content/uploads/Fancy.png" 
                        alt="Featured Collection" 
                        className="rounded-md h-full object-cover"
                      />
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/about" className="font-medium tracking-wide hover:text-gold-600 transition-colors p-2 text-sm">
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/contact" className="font-medium tracking-wide hover:text-gold-600 transition-colors p-2 text-sm">
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="hover:text-gold-600 transition-colors">
              <Search size={20} />
            </button>
            <Link to="/account" className="hover:text-gold-600 transition-colors">
              <User size={20} />
            </Link>
            <Link to="/wishlist" className="hover:text-gold-600 transition-colors relative">
              <Heart size={20} />
              <span className="absolute -top-1 -right-1 bg-pink-200 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/checkout" className="hover:text-gold-600 transition-colors relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-gold-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t mt-3 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link to="/" className="px-2 py-2 hover:bg-pink-50 rounded-md">Home</Link>
            <Link to="/shop" className="px-2 py-2 hover:bg-pink-50 rounded-md flex justify-between">
              Shop
              <ChevronDown size={18} />
            </Link>
            <Link to="/collections" className="px-2 py-2 hover:bg-pink-50 rounded-md flex justify-between">
              Collections
              <ChevronDown size={18} />
            </Link>
            <Link to="/about" className="px-2 py-2 hover:bg-pink-50 rounded-md">About</Link>
            <Link to="/contact" className="px-2 py-2 hover:bg-pink-50 rounded-md">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
