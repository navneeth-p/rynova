export interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  technicalSpecs: {
    [key: string]: string;
  };
  applications: string[];
  image: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  role?: string; // What describes the user best
  company?: string;
  phone?: string;
  website?: string; // Honeypot field for bot detection
}

// reCAPTCHA declaration
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}