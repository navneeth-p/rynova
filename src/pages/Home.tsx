import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Shield, Leaf, HomeIcon, BrickWall, Bath, CookingPot, Droplets, ArrowUpDown, Sun, Store } from 'lucide-react';
import SEO from '../components/common/SEO';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <SEO
        title="Home"
        description="Rynova - Premium microcement solutions for floors, walls, and surfaces. Transform your space with our innovative products and expert installation services in Dubai, UAE."
      />
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/images/Homepage_Logo.webp"
            alt="Luxury microcement interior design"
            className="w-full h-full object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transform Your Space with Premium Microcement
            </h1>
            <p className="text-xl text-neutral-100 mb-8">
              Experience the perfect blend of durability and elegance with our innovative microcement solutions. 
              From floors to walls, we bring your vision to life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/get-quote"
                className="px-8 py-3 bg-accent-600 text-white rounded-md hover:bg-accent-700 transition-colors duration-300 flex items-center gap-2"
              >
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/products"
                className="px-8 py-3 border-2 border-white text-white rounded-md hover:bg-white/10 transition-colors duration-300"
              >
                Discover Our Range of Products
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Why Choose Our Microcement?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Our premium microcement solutions offer unmatched quality and versatility for your space.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-neutral-50 dark:bg-neutral-700 p-6 rounded-lg"
            >
              <Shield className="w-12 h-12 text-accent-600 dark:text-accent-400 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                Superior Durability
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Engineered to withstand heavy foot traffic and daily wear while maintaining its pristine appearance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-neutral-50 dark:bg-neutral-700 p-6 rounded-lg"
            >
              <Palette className="w-12 h-12 text-accent-600 dark:text-accent-400 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                Endless Design Options
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Customize your space with a wide range of colors, textures, and finishes to match your style.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-neutral-50 dark:bg-neutral-700 p-6 rounded-lg"
            >
              <Leaf className="w-12 h-12 text-accent-600 dark:text-accent-400 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                Eco-Friendly
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Environmentally conscious materials and sustainable installation practices.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Where Can You Use Microcement?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Our versatile microcement solutions can transform any space in your home or business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
                         

              { icon: HomeIcon, title: 'Floors', description: 'Durable and stylish flooring solutions' },
              { icon: BrickWall, title: 'Walls', description: 'Seamless wall coatings' },
              { icon: Bath, title: 'Bathrooms', description: 'Water-resistant bathroom surfaces' },
              { icon: CookingPot, title: 'Kitchens', description: 'Modern kitchen countertops and backsplashes' },
              { icon: Droplets, title: 'Pool', description: 'Premium waterproof and slip-resistant surfaces' },
              { icon: ArrowUpDown, title: 'Stairs', description: 'Elegant and slip-resistant stair surfaces' },
              { icon: Sun, title: 'Outdoor Spaces', description: 'Weather-resistant patios and terraces' },
              { icon: Store, title: 'Showrooms', description: 'Sophisticated commercial display areas' },

            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                viewport={{ once: true }}
                className="bg-white dark:bg-neutral-800 p-6 rounded-lg text-center"
              >
                <item.icon className="w-12 h-12 text-accent-600 dark:text-accent-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's make your space unforgettable!
            </h2>
            <p className="text-xl text-accent-100 mb-8 max-w-2xl mx-auto">
              Get your personalized design assessment today—our design gurus will decode your space, craft a tailored solution, and transform your vision into a precise quote.
            </p>
            <Link
              to="/get-quote"
              className="inline-block px-8 py-3 bg-white text-accent-700 rounded-md hover:bg-accent-100 transition-colors duration-300"
            >
              Get a Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;