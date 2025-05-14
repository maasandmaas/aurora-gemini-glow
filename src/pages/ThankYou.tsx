
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Mail, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ThankYou = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock order data - in a real app, this would come from context/state
  const orderNumber = "FM" + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-gold-500 to-gold-600 text-white py-12 text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 drop-shadow-md" />
              <h1 className="text-3xl font-serif mb-2">Thank You For Your Order!</h1>
              <p className="text-gold-100">Your order has been received and is being processed</p>
            </div>
            
            <div className="p-8">
              <div className="bg-neutral-50 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-neutral-500 text-sm mb-1">Order Number</p>
                    <p className="font-medium text-lg">{orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 text-sm mb-1">Date</p>
                    <p className="font-medium text-lg">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 text-sm mb-1">Total</p>
                    <p className="font-medium text-lg text-gold-700">$1,238.00</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <h2 className="text-xl font-medium mb-4">Order Details</h2>
                
                <div className="border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-neutral-100">
                      <img 
                        src="https://fancymoissanite.com/wp-content/uploads/ancy-2.png"
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Amore' Moissanite Ring</h3>
                      <p className="text-sm text-neutral-500">Silver, Size 7</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$699.00</p>
                      <p className="text-sm text-neutral-500">Qty: 1</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-neutral-100">
                      <img 
                        src="https://fancymoissanite.com/wp-content/uploads/Fancy.png"
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Eternity Band</h3>
                      <p className="text-sm text-neutral-500">Gold, Size 7</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$539.00</p>
                      <p className="text-sm text-neutral-500">Qty: 1</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-500">Subtotal</span>
                    <span>$1,238.00</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-500">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t">
                    <span>Total</span>
                    <span className="text-gold-700">$1,238.00</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-medium mb-3">Shipping Address</h3>
                  <address className="not-italic text-neutral-600">
                    Jane Doe<br />
                    123 Jewelry Lane<br />
                    New York, NY 10001<br />
                    United States
                  </address>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Payment Method</h3>
                  <p className="text-neutral-600">Cash on Delivery</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-8">
                <h3 className="font-medium mb-3">What Happens Next?</h3>
                <p className="text-neutral-600">
                  We're preparing your order for shipment. You'll receive an email confirmation with tracking information once your package is on its way.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/shop" className="flex items-center justify-center gap-2 bg-white border border-neutral-200 hover:border-gold-500 text-neutral-800 px-6 py-3 rounded-md transition-colors">
                  <ShoppingBag size={18} /> Continue Shopping
                </Link>
                <Link to="/" className="flex items-center justify-center gap-2 bg-white border border-neutral-200 hover:border-gold-500 text-neutral-800 px-6 py-3 rounded-md transition-colors">
                  <Home size={18} /> Back to Home
                </Link>
                <Link to="/contact" className="flex items-center justify-center gap-2 bg-gold-600 hover:bg-gold-700 text-white px-6 py-3 rounded-md transition-colors">
                  <Mail size={18} /> Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThankYou;
