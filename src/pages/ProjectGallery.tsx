import React, { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Image, Filter } from 'lucide-react';
import SEO from '../components/common/SEO';

// Define TypeScript interfaces for better type safety
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  projectLink: string;
}

interface SlideImage {
  src: string;
  alt?: string;
  title?: string;
}

interface RenderSlideProps<T> {
  slide: T;
  offset: number;
  rect: {
    width: number;
    height: number;
  };
}

// Sample project data
const projects: Project[] = [
  {
    id: 1,
    title: 'Modern Living Room Floor',
    category: 'Earthos',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80',
    description: 'A seamless Earthos microcement floor with a sophisticated matte finish.',
    projectLink: '/project/living-room-floor',
  },
  {
    id: 2,
    title: 'Luxury Bathroom',
    category: 'Zameen',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80',
    description: 'Waterproof Zameen microcement finish for walls and flooring.',
    projectLink: '/project/bathroom-installation',
  },
  {
    id: 3,
    title: 'Kitchen Island & Countertops',
    category: 'Earthos',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80',
    description: 'Durable Earthos microcement finish for high-traffic kitchen surfaces.',
    projectLink: '/project/kitchen-countertop',
  },
  {
    id: 4,
    title: 'Corporate Office Space',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80',
    description: 'Large-scale commercial installation with custom microcement finish.',
    projectLink: '/project/office-space',
  },
  {
    id: 5,
    title: 'Luxury Villa Interior',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80',
    description: 'Complete interior microcement finishes for a modern luxury villa.',
    projectLink: '/project/luxury-villa',
  },
  {
    id: 6,
    title: 'High-End Retail Store',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80',
    description: 'Stylish microcement flooring for a premium retail environment.',
    projectLink: '/project/retail-store',
  },
];

// Project card component for cleaner code organization
const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  return (
    <div 
      className="bg-gray-100 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-60 object-cover transition-transform duration-500 hover:scale-110" 
          loading="lazy" 
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
        <span className="bg-accent-200 dark:bg-accent-800 text-accent-800 dark:text-accent-200 px-3 py-1 rounded-full text-sm font-semibold inline-block">{project.category}</span>
        <p className="mt-3 text-gray-600 dark:text-neutral-300">{project.description}</p>
      </div>
    </div>
  );
};

// Filter button component
const FilterButton = ({ 
  category, 
  activeFilter, 
  onClick 
}: { 
  category: string; 
  activeFilter: string; 
  onClick: () => void 
}) => {
  const isActive = activeFilter === category;
  
  return (
    <button
      className={`px-4 py-2 rounded-md transition-all duration-300 ${
        isActive
          ? 'bg-accent-600 text-white shadow-md transform scale-105'
          : 'bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-neutral-200 hover:bg-gray-300 dark:hover:bg-neutral-600 hover:transform hover:scale-105'
      }`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      {category}
    </button>
  );
};

const renderSlide = ({ slide, offset, rect }: RenderSlideProps<SlideImage>) => {
  const { src, alt = '' } = slide;
  const width = rect.width;
  const height = rect.height;
  const scale = offset ? 0.75 : 1;
  const opacity = offset ? 0.5 : 1;
  const transform = `scale(${scale}) translateX(${offset}px)`;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        opacity,
        transform,
        transition: 'all 0.3s ease-out',
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ width, height }}
      />
    </div>
  );
};

const ProjectGallery: React.FC = () => {
  const [filter, setFilter] = useState('All Projects');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories from projects
  const uniqueCategories = ['All Projects', ...Array.from(new Set(projects.map(p => p.category)))];
  
  // Filter projects based on category and search query
  const filteredProjects = projects
    .filter(project => 
      (filter === 'All Projects' || project.category === filter) &&
      (searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleProjectClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Implement intersection observer for fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const projectId = parseInt(entry.target.getAttribute('data-project-id') || '0');
            setVisibleProjects(prev => [...prev, projectId]);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all project elements
    document.querySelectorAll('[data-project-id]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filter, searchQuery]); // Re-run when filter or search changes

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <SEO
        title="Project Gallery"
        description="Explore Rynova's portfolio of stunning microcement projects in Dubai and UAE. View our completed residential and commercial installations."
      />
      <div className="py-16 sm:py-24 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-transform duration-500 hover:scale-105">
              Our Project Gallery
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Explore our stunning collection of microcement installations showcasing the versatility and beauty of Earthos and Zameen products.
            </p>
          </div>

          {/* Search and filter controls */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-gray-700 dark:text-neutral-300">
                  {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {uniqueCategories.map((category) => (
                <FilterButton
                  key={category}
                  category={category}
                  activeFilter={filter}
                  onClick={() => setFilter(category)}
                />
              ))}
            </div>
          </div>

          {/* Projects grid with responsive columns */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id}
                  data-project-id={project.id}
                  className={`transition-all duration-700 ${
                    visibleProjects.includes(project.id) 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-10'
                  }`}
                >
                  <ProjectCard
                    project={project}
                    onClick={() => handleProjectClick(index)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-neutral-400">No projects found. Try adjusting your search criteria.</p>
            </div>
          )}

          {lightboxOpen && (
            <Lightbox
              open={lightboxOpen}
              close={() => setLightboxOpen(false)}
              slides={filteredProjects.map(project => ({ 
                src: project.image,
                alt: project.title,
                title: project.title,
              }))}
              index={lightboxIndex}
              plugins={[Zoom, Thumbnails]}
              carousel={{ finite: true }}
              zoom={{ maxZoomPixelRatio: 3 }}
              render={{
                slide: renderSlide
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;