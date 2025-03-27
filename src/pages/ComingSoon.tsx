import React from 'react';
import { motion } from 'framer-motion';
import { GiCookingPot, GiChemicalDrop, GiMaterialsScience } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/common/SEO';

const ComingSoon: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <SEO
        title="Coming Soon"
        description="Something exciting is in the works at Rynova. Stay tuned for our upcoming features and services in Dubai and UAE."
      />
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-accent-700 to-accent-500 py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          {/* Animated bubbles in background */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
              }}
              animate={{
                y: [-20, 20],
                x: [-10, 10],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Something Amazing is Brewing! 🧪
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Our innovation lab is cooking up the next generation of surface solutions.
              Stay tuned for something spectacular!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
              What's in the Works?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: GiCookingPot,
                title: "New Formulas",
                description: "Our chemists are perfecting revolutionary surface treatments that will change the game."
              },
              {
                icon: GiChemicalDrop,
                title: "Enhanced Properties",
                description: "Expect even better durability, aesthetics, and eco-friendliness in our upcoming products."
              },
              {
                icon: GiMaterialsScience,
                title: "Innovation First",
                description: "We're pushing the boundaries of what's possible in surface technology."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-neutral-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <feature.icon className="w-12 h-12 text-accent-600 dark:text-accent-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent-600 hover:bg-accent-700 transition-colors duration-300"
            >
              Check Out Our Current Products
            </Link>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-24 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
              Want to Be the First to Know? 🚀
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              Join our VIP list and be the first to hear about our new product launches!
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent-600 hover:bg-accent-700 transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon; 