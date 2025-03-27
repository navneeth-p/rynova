import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';

interface NavLink {
  path: string;
  label: string;
  children?: NavLink[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();

  // Enhanced navigation structure with dropdown support
  const links: NavLink[] = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { 
      path: '/products', 
      label: 'Products',
      children: [
        { path: '/erthos', label: 'Erthos' },
        { path: '/zameen', label: 'Zameen' },
        { path: '/coming-soon', label: "Something's Cooking..." },
        { path: '/products', label: 'All Products' }
      ]
    },
    { path: '/gallery', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle dropdown toggle
  const toggleDropdown = (path: string) => {
    setDropdownOpen(dropdownOpen === path ? null : path);
  };

  // Check if a path is active (current page)
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  // Scroll to top handler
  const handleNavClick = (samePage: boolean) => {
    // Close any open dropdowns
    setDropdownOpen(null);
    
    // If we're navigating to the same page, scroll to top
    if (samePage) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // For new page navigation, we'll scroll to top automatically, 
      // but without animation (browser default behavior)
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white dark:bg-neutral-900 shadow-lg py-2' 
          : 'bg-white dark:bg-neutral-900 py-4'
      }`}
    >
      {/* Top contact bar */}
      <div className="hidden lg:block bg-accent-600 text-white py-1 absolute top-0 inset-x-0 transform -translate-y-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <a href="tel:+1234567890" className="flex items-center hover:text-accent-200 transition-colors">
              <Phone size={14} className="mr-1" />
              <span>(123) 456-7890</span>
            </a>
            <a href="mailto:info@rynova.com" className="flex items-center hover:text-accent-200 transition-colors">
              <Mail size={14} className="mr-1" />
              <span>info@rynova.com</span>
            </a>
          </div>
          <div>
            <span>Mon-Fri: 9am-5pm</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center"
              onClick={() => handleNavClick(location.pathname === '/')}
            >
              <span className={`font-bold transition-all duration-300 ${
                scrolled ? 'text-xl text-accent-600' : 'text-2xl text-gray-900 dark:text-white'
              }`}>
                Rynova
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {links.map(link => (
              <div key={link.path} className="relative group">
                {link.children ? (
                  <div className="flex flex-col">
                    <button
                      onClick={() => toggleDropdown(link.path)}
                      className={`${
                        isActive(link.path)
                          ? 'text-accent-600'
                          : 'text-gray-700 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400'
                      } flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200`}
                    >
                      {link.label}
                      <ChevronDown 
                        size={16} 
                        className={`ml-1 transition-transform duration-200 ${
                          dropdownOpen === link.path ? 'transform rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {/* Desktop dropdown */}
                    <div 
                      className={`absolute top-full left-0 w-48 bg-white dark:bg-neutral-800 shadow-lg rounded-md py-2 transform transition-all duration-200 origin-top-left ${
                        dropdownOpen === link.path 
                          ? 'scale-100 opacity-100' 
                          : 'scale-95 opacity-0 pointer-events-none'
                      }`}
                    >
                      {link.children.map(child => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`${
                            location.pathname === child.path
                              ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-700 hover:text-accent-600 dark:hover:text-accent-400'
                          } block px-4 py-2 text-sm transition-colors duration-200`}
                          onClick={() => handleNavClick(location.pathname === child.path)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`${
                      isActive(link.path)
                        ? 'text-accent-600 dark:text-accent-400 border-b-2 border-accent-600 dark:border-accent-400'
                        : 'text-gray-700 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 border-b-2 border-transparent hover:border-accent-600 dark:hover:border-accent-400'
                    } px-3 py-2 text-sm font-medium transition-all duration-200`}
                    onClick={() => handleNavClick(location.pathname === link.path)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              to="/get-quote"
              className="px-4 py-2 bg-accent-600 text-white rounded-md hover:bg-accent-700 transition-colors duration-300"
              onClick={() => handleNavClick(location.pathname === '/get-quote')}
            >
              Get a Quote
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-white dark:bg-neutral-900 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '64px' }}
      >
        <div className="px-2 pt-2 pb-3 h-full overflow-y-auto">
          {links.map(link => (
            <div key={link.path}>
              {link.children ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(link.path)}
                    className={`${
                      isActive(link.path)
                        ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-accent-600 dark:hover:text-accent-400'
                    } flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                  >
                    {link.label}
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${
                        dropdownOpen === link.path ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {/* Mobile dropdown */}
                  <div 
                    className={`pl-4 overflow-hidden transition-all duration-200 ${
                      dropdownOpen === link.path 
                        ? 'max-h-40 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    {link.children.map(child => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`${
                          location.pathname === child.path
                            ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-accent-600 dark:hover:text-accent-400'
                        } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ml-2 border-l-2 border-gray-200 dark:border-gray-700`}
                        onClick={() => {
                          setIsOpen(false);
                          handleNavClick(location.pathname === child.path);
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={link.path}
                  className={`${
                    isActive(link.path)
                      ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-accent-600 dark:hover:text-accent-400'
                  } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                  onClick={() => {
                    setIsOpen(false);
                    handleNavClick(location.pathname === link.path);
                  }}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
          <Link
            to="/get-quote"
            className="block w-full text-center mt-4 px-4 py-2 bg-accent-600 text-white rounded-md hover:bg-accent-700 transition-colors duration-300"
            onClick={() => {
              setIsOpen(false);
              handleNavClick(location.pathname === '/get-quote');
            }}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}