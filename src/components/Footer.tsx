
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl mb-4">Fancy Moissanite</h3>
            <p className="text-neutral-400 mb-6">
              Exquisite jewelry for those who appreciate beauty, quality and ethical luxury.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-gold-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-gold-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-gold-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-gold-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-gold-600 transition-colors">Rings</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-gold-600 transition-colors">Necklaces</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-gold-600 transition-colors">Earrings</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-gold-600 transition-colors">Bracelets</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-gold-600 transition-colors">Collections</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-gold-600 transition-colors">Our Story</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-gold-600 transition-colors">Moissanite Education</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-gold-600 transition-colors">Sustainability</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-gold-600 transition-colors">Blog</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-gold-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Newsletter</h3>
            <p className="text-neutral-400 mb-4">
              Subscribe to receive updates on new collections and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-neutral-800 flex-1 px-4 py-2 text-white outline-none rounded-l-md"
              />
              <button className="bg-gold-600 text-white px-4 py-2 rounded-r-md hover:bg-gold-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <hr className="border-neutral-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-neutral-400 text-sm">
            &copy; {currentYear} Fancy Moissanite. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="text-neutral-400 text-sm hover:text-gold-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-neutral-400 text-sm hover:text-gold-600 transition-colors">Terms of Service</a>
            <a href="#" className="text-neutral-400 text-sm hover:text-gold-600 transition-colors">Shipping</a>
          </div>
          
          <div className="flex items-center text-neutral-400 text-sm">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-pink-400" />
            <span>by Fancy Moissanite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
