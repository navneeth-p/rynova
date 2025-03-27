import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/common/SEO';

const categories = [
  { id: "all", label: "All", icon: "🌟" },
  { id: "technology", label: "Technology", icon: "⚡" },
  { id: "applications", label: "Applications", icon: "🏗️" },
  { id: "sustainability", label: "Sustainability", icon: "🌱" },
  { id: "maintenance", label: "Maintenance", icon: "🔧" },
  { id: "design", label: "Design", icon: "🎨" },
  { id: "projects", label: "Projects", icon: "📋" }
];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category.toLowerCase() === selectedCategory);

  return (
    <div className="min-h-screen pt-16 bg-neutral-50 dark:bg-neutral-900">
      <SEO
        title="Blog"
        description="Stay updated with the latest trends in microcement applications, design tips, and industry insights from Rynova's experts in Dubai and UAE."
      />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-accent-700 to-accent-500 py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          {/* Animated background elements */}
          {[...Array(5)].map((_, i) => (
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
              Insights & Inspiration
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover the latest trends, tips, and innovations in microcement technology and design.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto">
          <nav className="flex overflow-x-auto py-4 px-4 sm:px-6 lg:px-8 gap-8 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-accent-600 text-white shadow-md transform scale-105'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-accent-600 text-white text-sm rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  <div className="flex items-center mr-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                  {post.title}
                </h2>
                
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  {post.excerpt}
                </p>
                
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-white dark:bg-neutral-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
              Stay Updated with Our Latest Posts
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              Subscribe to our newsletter to receive the latest insights and updates about microcement technology and design.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent-600 hover:bg-accent-700 transition-colors duration-300"
            >
              Subscribe Now
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Blog; 