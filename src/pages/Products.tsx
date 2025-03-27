import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import { Check, ChevronDown, ArrowRight, CheckCircle2, Shield, Leaf, Award, Droplet, Sun, Palette, HomeIcon, BrickWall, Bath, CookingPot, Droplets, ArrowUpDown, Store } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import SEO from '../components/common/SEO';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface ApplicationStep {
  title: string;
  description: string;
}

const applicationSteps: ApplicationStep[] = [
  {
    title: "Initial Consultation",
    description: "We meet with you to understand your project requirements and provide expert guidance."
  },
  {
    title: "Surface Assessment",
    description: "Our team evaluates the surface condition and determines the best preparation method."
  },
  {
    title: "Surface Preparation",
    description: "We thoroughly clean and prepare the surface to ensure optimal adhesion."
  },
  {
    title: "Primer Application",
    description: "A specialized primer is applied to enhance bonding and prevent moisture issues."
  },
  {
    title: "Base Layer",
    description: "The first layer of microcement is applied and leveled to create a smooth foundation."
  },
  {
    title: "Finish Layer",
    description: "The final decorative layer is applied with your chosen color and texture."
  },
  {
    title: "Sealing",
    description: "Multiple coats of sealer are applied to protect and enhance the finish."
  },
  {
    title: "Final Inspection",
    description: "We conduct a thorough quality check to ensure perfect results."
  }
];

const ApplicationStep = ({ step, index }: { step: ApplicationStep; index: number }) => {
  const isEven = index % 2 === 1; // Even numbers will be on the right

  return (
    <motion.div
      variants={staggerContainer}
      className="relative flex items-center min-h-[100px] py-8"
    >
      {/* Content container */}
      {isEven ? <div className="w-1/2"></div> : null}
      <div 
        className={`w-1/2 ${isEven ? 'pl-8' : 'pr-8 text-right'}`}
      >
        <h3 className="text-xl font-semibold text-accent-600 dark:text-accent-400 mb-2">{step.title}</h3>
        <p className="text-neutral-600 dark:text-neutral-300">{step.description}</p>
      </div>
      {/* Center line and number */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className="w-10 h-10 bg-accent-500 dark:bg-accent-600 rounded-full flex items-center justify-center text-white font-bold relative z-10">
          {index + 1}
        </div>
      </div>
    </motion.div>
  );
};

interface FAQ {
  question: string;
  answer: string;
}

interface TechnicalSpec {
  [key: string]: string | undefined;
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  applications: string[];
  technicalSpecs: TechnicalSpec;
}

// Reusable FAQ Item Component
const FAQItem = ({ faq, isOpen, toggle }: { faq: FAQ; isOpen: boolean; toggle: () => void }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
    <button
      className="flex justify-between items-center w-full p-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50"
      onClick={toggle}
      aria-expanded={isOpen}
    >
      <span className="font-medium text-gray-900">{faq.question}</span>
      <ChevronDown 
        className={`w-5 h-5 text-accent-600 transition-transform duration-300 ${
          isOpen ? 'transform rotate-180' : ''
        }`}
      />
    </button>
    <div 
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="p-5 bg-gray-50 border-t border-gray-200">
        <p className="text-gray-600">{faq.answer}</p>
      </div>
    </div>
  </div>
);

// Product Feature Item Component
const FeatureItem = ({ feature }: { feature: string }) => (
  <li className="flex items-center bg-white p-2 rounded-md shadow-sm transition-all duration-200 hover:shadow-md hover:bg-accent-50 transform hover:-translate-y-1">
    <Check className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0" />
    <span className="text-gray-700">{feature}</span>
  </li>
);

// Technical Specification Component
const TechnicalSpecItem = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white p-3 rounded-md shadow-sm transition-all duration-200 hover:shadow-md hover:bg-gray-50">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="text-base font-semibold text-gray-900 mt-1">{value}</dd>
  </div>
);

// Product Card Component
const ProductCard = ({ product, isLastItem, isVisible }: { product: Product; isLastItem: boolean; isVisible: boolean }) => (
  <div
    id={product.id}
    className={`scroll-mt-24 mb-24 transition-all duration-700 ${
      !isLastItem ? 'border-b border-neutral-200 pb-24' : ''
    } ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div className="group">
        <div className="overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">{product.name}</h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-lg">{product.description}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center text-neutral-900 dark:text-white">
            <span className="bg-accent-100 dark:bg-accent-900 w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <Check className="h-5 w-5 text-accent-600 dark:text-accent-400" />
            </span>
            Key Features
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center bg-neutral-50 dark:bg-neutral-800 p-3 rounded-md">
                <Check className="h-5 w-5 text-accent-600 dark:text-accent-400 mr-2 flex-shrink-0" />
                <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center text-neutral-900 dark:text-white">
            <span className="bg-accent-100 dark:bg-accent-900 w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <Check className="h-5 w-5 text-accent-600 dark:text-accent-400" />
            </span>
            Technical Specifications
          </h3>
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.technicalSpecs).map(([key, value]) => (
                <div key={key} className="bg-white dark:bg-neutral-700 p-3 rounded-md">
                  <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{key}</dt>
                  <dd className="text-base font-semibold text-neutral-900 dark:text-white mt-1">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center text-neutral-900 dark:text-white">
            <span className="bg-accent-100 dark:bg-accent-900 w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <Check className="h-5 w-5 text-accent-600 dark:text-accent-400" />
            </span>
            Applications
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.applications.map((application, index) => (
              <li key={index} className="flex items-center bg-neutral-50 dark:bg-neutral-800 p-3 rounded-md">
                <Check className="h-5 w-5 text-accent-600 dark:text-accent-400 mr-2 flex-shrink-0" />
                <span className="text-neutral-700 dark:text-neutral-300">{application}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default function Products() {
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [visibleProducts, setVisibleProducts] = useState<Set<string>>(new Set());

  const scrollToProduct = (productId: string) => {
    setActiveProduct(productId);
    const element = document.getElementById(productId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleProducts((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    products.forEach((product) => {
      const element = document.getElementById(product.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <SEO
        title="Our Products"
        description="Explore Rynova's premium microcement products. From flooring to wall coatings, discover our innovative solutions for residential and commercial spaces in Dubai and UAE."
      />
      {/* Hero Section */}
      <div className="bg-white dark:bg-neutral-800 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Our Premium Microcement Products
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Discover our range of high-quality microcement solutions designed to transform your space with style and durability.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Products Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => scrollToProduct(product.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeProduct === product.id
                  ? 'bg-accent-600 text-white'
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-accent-50 dark:hover:bg-accent-900'
              }`}
            >
              {product.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products List */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-12"
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isLastItem={index === products.length - 1}
              isVisible={visibleProducts.has(product.id)}
            />
          ))}
        </motion.div>
      </div>

      {/* Application Steps Section */}
      <div className="bg-white dark:bg-neutral-800 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
              The Application Process
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Our expert team follows a meticulous process to ensure perfect results every time.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-accent-200 dark:bg-accent-800 transform -translate-x-1/2"></div>
            
            {/* Steps */}
            {applicationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="application-step mb-8"
              >
                <ApplicationStep step={step} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-accent-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-accent-100 mb-8 max-w-2xl mx-auto">
              Get in touch with us for a free consultation and quote. Our experts are here to help bring your vision to life.
            </p>
            <Link
              to="/get-quote"
              className="inline-block px-8 py-3 bg-white text-accent-700 rounded-md hover:bg-accent-100 transition-colors duration-300"
            >
              Get Your Free Quote
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}