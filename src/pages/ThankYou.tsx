
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Package, Printer, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ThankYou = () => {
  // Mock order details
  const orderDetails = {
    id: "FM-876543",
    date: new Date().toLocaleDateString(),
    total: "$1,299.00",
    items: [
      { name: "Diamond Engagement Ring", price: "$999.00", quantity: 1 },
      { name: "Silver Bracelet", price: "$300.00", quantity: 1 }
    ],
    shipping: {
      method: "Express Shipping",
      address: "123 Main Street, New York, NY 10001",
      cost: "$0.00"
    },
    payment: {
      method: "Cash on Delivery",
      status: "Pending"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Success banner */}
            <div className="bg-green-50 p-8 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle size={64} className="text-green-500 mb-4" />
              </motion.div>
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-green-700 mb-2">Thank You for Your Order!</h1>
              <p className="text-green-600 max-w-md mx-auto">
                Your order has been placed successfully. We'll send you a confirmation email shortly.
              </p>
            </div>
            
            {/* Order summary */}
            <div className="p-6 md:p-8 border-b border-neutral-200">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <div>
                  <h2 className="font-serif text-2xl mb-1">Order #{orderDetails.id}</h2>
                  <p className="text-neutral-500">Placed on {orderDetails.date}</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Printer size={16} className="mr-1" /> Print
                  </Button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Order items */}
                <div>
                  <h3 className="font-medium mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {orderDetails.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>
                          {item.name} <span className="text-neutral-500">× {item.quantity}</span>
                        </span>
                        <span className="font-medium">{item.price}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-neutral-200 flex justify-between font-medium">
                      <span>Total</span>
                      <span>{orderDetails.total}</span>
                    </div>
                  </div>
                </div>
                
                {/* Shipping info */}
                <div>
                  <h3 className="font-medium mb-3">Shipping Details</h3>
                  <p className="text-sm mb-1">{orderDetails.shipping.method}</p>
                  <p className="text-sm text-neutral-500 whitespace-pre-line">{orderDetails.shipping.address}</p>
                  
                  <h3 className="font-medium mt-6 mb-3">Payment Information</h3>
                  <p className="text-sm mb-1">{orderDetails.payment.method}</p>
                  <p className="text-sm text-neutral-500">Status: {orderDetails.payment.status}</p>
                </div>
              </div>
            </div>
            
            {/* Order tracking */}
            <div className="p-6 md:p-8 bg-neutral-50">
              <h3 className="font-medium mb-4">Track Your Order</h3>
              <div className="relative">
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-neutral-200"></div>
                
                {/* Tracking steps */}
                <div className="space-y-8">
                  <div className="relative pl-8">
                    <div className="absolute left-0 w-4 h-4 rounded-full bg-green-500 border-4 border-green-100"></div>
                    <h4 className="font-medium">Order Confirmed</h4>
                    <p className="text-sm text-neutral-500">We've received your order</p>
                  </div>
                  
                  <div className="relative pl-8">
                    <div className="absolute left-0 w-4 h-4 rounded-full bg-neutral-300 border-4 border-neutral-100"></div>
                    <h4 className="font-medium text-neutral-500">Processing</h4>
                    <p className="text-sm text-neutral-500">We're preparing your order</p>
                  </div>
                  
                  <div className="relative pl-8">
                    <div className="absolute left-0 w-4 h-4 rounded-full bg-neutral-300 border-4 border-neutral-100"></div>
                    <h4 className="font-medium text-neutral-500">Shipped</h4>
                    <p className="text-sm text-neutral-500">Your order is on its way</p>
                  </div>
                  
                  <div className="relative pl-8">
                    <div className="absolute left-0 w-4 h-4 rounded-full bg-neutral-300 border-4 border-neutral-100"></div>
                    <h4 className="font-medium text-neutral-500">Delivered</h4>
                    <p className="text-sm text-neutral-500">Your order has been delivered</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="p-6 flex flex-col md:flex-row justify-center gap-4">
              <Button asChild variant="outline" className="flex items-center">
                <Link to="/shop">
                  <ArrowLeft size={16} className="mr-1" /> Continue Shopping
                </Link>
              </Button>
              <Button asChild className="bg-gold-600 hover:bg-gold-700">
                <Link to="/">
                  <Home size={16} className="mr-1" /> Go to Homepage
                </Link>
              </Button>
              <Button asChild className="bg-green-500 hover:bg-green-600">
                <Link to="/contact">
                  Contact Support
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThankYou;
