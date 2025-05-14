
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryBar from '@/components/CategoryBar';
import { Button } from '@/components/ui/button';

// Team member data
const teamMembers = [
  {
    name: "Sarah Johnson",
    position: "Founder & Lead Designer",
    image: "https://i.pravatar.cc/300?img=1",
    bio: "With over 15 years in luxury jewelry design, Sarah's vision and creativity have shaped our unique collections."
  },
  {
    name: "Michael Chen",
    position: "Master Jeweler",
    image: "https://i.pravatar.cc/300?img=2",
    bio: "Michael brings traditional craftsmanship to modern designs, ensuring every piece meets our exacting standards."
  },
  {
    name: "Emily Williams",
    position: "Gemologist",
    image: "https://i.pravatar.cc/300?img=3",
    bio: "Emily's expertise in selecting and grading stones ensures we use only the finest materials in our creations."
  },
  {
    name: "David Park",
    position: "Customer Experience Director",
    image: "https://i.pravatar.cc/300?img=4",
    bio: "David ensures every customer interaction reflects our commitment to exceptional service and satisfaction."
  }
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar />
      
      <main className="container mx-auto mt-32 mb-10 px-4">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-5xl font-semibold mb-4"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-600 text-lg"
          >
            Crafting beauty, creating memories, and celebrating life's special moments through exquisite jewelry since 2010.
          </motion.p>
        </div>
        
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://fancymoissanite.com/wp-content/uploads/Fancy.png" 
              alt="Our workshop" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl font-medium mb-4">The Art of Craftsmanship</h2>
            <p className="text-neutral-600 mb-4 leading-relaxed">
              Fancy Moissanite began with a simple yet profound vision: to create jewelry that captures moments and emotions, transforming them into tangible symbols of love, commitment, and celebration.
            </p>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              We started in a small workshop with just three artisans dedicated to creating unique pieces that blend traditional craftsmanship with contemporary design. Today, we've grown into a team of passionate designers and jewelers, but our commitment to quality and personal touch remains unchanged.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gold-50 p-4 rounded-lg text-center">
                <div className="font-serif text-3xl font-medium text-gold-600 mb-1">15+</div>
                <div className="text-sm text-neutral-600">Years of Experience</div>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg text-center">
                <div className="font-serif text-3xl font-medium text-pink-600 mb-1">10k+</div>
                <div className="text-sm text-neutral-600">Happy Customers</div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-medium mb-4">Our Values</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              These core principles guide everything we do, from design to customer service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-600">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <h3 className="font-medium text-xl mb-2">Quality Excellence</h3>
              <p className="text-neutral-600">
                We select only the finest materials and maintain rigorous standards throughout our creation process.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-600">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 8.5C16 8.5 14.5 7 12 7C9.5 7 8 8.5 8 8.5" />
                  <path d="M8.5 15.5c1.73-.83 3.476-1.25 7-1 .5 0 .5 2 0 2-.34 0-3 0-3.5-.5-.5-.5-.5-1.5 0-2 1.414-1.414 2.5 0 2.5 0" />
                </svg>
              </div>
              <h3 className="font-medium text-xl mb-2">Ethical Sourcing</h3>
              <p className="text-neutral-600">
                We are committed to ethical practices, ensuring our materials are responsibly sourced and sustainable.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-600">
                  <path d="M12 2v7.5" />
                  <path d="m4.24 18.5 4.33-2.5" />
                  <path d="m15.43 16 4.33 2.5" />
                  <path d="M19.07 7.57 15.43 10" />
                  <path d="m4.93 7.57 3.64 2.43" />
                  <path d="M12 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                  <path d="M12 13.5V12" />
                </svg>
              </div>
              <h3 className="font-medium text-xl mb-2">Innovative Design</h3>
              <p className="text-neutral-600">
                We blend traditional techniques with modern aesthetics to create pieces that are timeless yet contemporary.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-medium mb-4">Meet Our Team</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              The talented individuals who bring our vision to life, each contributing their expertise and passion.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-lg overflow-hidden border border-neutral-200"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-60 object-cover object-center"
                />
                <div className="p-4 text-center">
                  <h3 className="font-medium text-lg mb-1">{member.name}</h3>
                  <div className="text-gold-600 text-sm mb-3">{member.position}</div>
                  <p className="text-neutral-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 bg-pink-50 rounded-lg p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-medium mb-4">What Our Customers Say</h2>
            <div className="h-1 w-16 bg-gold-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm relative">
              <div className="font-serif text-gold-600 text-4xl absolute -top-4 -left-2">"</div>
              <p className="text-neutral-600 mb-4">
                My engagement ring from Fancy Moissanite is absolutely stunning! The craftsmanship is exceptional, and the moissanite stone sparkles like nothing I've ever seen. I receive compliments everywhere I go.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://i.pravatar.cc/300?img=5" 
                    alt="Customer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">Rebecca Lawson</div>
                  <div className="text-xs text-neutral-500">Los Angeles, CA</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm relative">
              <div className="font-serif text-gold-600 text-4xl absolute -top-4 -left-2">"</div>
              <p className="text-neutral-600 mb-4">
                The custom anniversary band that Fancy Moissanite created for us perfectly captured the sentiment we wanted. Their attention to detail and willingness to work with our ideas made the process so special.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://i.pravatar.cc/300?img=6" 
                    alt="Customer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">Marcus & Julia Bennett</div>
                  <div className="text-xs text-neutral-500">Chicago, IL</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center border border-gold-200 rounded-lg p-8 md:p-12 bg-gradient-to-r from-gold-50 to-pink-50"
        >
          <h2 className="font-serif text-3xl font-medium mb-4">Visit Our Showroom</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-6">
            Experience our collections in person and let our experts help you find the perfect piece. We'd love to welcome you to our space.
          </p>
          <Button className="bg-gold-600 hover:bg-gold-700">
            Contact Us
          </Button>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
