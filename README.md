# Rynova Trading - Corporate Website

## Overview
Rynova Trading is a modern corporate website built with React, TypeScript, and Tailwind CSS. It showcases the company's products and services in the construction/materials industry, featuring a clean, responsive design with both light and dark modes.

## Features
- **Responsive Design**: Fully responsive across all device sizes
- **Dark/Light Mode**: Toggleable theme with persistent state
- **Product Showcase**: Dedicated pages for featured products (Erthos, Zameen)
- **Interactive Forms**: Quote request and contact forms with validation
- **Modern UI Components**: Animated sections, smooth transitions, and interactive elements
- **Performance Optimized**: Fast loading and rendering with minimal bundle size

## Project Structure
- `/src`: Source code
  - `/components`: Reusable UI components
    - `/common`: Shared components (buttons, theme toggle, etc.)
    - `/layout`: Layout components (navbar, footer)
    - `/sections`: Page sections (hero, features, testimonials)
  - `/pages`: Individual page components
  - `/hooks`: Custom React hooks
  - `/utils`: Utility functions
  - `/assets`: Static assets (images, icons)

## Technologies
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool and development server
- **Lucide Icons**: Modern icon library
- **React Router**: Client-side routing
- **React Hook Form**: Form handling with validation

## Setup & Installation

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn

### Local Development
1. Clone the repository
   ```
   git clone <repository-url>
   cd rynova
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start development server
   ```
   npm run dev
   ```
   
4. Open http://localhost:3000 in your browser

### Production Build
```
npm run build
```

This creates a `dist` directory with optimized production files.

## Deployment
The project is configured for easy deployment to various platforms. The production build can be served from any static file server.

### Server Setup
1. Transfer the contents of the `dist` directory to your server
2. Configure your web server (Nginx, Apache) to serve the static files
3. Ensure proper permissions are set:
   ```
   sudo chown -R www-data:www-data /path/to/website
   sudo chmod -R 755 /path/to/website
   sudo find /path/to/website -type f -exec chmod 644 {} \;
   ```

## Key Features Implementation

### Form Handling
Contact and quote forms include:
- Client-side validation
- reCAPTCHA integration
- Error handling
- Success/failure notifications

### Navigation
- Smooth scrolling when clicking navigation items on the current page
- Mobile-responsive menu with animations
- Dropdown support for product categories

### Product Pages
Product pages feature:
- Detailed specifications
- Feature highlight sections
- Custom color schemes (#8C8C8C, #1A1A1A, #B8B8B8)
- CTA sections for quote requests

## License
Copyright © 2023 Rynova Trading. All rights reserved. 