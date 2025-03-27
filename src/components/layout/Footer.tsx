import React, { useEffect, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ExternalLink, ArrowRight } from 'lucide-react';
import { FaPinterest, FaWhatsapp } from 'react-icons/fa';
import { GiCookingPot } from 'react-icons/gi';
import { products } from '../../data/products';

// Extracted data to separate file that could be imported
// This helps with maintenance and separation of concerns
const COMPANY = {
  name: 'Rynova',
  tagline: 'Leading the future of surface technology with innovative microcement solutions.',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    pinterest: 'https://pinterest.com',
    whatsapp: 'https://wa.me/971566870741',
  },
  contactInfo: {
    email: 'sales@rynovatrade.com',
    phone: '+971 566870741 | 566870742',
    address: {
      line1: 'Meydan Grandstand 6th Floor',
      line2: 'Nad Al Sheba 1',
      country: 'Dubai, UAE',
    },
  }
};

// Extract quick links for better management
const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products" },
  { to: "/gallery", label: "Projects" },
  { to: "/blog", label: "Blogs" },
  { to: "/contact", label: "Contact" },
];

// Extract legal links
const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" }
];

export default function Footer() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  
  // Featured product IDs - could be moved to configuration
  const featuredProductIds = ['erthos', 'zameen'];
  const featuredProducts = products.filter(product => 
    featuredProductIds.includes(product.id)
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const highlightElement = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    element.classList.add('highlighted');
    setTimeout(() => element.classList.remove('highlighted'), 1500);
  };

  interface SocialIconProps {
    platform: keyof typeof COMPANY.socialLinks;
    Icon: React.ComponentType<any>;
  }

  // Social media icon component for consistency
  const SocialIcon = ({ platform, Icon }: SocialIconProps) => (
    <a 
      href={COMPANY.socialLinks[platform]} 
      className="w-10 h-10 rounded-full bg-neutral-800 dark:bg-neutral-700 flex items-center justify-center text-white hover:bg-accent-600 dark:hover:bg-accent-500 transition-colors duration-300" 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}
    >
      <Icon size={18} />
    </a>
  );

  interface ContactItemProps {
    icon: React.ComponentType<any>;
    children: ReactNode;
  }

  // Contact item component for consistency
  const ContactItem = ({ icon: Icon, children }: ContactItemProps) => (
    <li className="flex items-start text-neutral-400 dark:text-neutral-300 hover:text-accent-500 dark:hover:text-accent-400 transition-colors">
      <Icon size={16} className="mr-2 mt-1 flex-shrink-0 text-accent-600 dark:text-accent-400" />
      <span>{children}</span>
    </li>
  );

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-white border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">{COMPANY.name}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">{COMPANY.tagline}</p>
            <div className="flex space-x-3">
              <SocialIcon platform="facebook" Icon={Facebook} />
              <SocialIcon platform="instagram" Icon={Instagram} />
              <SocialIcon platform="linkedin" Icon={Linkedin} />
              <SocialIcon platform="pinterest" Icon={FaPinterest} />
              <SocialIcon platform="whatsapp" Icon={FaWhatsapp} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map(link => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-neutral-600 dark:text-neutral-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors inline-flex items-center"
                  >
                    <ArrowRight className="w-3 h-3 mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
              
          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-2">Our Products</h4>
            <ul className="space-y-2">
              {featuredProducts.map(product => (
                <li key={product.id}>
                  <button
                    onClick={() => highlightElement(product.id)}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors cursor-pointer inline-flex items-center"
                    aria-label={`View ${product.name} product`}
                  >
                    <ArrowRight className="w-3 h-3 mr-2" />
                    {product.name || product.id}
                  </button>
                </li>
              ))}
              <li>
                <Link 
                  to="/coming-soon" 
                  className="text-neutral-600 dark:text-neutral-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors cursor-pointer inline-flex items-center group"
                >
                  <GiCookingPot className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Something's Cooking...
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-500 transition-colors inline-flex items-center mt-2"
                >
                  View All Products
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-2">Contact Us</h4>
            <ul className="space-y-4">
              <ContactItem icon={Mail}>
                <a 
                  href={`mailto:${COMPANY.contactInfo.email}`} 
                  className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  {COMPANY.contactInfo.email}
                </a>
              </ContactItem>
              <ContactItem icon={Phone}>
                <a 
                  href={`tel:${COMPANY.contactInfo.phone.split('|')[0].trim()}`} 
                  className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  {COMPANY.contactInfo.phone}
                </a>
              </ContactItem>
              <ContactItem icon={MapPin}>
                <address className="not-italic">
                  {COMPANY.contactInfo.address.line1}<br />
                  {COMPANY.contactInfo.address.line2}<br />
                  {COMPANY.contactInfo.address.country}
                </address>
              </ContactItem>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              © {currentYear} {COMPANY.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {LEGAL_LINKS.map(link => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className="text-neutral-600 dark:text-neutral-400 hover:text-accent-600 dark:hover:text-accent-400 text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}