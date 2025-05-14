
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Check, CreditCard, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock cart items for demonstration
const cartItems = [
  {
    id: 1,
    name: "Amore' – Matte Moissanite Engagement Ring",
    image: "https://fancymoissanite.com/wp-content/uploads/ancy-2.png",
    price: 200,
    quantity: 1,
    options: {
      material: "White Gold",
      size: "6"
    }
  },
  {
    id: 2,
    name: "Promessa - I love You Ring",
    image: "https://fancymoissanite.com/wp-content/uploads/product149.webp",
    price: 350,
    quantity: 1,
    options: {
      material: "Rose Gold",
      size: "7"
    }
  }
];

interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: string;
  sameShippingAddress: boolean;
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  shippingCountry: string;
  notes: string;
}

const Checkout = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<'information' | 'payment'>('information');
  const [sameAsShipping, setSameAsShipping] = useState(true);
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15;
  const tax = subtotal * 0.08; // 8% tax for example
  const total = subtotal + shipping + tax;
  
  const form = useForm<CheckoutFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      paymentMethod: 'card',
      sameShippingAddress: true,
      shippingFirstName: '',
      shippingLastName: '',
      shippingAddress: '',
      shippingCity: '',
      shippingState: '',
      shippingZipCode: '',
      shippingCountry: '',
      notes: '',
    }
  });
  
  const onSubmit = (data: CheckoutFormValues) => {
    if (step === 'information') {
      setStep('payment');
    } else {
      toast({
        title: "Order Placed",
        description: "Thank you for your order. We will contact you shortly.",
      });
      
      console.log("Order submitted:", data);
      // Here you would typically send the order to your backend
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    form.setValue('paymentMethod', method);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto mt-32 mb-10 px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-8">Checkout</h1>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              {/* Steps */}
              <div className="flex border-b border-neutral-200">
                <button 
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    step === 'information' 
                      ? 'bg-gold-50 text-gold-800 border-b-2 border-gold-600' 
                      : 'text-neutral-600'
                  }`}
                  onClick={() => setStep('information')}
                >
                  1. Information
                </button>
                <button 
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    step === 'payment' 
                      ? 'bg-gold-50 text-gold-800 border-b-2 border-gold-600' 
                      : 'text-neutral-600'
                  }`}
                  disabled={step === 'information'}
                >
                  2. Payment
                </button>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
                  {step === 'information' ? (
                    <>
                      <h2 className="font-serif text-xl font-medium mb-4">Contact Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <h2 className="font-serif text-xl font-medium mb-4">Billing Address</h2>
                      
                      <div className="grid grid-cols-1 gap-4 mb-6">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main St." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="New York" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State / Province</FormLabel>
                                <FormControl>
                                  <Input placeholder="NY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postal / Zip Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="10001" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                  <Input placeholder="United States" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex items-center mb-4">
                          <input
                            type="checkbox" 
                            id="sameAsShipping"
                            checked={sameAsShipping}
                            onChange={() => setSameAsShipping(!sameAsShipping)}
                            className="h-4 w-4 rounded border-neutral-300 text-gold-600 focus:ring-gold-600"
                          />
                          <Label htmlFor="sameAsShipping" className="ml-2">
                            Shipping address same as billing
                          </Label>
                        </div>
                        
                        {!sameAsShipping && (
                          <>
                            <h2 className="font-serif text-xl font-medium mb-4">Shipping Address</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <FormField
                                control={form.control}
                                name="shippingFirstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="shippingLastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4">
                              <FormField
                                control={form.control}
                                name="shippingAddress"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                      <Input placeholder="123 Main St." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="shippingCity"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>City</FormLabel>
                                      <FormControl>
                                        <Input placeholder="New York" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="shippingState"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>State / Province</FormLabel>
                                      <FormControl>
                                        <Input placeholder="NY" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="shippingZipCode"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Postal / Zip Code</FormLabel>
                                      <FormControl>
                                        <Input placeholder="10001" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="shippingCountry"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Country</FormLabel>
                                      <FormControl>
                                        <Input placeholder="United States" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem className="mb-6">
                            <FormLabel>Order Notes (optional)</FormLabel>
                            <FormControl>
                              <textarea 
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[100px]"
                                placeholder="Special instructions for delivery..." 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="mt-6 flex justify-end">
                        <Button type="submit" className="bg-gold-600 hover:bg-gold-700 px-8 py-6">
                          Continue to Payment
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="font-serif text-xl font-medium mb-4">Payment Method</h2>
                      
                      <div className="flex flex-col gap-4 mb-6">
                        <div
                          className={`flex items-center border rounded-lg p-4 cursor-pointer transition-colors ${
                            form.watch('paymentMethod') === 'card' 
                              ? 'border-gold-600 bg-gold-50' 
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                          onClick={() => handlePaymentMethodChange('card')}
                        >
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                            form.watch('paymentMethod') === 'card' 
                              ? 'border-gold-600' 
                              : 'border-neutral-400'
                          }`}>
                            {form.watch('paymentMethod') === 'card' && (
                              <div className="w-3 h-3 rounded-full bg-gold-600" />
                            )}
                          </div>
                          <CreditCard className="h-5 w-5 mr-2 text-neutral-500" />
                          <div>Credit / Debit Card</div>
                        </div>
                        
                        <div
                          className={`flex items-center border rounded-lg p-4 cursor-pointer transition-colors ${
                            form.watch('paymentMethod') === 'cod' 
                              ? 'border-gold-600 bg-gold-50' 
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                          onClick={() => handlePaymentMethodChange('cod')}
                        >
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                            form.watch('paymentMethod') === 'cod' 
                              ? 'border-gold-600' 
                              : 'border-neutral-400'
                          }`}>
                            {form.watch('paymentMethod') === 'cod' && (
                              <div className="w-3 h-3 rounded-full bg-gold-600" />
                            )}
                          </div>
                          <Check className="h-5 w-5 mr-2 text-neutral-500" />
                          <div>Cash on Delivery</div>
                        </div>
                        
                        {form.watch('paymentMethod') === 'card' && (
                          <div className="mt-4 border border-neutral-200 rounded-lg p-6 bg-neutral-50">
                            <h3 className="font-medium mb-4">Enter Card Details</h3>
                            
                            <div className="grid gap-4">
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="1234 5678 9012 3456" />
                                </FormControl>
                              </FormItem>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <FormItem>
                                  <FormLabel>Expiration Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MM/YY" />
                                  </FormControl>
                                </FormItem>
                                
                                <FormItem>
                                  <FormLabel>CVC</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123" />
                                  </FormControl>
                                </FormItem>
                              </div>
                              
                              <FormItem>
                                <FormLabel>Name on Card</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" />
                                </FormControl>
                              </FormItem>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-8 flex flex-col md:flex-row gap-3 justify-between">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setStep('information')}
                          className="order-2 md:order-1"
                        >
                          Back to Information
                        </Button>
                        
                        <div className="flex gap-3 order-1 md:order-2">
                          <Button type="submit" className="bg-gold-600 hover:bg-gold-700">
                            <Check className="mr-2" size={18} />
                            Place Order
                          </Button>
                          
                          <Button type="button" className="bg-green-600 hover:bg-green-700">
                            <MessageSquare className="mr-2" size={18} />
                            Order Through Chat
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </form>
              </Form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden sticky top-24">
              <div className="p-4 border-b border-neutral-200 bg-neutral-50">
                <h2 className="font-serif font-medium">Order Summary</h2>
              </div>
              
              <div className="p-4">
                {/* Cart items */}
                <div className="mb-4 max-h-[300px] overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex py-3 border-b border-neutral-100">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 ml-3">
                        <h3 className="font-medium text-sm text-neutral-800 line-clamp-1">{item.name}</h3>
                        
                        <div className="mt-1 text-xs text-neutral-500">
                          {Object.entries(item.options).map(([key, value]) => (
                            <div key={key}>
                              <span className="capitalize">{key}:</span> {value}
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-1 flex justify-between items-center">
                          <span className="text-sm font-medium">${item.price.toFixed(2)}</span>
                          <span className="text-xs text-neutral-500">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-2 mt-2 flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="text-lg font-semibold text-gold-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
