import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Search } from 'lucide-react';
import SEO from '../components/common/SEO';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  // Random fun messages about concrete/microcement
  const funMessages = [
    "Looks like this page has cracked under pressure!",
    "Oops! This page hasn't set properly.",
    "Sorry, we can't find that page - it must be smoothed over!",
    "This page seems to have dried up and gone away.",
    "404: Page not poured correctly.",
    "This area is still under construction.",
    "The path to this page isn't as seamless as our microcement.",
  ];
  
  // Randomly select one message
  const randomMessage = funMessages[Math.floor(Math.random() * funMessages.length)];
  
  // Go back functionality
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Please check the URL or return to the homepage."
      />
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-md w-full text-center p-6 sm:p-10 bg-white dark:bg-neutral-800 rounded-xl shadow-xl"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <svg 
              className="w-32 h-32 mx-auto text-accent-500" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path 
                d="M7.5 12.5C7.5 12.5 9 14 12 14C15 14 16.5 12.5 16.5 12.5" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
              />
              <path 
                d="M8.5 9C8.5 9 8.5 8 9.5 8C10.5 8 10.5 9 10.5 9" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
              />
              <path 
                d="M13.5 9C13.5 9 13.5 8 14.5 8C15.5 8 15.5 9 15.5 9" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
              />
            </svg>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-7xl font-bold text-neutral-900 dark:text-white font-luxury mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-6">Page Not Found</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">{randomMessage}</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
          >
            <button
              onClick={goBack}
              className="px-4 py-3 rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
            <Link
              to="/"
              className="px-4 py-3 rounded-md bg-accent-600 text-white flex items-center justify-center gap-2 hover:bg-accent-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Home Page</span>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-accent-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                />
              </div>
              <div className="absolute -top-6 left-0 w-full">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Redirecting you to a smoother surface...
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Looking for something specific? Try our 
              <Link to="/products" className="text-accent-600 dark:text-accent-400 hover:underline mx-1">
                products
              </Link>
              or
              <Link to="/contact" className="text-accent-600 dark:text-accent-400 hover:underline mx-1">
                contact us
              </Link>
              for help.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound; 