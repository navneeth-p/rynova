import React, { useEffect } from 'react';
import { Users, Target, Shield, Award } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SEO from '../components/common/SEO';

// Animation variants for reusability and consistency
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      ease: "easeOut"
    }
  }
};

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
}

interface MissionVisionCardProps {
  title: string;
  description: string;
}

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-neutral-900">
      <SEO
        title="About Us"
        description="Learn about Rynova's journey in revolutionizing surface solutions with microcement. Our commitment to quality, innovation, and customer satisfaction in Dubai and UAE."
      />
      {/* Hero Section - Smoother entrance animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="bg-accent-600 text-white py-24 relative overflow-hidden"
      >
        {/* Background subtle motion effect */}
        <motion.div 
          className="absolute inset-0 bg-accent-500"
          initial={{ scale: 1.1, opacity: 0.3 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              About Rynova
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl max-w-3xl mx-auto"
            >
              Leading the future of surface technology with innovative microcement solutions
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Story Section - Adding viewport-based animations */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2
              variants={fadeIn}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6 text-neutral-900 dark:text-white"
            >
              Our Story
            </motion.h2>
            <motion.p
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-neutral-600 dark:text-neutral-300 text-lg"
            >
              Founded in 2024, Rynova emerged with a bold vision against uninspired surfaces. We're not just another company – we're design disruptors who believe your space should tell a story.
               Born from late-night brainstorms and crazy creative energy, we reimagine how spaces can transform and inspire.
            </motion.p>
          </div>

          {/* Values - Staggered animation */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
          >
            <ValueCard 
              icon={<Shield className="h-12 w-12 text-accent-600 dark:text-accent-400" />} 
              title="Quality" 
              description="Unwavering commitment to product excellence and durability" 
              delay={0}
            />
            <ValueCard 
              icon={<Target className="h-12 w-12 text-accent-600 dark:text-accent-400" />} 
              title="Innovation" 
              description="Continuous advancement in surface technology solutions" 
              delay={0.1}
            />
            <ValueCard 
              icon={<Users className="h-12 w-12 text-accent-600 dark:text-accent-400" />} 
              title="Customer Focus" 
              description="Dedicated to exceeding client expectations and needs" 
              delay={0.2}
            />
            <ValueCard 
              icon={<Award className="h-12 w-12 text-accent-600 dark:text-accent-400" />} 
              title="Excellence" 
              description="Setting industry standards through superior products" 
              delay={0.3}
            />
          </motion.div>

          {/* Mission & Vision - Synchronized animations */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <MissionVisionCard 
              title="Our Mission" 
              description="At Rynova, we don't just design surfaces—we craft living experiences that transform the ordinary into extraordinary, where every space becomes a vibrant canvas of possibility and personal expression." 
            />
            <MissionVisionCard 
              title="Our Vision" 
              description="To pioneer a global design revolution that redefines human interaction with spaces, turning innovation into an intuitive art form that evolves with imagination and breaks through traditional boundaries." 
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Team Section - Coordinated animations */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-24 bg-neutral-50 dark:bg-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              variants={fadeIn}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white"
            >
              Our Team
            </motion.h2>
            <motion.p
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
            >
              Meet the experts behind Rynova's innovative surface solutions
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12"
          >
            <TeamMember 
              name="Yashwant Anil" 
              role="CEO & Co-Founder" 
              imageUrl="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256" 
            />
            <TeamMember 
              name="Shreya Wilson" 
              role="Co-Founder" 
              imageUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256" 
            />
            {/* <TeamMember 
              name="David Martinez" 
              role="Head of Research & Development" 
              imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256" 
            /> */}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Supporting Components with improved animations

const ValueCard = ({ icon, title, description, delay }: ValueCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: delay 
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="text-center p-6 hover:shadow-md hover:bg-white dark:hover:bg-neutral-800 rounded-lg transition-all duration-300"
    >
      <motion.div 
        className="flex justify-center mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 + delay }}
        viewport={{ once: true }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-300">{description}</p>
    </motion.div>
  );
}

function MissionVisionCard({ title, description }: MissionVisionCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg shadow-sm"
    >
      <h3 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-300">{description}</p>
    </motion.div>
  );
}

const TeamMember = ({ name, role, imageUrl }: TeamMemberProps) => {
  const memberVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      } 
    }
  };

  return (
    <motion.div
      variants={memberVariants}
      className="bg-white dark:bg-neutral-700 rounded-lg overflow-hidden shadow-md"
    >
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-full h-64 object-cover object-center" 
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1 text-neutral-900 dark:text-white">{name}</h3>
        <p className="text-accent-600 dark:text-accent-400">{role}</p>
      </div>
    </motion.div>
  );
}

export default About;