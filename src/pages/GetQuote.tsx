import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Home, Store, Mail, Phone, MapPin, ArrowRight, Calculator, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import SEO from '../components/common/SEO';

// reCAPTCHA site key - replace with your actual key
const RECAPTCHA_SITE_KEY = '6Le2GgErAAAAAPLykENu2vO6-IXAoBW7U1SdqsC9'; // This is Google's test key, replace with your real key

const quoteFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  location: z.string().optional(),
  role: z.string().optional(), // What describes you best
  projectType: z.string().min(1, 'Please select a project type'),
  projectSize: z.string().min(1, 'Please select a project size'),
  productInterest: z.string().min(1, 'Please select a product'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  website: z.string().optional(), // Honeypot field - should remain empty
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

const GetQuote: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      website: '', // Initialize honeypot field
    }
  });

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

  // Reset status after 5 seconds
  useEffect(() => {
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);
  
  // Watch honeypot field
  const websiteValue = watch('website');

  const onSubmit = async (data: QuoteFormData) => {
    // Check honeypot field - if filled, silently reject (bot detected)
    if (data.website) {
      console.log('Bot detected via honeypot field');
      // Show success but don't actually submit
      setSubmitStatus('success');
      reset();
      return;
    }
    
    // // Debug log to verify the role field is included
    // console.log('Form data being submitted:', data);
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Get reCAPTCHA token
      let recaptchaToken = '';
      if (window.grecaptcha) {
        try {
          recaptchaToken = await new Promise((resolve) => {
            window.grecaptcha.ready(() => {
              window.grecaptcha
                .execute(RECAPTCHA_SITE_KEY, { action: 'quote_submit' })
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
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.location || '',
        role: data.role || '', // Explicitly include role field
        projectType: data.projectType,
        projectSize: data.projectSize,
        productInterest: data.productInterest,
        message: data.message,
        formType: 'quote',
        recaptchaToken,
        timestamp: new Date().toISOString()
      };
      
      // // Log the final submission data
      // console.log('Final submission data:', submissionData);
      
      // Create form inputs from submission data
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
      
      // Show success message
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit quote request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <SEO
        title="Get a Quote"
        description="Request a free quote for your microcement project in Dubai and UAE. Our experts will provide detailed pricing and recommendations for your space."
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-accent-700 to-accent-500 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-accent-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get Your Free Quote
            </h1>
            <p className="text-lg md:text-xl text-neutral-100">
              Tell us about your project and we'll provide you with a detailed quote tailored to your needs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-neutral-100 dark:bg-neutral-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-white dark:bg-neutral-700 p-3 rounded-full">
                <Phone className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">Phone</h3>
                <a href="tel:+971545161629" className="text-neutral-600 dark:text-neutral-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                  +971 54 516 1629
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white dark:bg-neutral-700 p-3 rounded-full">
                <Mail className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">Email</h3>
                <a href="mailto:sales@rynovatrade.com" className="text-neutral-600 dark:text-neutral-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                  sales@rynovatrade.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white dark:bg-neutral-700 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">Address</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Dubai, United Arab Emirates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Form */}
      <div className="py-16 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    required
                    className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent dark:bg-neutral-800 dark:text-white"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    required
                    className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent dark:bg-neutral-800 dark:text-white"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent dark:bg-neutral-800 dark:text-white"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 mb-2">
                  Location <span className="text-neutral-500 dark:text-neutral-400 text-sm font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  id="location"
                  {...register('location')}
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent dark:bg-neutral-800 dark:text-white"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 mb-2">
                  What Describes You Best?
                </label>
                <select
                  id="role"
                  {...register('role')}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent dark:bg-neutral-800 dark:text-white"
                >
                  <option value="">Select an option</option>
                  <option value="architect">Architect</option>
                  <option value="interior designer">Interior Designer</option>
                  <option value="home owner">Home Owner</option>
                  <option value="contractor">Contractor</option>
                  <option value="distributor">Distributor</option>
                </select>
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 mb-2">
                  Project Type
                </label>
                <select
                  id="projectType"
                  {...register('projectType')}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent dark:bg-neutral-800 dark:text-white"
                >
                  <option value="">Select a type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
                {errors.projectType && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.projectType.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="projectSize" className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 mb-2">
                  Project Size (Approximate Area)
                </label>
                <select
                  id="projectSize"
                  {...register('projectSize')}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent dark:bg-neutral-800 dark:text-white"
                >
                  <option value="">Select a size</option>
                  <option value="small">Small (0-50m²)</option>
                  <option value="medium">Medium (51-200m²)</option>
                  <option value="large">Large (201m²+)</option>
                </select>
                {errors.projectSize && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.projectSize.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="productInterest" className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 mb-2">
                  Product Interest
                </label>
                <select
                  id="productInterest"
                  {...register('productInterest')}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent dark:bg-neutral-800 dark:text-white"
                >
                  <option value="">Select a product</option>
                  <option value="Erthos">Erthos</option>
                  <option value="Zameen">Zameen</option>
                  <option value="Both">Both products</option>
                </select>
                {errors.productInterest && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.productInterest.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent dark:bg-neutral-800 dark:text-white"
                  placeholder="Please provide details about your project..."
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
                )}
              </div>

              {/* Honeypot field - hidden from real users but bots will fill it */}
              <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
                <label htmlFor="website">Website (Leave this empty)</label>
                <input
                  type="text"
                  id="website"
                  {...register('website')}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="flex flex-col items-center">
                {submitStatus === 'success' && (
                  <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md">
                    Your quote request has been submitted successfully. We'll contact you soon!
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md">
                    {errorMessage || 'There was an error submitting your request. Please try again.'}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-accent-600 text-white rounded-md ${
                    isSubmitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:bg-accent-700 transition-colors duration-300'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetQuote; 