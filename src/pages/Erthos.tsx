import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Shield, Droplet, Star, Brush, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

// Custom color scheme for Erthos
const erthosColors = {
  gray: '#8C8C8C',
  darkGray: '#1A1A1A',
  lightGray: '#B8B8B8'
};

const Erthos: React.FC = () => {
  // Find the Erthos product data
  const erthosData = products.find(product => product.id === 'erthos');

  if (!erthosData) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  // Define features with icons for the Features section
  const featuresWithIcons = [
    { icon: Shield, title: 'Ultra-high durability', description: 'Engineered to withstand heavy traffic and daily wear while maintaining its pristine appearance.' },
    { icon: Droplet, title: 'Water-resistant', description: 'Perfect for bathrooms, kitchens, and other areas where moisture resistance is essential.' },
    { icon: Star, title: 'Seamless application', description: 'Creates a continuous surface without joints or seams, for a modern, elegant look.' },
    { icon: Brush, title: 'Aesthetic versatility', description: 'Available in a wide range of colors and finishes to match any design vision.' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fff', color: erthosColors.darkGray }}>
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img
            src={erthosData.image}
            alt={erthosData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${erthosColors.darkGray}cc, ${erthosColors.darkGray}66)` }} />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {erthosData.name}
            </h1>
            <p className="text-xl mb-8" style={{ color: erthosColors.lightGray }}>
              {erthosData.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/get-quote"
                className="px-8 py-3 text-white rounded-md transition-colors duration-300 flex items-center gap-2 hover:brightness-90"
                style={{ backgroundColor: erthosColors.gray }}
              >
                Get Quote for {erthosData.name}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20" style={{ backgroundColor: '#fff' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: erthosColors.darkGray }}>
              Key Features of {erthosData.name}
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: erthosColors.gray }}>
              Discover why {erthosData.name} is the premium choice for modern microcement applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuresWithIcons.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                viewport={{ once: true }}
                className="p-6 rounded-lg flex items-start gap-4"
                style={{ backgroundColor: '#f5f5f5' }}
              >
                <feature.icon className="w-12 h-12 flex-shrink-0" style={{ color: erthosColors.gray }} />
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: erthosColors.darkGray }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: erthosColors.gray }}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs Section */}
      <section className="py-20" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: erthosColors.darkGray }}>
              Technical Specifications
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: erthosColors.gray }}>
              Engineering excellence behind {erthosData.name} microcement system
            </p>
          </motion.div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(erthosData.technicalSpecs).map(([key, value], index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="p-4 rounded-md"
                  style={{ backgroundColor: '#fff', border: `1px solid ${erthosColors.lightGray}` }}
                >
                  <h3 className="text-sm font-medium mb-1" style={{ color: erthosColors.gray }}>{key}</h3>
                  <p className="text-lg font-semibold" style={{ color: erthosColors.darkGray }}>{value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20" style={{ backgroundColor: '#fff' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: erthosColors.darkGray }}>
              Applications
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: erthosColors.gray }}>
              Versatile uses for {erthosData.name} microcement in various environments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {erthosData.applications.map((application, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="p-4 rounded-lg flex items-center gap-3"
                style={{ backgroundColor: '#f5f5f5' }}
              >
                <Check className="h-6 w-6 flex-shrink-0" style={{ color: erthosColors.gray }} />
                <span className="font-medium" style={{ color: erthosColors.darkGray }}>{application}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white" style={{ backgroundColor: erthosColors.darkGray }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Space with {erthosData.name}?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: erthosColors.lightGray }}>
              Get in touch with us for a free consultation and quote. Our experts are here to help bring your vision to life.
            </p>
            <Link
              to="/get-quote"
              className="inline-block px-8 py-3 rounded-md transition-colors duration-300"
              style={{ backgroundColor: erthosColors.gray, color: '#fff' }}
            >
              Get Your Free Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Erthos; 