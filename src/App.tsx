import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import ProjectGallery from './pages/ProjectGallery';
import GetQuote from './pages/GetQuote';
import Erthos from './pages/Erthos';
import Zameen from './pages/Zameen';
import NotFound from './pages/NotFound';
import ComingSoon from './pages/ComingSoon';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import SEO from './components/common/SEO';

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <div className="min-h-screen bg-white flex flex-col">
            <SEO
              title="Home"
              description="Rynova - Premium microcement solutions for floors, walls, and surfaces. Transform your space with our innovative products and expert installation services in Dubai, UAE."
            />
            <Suspense fallback={<div className="h-16 bg-white shadow-sm" />}>
              <Navbar />
            </Suspense>
            
            <main className="flex-grow">
              <Suspense fallback={<PageLoader />}>
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/erthos" element={<Erthos />} />
                    <Route path="/zameen" element={<Zameen />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/gallery" element={<ProjectGallery />} />
                    <Route path="/get-quote" element={<GetQuote />} />
                    <Route path="/coming-soon" element={<ComingSoon />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnimatePresence>
              </Suspense>
            </main>

            <Suspense fallback={<div className="h-64 bg-gray-100" />}>
              <Footer />
            </Suspense>
          </div>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;