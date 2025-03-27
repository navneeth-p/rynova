import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Check, AlertCircle } from 'lucide-react';
import type { ContactForm } from '../types';
import SEO from '../components/common/SEO';

// reCAPTCHA site key - replace with your actual key
const RECAPTCHA_SITE_KEY = '6Le2GgErAAAAAPLykENu2vO6-IXAoBW7U1SdqsC9'; // This is Google's test key, replace with your real key

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
    role: '',
    company: '',
    phone: '',
    website: '' // Honeypot field
  });
  
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactForm, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [contactItemsVisible, setContactItemsVisible] = useState(false);

  // Add entry animations on component mount
  useEffect(() => {
    setFormVisible(true);
    
    // Stagger the appearance of contact info items
    setTimeout(() => {
      setContactItemsVisible(true);
    }, 300);
  }, []);

  // Load reCAPTCHA script dynamically
  useEffect(() => {
    const loadRecaptcha = () => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      document.body.appendChild(script);
    };
    
    loadRecaptcha();
    
    return () => {
      // Cleanup reCAPTCHA script when component unmounts
      const scripts = document.querySelectorAll(`script[src*="recaptcha"]`);
      scripts.forEach(script => script.remove());
    };
  }, []);

  const validateField = (name: keyof ContactForm, value: string | undefined): string => {
    if (!value) return `${name} is required`;
    
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : '';
      case 'email':
        return value.trim() === '' 
          ? 'Email is required' 
          : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ? 'Invalid email address'
            : '';
      case 'message':
        return value.trim() === '' ? 'Message is required' : '';
      default:
        return '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name as keyof ContactForm, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot field - if filled, silently reject (bot detected)
    if (formData.website) {
      console.log('Bot detected via honeypot field');
      // Show success but don't actually submit
      setFormVisible(false);
      setTimeout(() => {
        setIsSubmitted(true);
        setTimeout(() => setFormVisible(true), 100);
      }, 400);
      
      setFormData({
        name: '',
        email: '',
        message: '',
        role: '',
        company: '',
        phone: '',
        website: ''
      });
      return;
    }
    
    // // Debug log to verify the role field is included
    // console.log('Contact form data being submitted:', formData);
    
    // Validate all fields
    const newErrors: Partial<ContactForm> = {};
    let hasError = false;
    
    (Object.keys(formData) as Array<keyof ContactForm>).forEach(key => {
      if (key !== 'website') { // Don't validate honeypot field
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          hasError = true;
        }
      }
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ 
      ...acc, [key]: true 
    }), {}));
    
    if (hasError) return;
    
    setIsSubmitting(true);
    
    try {
      // Get reCAPTCHA token
      let recaptchaToken = '';
      if (window.grecaptcha) {
        try {
          recaptchaToken = await new Promise((resolve) => {
            window.grecaptcha.ready(() => {
              window.grecaptcha
                .execute(RECAPTCHA_SITE_KEY, { action: 'contact_submit' })
                .then(resolve);
            });
          });
        } catch (err) {
          console.error('reCAPTCHA error:', err);
        }
      }
      
      // Use an iframe to prevent page redirection 
      const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbz4v3deY3LwxEUAcIPTEMyo7ZRN2xLV3cprX5dp64B35SqNotIEPPkP-_JvSmUMmRVj/exec';
      
      // Create a hidden iframe
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden_iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Create a hidden form and target the iframe
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = googleScriptUrl;
      form.target = 'hidden_iframe';
      form.style.display = 'none';
      
      // Create form fields and append to form, 
      // exclude honeypot and add security fields
      const submissionData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        role: formData.role || '', // Explicitly include role field
        company: formData.company || '',
        phone: formData.phone || '',
        formType: 'contact', 
        recaptchaToken,
        timestamp: new Date().toISOString()
      };
      
      // // Log the final submission data
      // console.log('Final contact form submission data:', submissionData);
      
      Object.entries(submissionData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value || '';
        form.appendChild(input);
      });
      
      // Append form to body, submit it, and remove it after delay
      document.body.appendChild(form);
      form.submit();
      
      // Remove the form and iframe after submission (with delay)
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);
      
      // Show success message immediately since we know the data is being saved
      setFormVisible(false);
      setTimeout(() => {
        setIsSubmitted(true);
        setTimeout(() => setFormVisible(true), 100);
      }, 400);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
        role: '',
        company: '',
        phone: '',
        website: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (touched[name as keyof ContactForm]) {
      setErrors(prev => ({ 
        ...prev, 
        [name]: validateField(name as keyof ContactForm, value) 
      }));
    }
  };

  const resetForm = () => {
    // Animate out success message before showing form again
    setFormVisible(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setTimeout(() => setFormVisible(true), 100);
    }, 300);
  };

  // Handle select change for dropdown
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-neutral-900">
      <SEO
        title="Contact Us"
        description="Get in touch with Rynova's expert team in Dubai. We're here to help with your microcement projects, from consultation to installation."
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-accent-700 to-accent-500 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent-700 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>
        {/* Fun animated bubbles background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 transform transition-all duration-700 translate-y-0 opacity-100">
              Let's Bond <span className="text-xl md:text-2xl font-normal">(Like our cement)</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto transform transition-all duration-700 delay-300 translate-y-0 opacity-100">
              Drop us a line – we're fun people who just happen to make incredible microcement!
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-8 text-accent-700 dark:text-accent-400 transition-all duration-500">
                Ways to Reach Us 
                <span className="text-2xl ml-2 animate-bounce inline-block">👋</span>
              </h2>
              <div className="space-y-8">
                {[
                  {
                    icon: <Mail className="h-6 w-6 text-accent-600 dark:text-accent-400" />,
                    title: "Ping Our Inbox",
                    content: <a href="mailto:sales@rynovatrade.com" className="text-neutral-600 dark:text-neutral-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-300">sales@rynovatrade.com</a>
                  },
                  {
                    icon: <Phone className="h-6 w-6 text-accent-600 dark:text-accent-400" />,
                    title: "Call Our Digits",
                    content: <a href="tel:+971566870741" className="text-neutral-600 dark:text-neutral-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-300">(+971) 566870741 | 566870742</a>
                  },
                  {
                    icon: <MapPin className="h-6 w-6 text-accent-600 dark:text-accent-400" />,
                    title: "Find Us at",
                    content: <address className="text-neutral-600 dark:text-neutral-300 not-italic">
                      Meydan Grandstand 6th Floor<br />
                      Nad Al Sheba 1<br />
                      Dubai, UAE
                    </address>
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-start bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 ${
                      contactItemsVisible 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="bg-accent-100 dark:bg-accent-900/30 p-3 rounded-full mr-4 transition-all duration-300 hover:bg-accent-200 dark:hover:bg-accent-900/50 hover:rotate-12">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-neutral-900 dark:text-white">{item.title}</h3>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mb-3">Fun Fact!</h3>
                <p className="text-neutral-600 dark:text-neutral-300 italic">
                  The word "cement" comes from the Latin word "caementum," which described the rubble used in Roman mortar. It's been bonding things together for over 2,000 years!
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div 
              className={`order-1 lg:order-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 transition-all duration-500 transform ${
                formVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {isSubmitted ? (
                <div className="text-center py-8 transition-all duration-500">
                  <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full inline-flex mx-auto mb-6 animate-bounce">
                    <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">Message Sent!</h2>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                    High five! ✋ Your message is on its way to our inbox. We'll get back to you faster than concrete sets!
                  </p>
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 bg-accent-600 text-white rounded-md hover:bg-accent-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 hover:scale-105"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-accent-700 dark:text-accent-400">
                    Tell Us What's Up
                    <span className="text-2xl ml-2 inline-block transform rotate-12">✍️</span>
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="transition-all duration-300 ease-out">
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Your Name (Vision Holder) <span className="text-red-500 dark:text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="What should we call you?"
                        className={`w-full px-4 py-3 border rounded-md transition-all duration-300 focus:outline-none focus:ring-2 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-400 ${
                          errors.name && touched.name 
                            ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900' 
                            : 'border-neutral-300 dark:border-neutral-600 focus:border-accent-500 focus:ring-accent-200 dark:focus:ring-accent-900 hover:border-accent-300 dark:hover:border-accent-700'
                        }`}
                        aria-invalid={!!(errors.name && touched.name)}
                        aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                      />
                      <div 
                        className={`transition-all duration-300 ease-out overflow-hidden ${
                          errors.name && touched.name ? 'max-h-8 mt-1' : 'max-h-0'
                        }`}
                      >
                        <p id="name-error" className="text-sm text-red-600 dark:text-red-400 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" /> {errors.name}
                        </p>
                      </div>
                    </div>
                    
                    <div className="transition-all duration-300 ease-out">
                      <label htmlFor="role" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        What Describes You Best? 🧩
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleSelectChange}
                        className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-200 dark:focus:ring-accent-900 focus:border-accent-500 hover:border-accent-300 dark:hover:border-accent-700 dark:bg-neutral-700 dark:text-neutral-100"
                      >
                        <option value="">Select an option</option>
                        <option value="architect">Architect</option>
                        <option value="interior designer">Interior Designer</option>
                        <option value="home owner">Home Owner</option>
                        <option value="contractor">Contractor</option>
                        <option value="distributor">Distributor</option>
                      </select>
                    </div>
                    
                    <div className="transition-all duration-300 ease-out">
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Your Email (E-Pigeon) <span className="text-red-500 dark:text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Where can we reply to you?"
                        className={`w-full px-4 py-3 border rounded-md transition-all duration-300 focus:outline-none focus:ring-2 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-400 ${
                          errors.email && touched.email 
                            ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900' 
                            : 'border-neutral-300 dark:border-neutral-600 focus:border-accent-500 focus:ring-accent-200 dark:focus:ring-accent-900 hover:border-accent-300 dark:hover:border-accent-700'
                        }`}
                        aria-invalid={!!(errors.email && touched.email)}
                        aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                      />
                      <div 
                        className={`transition-all duration-300 ease-out overflow-hidden ${
                          errors.email && touched.email ? 'max-h-8 mt-1' : 'max-h-0'
                        }`}
                      >
                        <p id="email-error" className="text-sm text-red-600 dark:text-red-400 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" /> {errors.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="transition-all duration-300 ease-out">
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Phone (Vibe Check)
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Your digits"
                          className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-200 dark:focus:ring-accent-900 focus:border-accent-500 hover:border-accent-300 dark:hover:border-accent-700 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-400"
                        />
                      </div>
                      
                      <div className="transition-all duration-300 ease-out">
                        <label htmlFor="company" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Company (If fancy)
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Where do you work?"
                          className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-200 dark:focus:ring-accent-900 focus:border-accent-500 hover:border-accent-300 dark:hover:border-accent-700 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-400"
                        />
                      </div>
                    </div>
                    
                    <div className="transition-all duration-300 ease-out">
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Your Message 😉 <span className="text-red-500 dark:text-red-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={4}
                        placeholder="What's on your mind? We're listening..."
                        className={`w-full px-4 py-3 border rounded-md transition-all duration-300 focus:outline-none focus:ring-2 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-400 ${
                          errors.message && touched.message 
                            ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900' 
                            : 'border-neutral-300 dark:border-neutral-600 focus:border-accent-500 focus:ring-accent-200 dark:focus:ring-accent-900 hover:border-accent-300 dark:hover:border-accent-700'
                        }`}
                        aria-invalid={!!(errors.message && touched.message)}
                        aria-describedby={errors.message && touched.message ? "message-error" : undefined}
                      />
                      <div 
                        className={`transition-all duration-300 ease-out overflow-hidden ${
                          errors.message && touched.message ? 'max-h-8 mt-1' : 'max-h-0'
                        }`}
                      >
                        <p id="message-error" className="text-sm text-red-600 dark:text-red-400 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" /> {errors.message}
                        </p>
                      </div>
                    </div>
                    
                    {/* Honeypot field - hidden from real users but bots will fill it */}
                    <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
                      <label htmlFor="website">Website (Leave this empty)</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-6 py-3 bg-accent-600 text-white rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 ${
                          isSubmitting 
                            ? 'opacity-70 cursor-not-allowed' 
                            : 'hover:bg-accent-700 hover:shadow-md active:translate-y-0.5 hover:scale-[1.02]'
                        }`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Working on it...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            <Send className="h-5 w-5 mr-2" />
                            Send It Flying!
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="bg-neutral-100 dark:bg-neutral-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-neutral-900 dark:text-white text-center">
            Come Say Hi! <span className="inline-block animate-pulse">📍</span>
          </h2>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.2941568195!2d55.30062377538061!3d25.15954357773524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69c36f082541%3A0x16f65b407bb87f9!2sMeydan%20Grandstand!5e0!3m2!1sen!2sae!4v1743025730517!5m2!1sen!2sae" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps location of Meydan Grandstand"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}