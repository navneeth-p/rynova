import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag, Share2, User } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/common/SEO';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <SEO
          title="Blog Post Not Found"
          description="The requested blog post could not be found."
        />
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center">Post Not Found</h1>
          <p className="text-center mt-4">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <SEO
        title={post.title}
        description={post.excerpt}
      />
      <article className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        {/* Hero Section */}
        <div className="relative h-[45vh] md:h-[55vh] lg:h-[65vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          </div>

          <div className="absolute inset-0 flex items-end">
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl relative"
              >
                <Link
                  to="/blog"
                  className="inline-flex items-center text-white mb-8 transition-all group text-sm bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
                  Back to Blog
                </Link>

                <div className="space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-wrap items-center gap-3 text-white text-sm"
                  >
                    <span className="px-5 py-2 bg-gradient-to-r from-accent-600 to-accent-500 rounded-full font-medium shadow-lg shadow-accent-600/20">
                      {post.category}
                    </span>
                    <div className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.date}
                    </div>
                    <div className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                      <Clock className="w-4 h-4 mr-2" />
                      {post.readTime}
                    </div>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight drop-shadow-lg"
                  >
                    {post.title}
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-lg sm:text-xl text-white/90 max-w-3xl leading-relaxed backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/10"
                  >
                    {post.excerpt}
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 lg:py-20">
            {/* Author Info */}
            <div className="bg-gray-50 dark:bg-gray-900/10 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl rotate-6 flex items-center justify-center shadow-lg shadow-accent-600/20 transition-transform duration-300 hover:rotate-12">
                    <User className="w-8 h-8 text-white -rotate-6" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-neutral-900 dark:text-neutral-100 mb-1">
                      {post.author}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      Content Writer & Expert
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.share?.({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href,
                    }).catch(() => {
                      navigator.clipboard.writeText(window.location.href);
                    });
                  }}
                  className="flex items-center px-6 py-3 text-sm font-medium bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Share Article</span>
                  <span className="sm:hidden">Share</span>
                </button>
              </div>
            </div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="prose prose-lg dark:prose-invert max-w-none mb-16 space-y-16
                prose-headings:scroll-mt-20
                prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8
                prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-16 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-12 prose-h3:mb-4
                prose-p:text-neutral-700 prose-p:dark:text-neutral-300 prose-p:leading-relaxed prose-p:mb-8
                prose-li:text-neutral-700 prose-li:dark:text-neutral-300 prose-li:mb-3
                prose-strong:text-neutral-900 prose-strong:dark:text-white prose-strong:font-bold
                prose-ul:my-8 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-8 prose-ol:list-decimal prose-ol:pl-6
                prose-img:rounded-2xl prose-img:my-12
                prose-blockquote:border-l-4 prose-blockquote:border-accent-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-8 prose-blockquote:text-neutral-700 prose-blockquote:dark:text-neutral-300
                prose-code:text-accent-600 prose-code:dark:text-accent-400 prose-code:bg-neutral-100 prose-code:dark:bg-neutral-800 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
                [&>section]:bg-neutral-100 [&>section]:dark:bg-neutral-800/90 [&>section]:rounded-2xl [&>section]:p-8 [&>section]:my-12
                [&>div]:bg-transparent [&>div]:shadow-none [&>div]:border-none [&>div]:p-0 [&>div]:my-12
                [&_figure]:my-12 [&_figure]:overflow-hidden [&_figure]:rounded-2xl
                [&_figure_img]:m-0 [&_figure_img]:w-full [&_figure_img]:rounded-t-2xl
                [&_figure_figcaption]:bg-neutral-100 [&_figure_figcaption]:dark:bg-neutral-800/90 [&_figure_figcaption]:p-4 [&_figure_figcaption]:text-sm [&_figure_figcaption]:text-neutral-600 [&_figure_figcaption]:dark:text-neutral-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {post.tags.map((tag, index) => (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  key={index}
                  className="px-5 py-2.5 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-300 rounded-xl text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-all duration-300 cursor-pointer"
                >
                  #{tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default BlogPost; 