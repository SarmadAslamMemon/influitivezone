import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { portfolioData } from '../../data/portfolioData';
import ImageSlider from './ImageSlider';

const PortfolioDetails = ({ initialCategory = 'all' }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [filteredProjects, setFilteredProjects] = useState(portfolioData.projects);
  const [showImageSlider, setShowImageSlider] = useState(false);
  const [sliderImages, setSliderImages] = useState([]);
  const [sliderTitle, setSliderTitle] = useState('');

  const handleProjectClick = (project) => {
    console.log('Project clicked:', project);
    setSelectedProject(project);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setSelectedProject(null);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleViewImages = (project) => {
    console.log('Handling view images for project:', project);
    console.log('Has multiple images:', project.hasMultipleImages);
    console.log('Images array:', project.images);
    
    if (project.hasMultipleImages && project.images && project.images.length > 0) {
      console.log('Opening image slider with images:', project.images);
      setSliderImages(project.images);
      setSliderTitle(project.title);
      setShowImageSlider(true);
    } else {
      console.log('Opening project modal');
      // If no multiple images, show the modal
      setSelectedProject(project);
    }
  };

  const closeImageSlider = () => {
    console.log('Closing image slider');
    setShowImageSlider(false);
    setSliderImages([]);
    setSliderTitle('');
  };

  // Update active category when initialCategory prop changes
  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  // Filter projects based on active category
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(portfolioData.projects);
    } else {
      setFilteredProjects(portfolioData.projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <div className="portfolio-details-page">
      {/* Image Slider */}
      {showImageSlider && sliderImages.length > 0 && (
        <ImageSlider
          images={sliderImages}
          projectTitle={sliderTitle}
          onClose={closeImageSlider}
        />
      )}

      {/* Project Modal */}
      {selectedProject && createPortal(
        <div 
          className="modal-overlay-cursor-fix"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999999,
            padding: '20px',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            cursor: 'default !important',
            pointerEvents: 'auto !important'
          }} 
          onClick={closeModal}
        >
          <div style={{
            background: 'linear-gradient(135deg, #030711, #3a6391, #89C3E5)',
            color: 'white',
            padding: '40px',
            borderRadius: '15px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            cursor: 'default',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button onClick={closeModal} style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '35px',
              height: '35px',
              cursor: 'pointer',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}>
              ×
            </button>
            
            
            {/* Project Image */}
            <div style={{ marginBottom: '25px' }}>
              <Image 
                src={selectedProject.image} 
                alt={selectedProject.title}
                width={800}
                height={200}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                  cursor: 'default'
                }}
              />
            </div>
            
            {/* Project Info */}
            <h2 style={{ 
              marginBottom: '15px', 
              fontSize: '2rem',
              background: 'linear-gradient(45deg, #89C3E5, #ffffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {selectedProject.title}
            </h2>
            
            <p style={{ 
              fontSize: '1.1rem', 
              marginBottom: '20px',
              lineHeight: '1.6',
              opacity: '0.9'
            }}>
              {selectedProject.description}
            </p>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '20px',
              marginBottom: '25px',
              flexWrap: 'wrap'
            }}>
              <span style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {selectedProject.category}
              </span>
              <span style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem'
              }}>
                {selectedProject.year}
              </span>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ 
                marginBottom: '15px', 
                fontSize: '1.2rem',
                color: '#89C3E5'
              }}>
                Technologies Used:
              </h4>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                gap: '8px'
              }}>
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index} style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '0.85rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button onClick={closeModal} style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                padding: '12px 25px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}>
                Close
              </button>
               <button onClick={() => {
                 // Close modal first
                 closeModal();
                 // Then redirect to contact page
                 window.location.href = '/contact';
               }} style={{
                 background: 'linear-gradient(45deg, #89C3E5, #3a6391)',
                 color: 'white',
                 border: 'none',
                 padding: '12px 25px',
                 borderRadius: '25px',
                 cursor: 'pointer',
                 fontSize: '1rem',
                 fontWeight: '500',
                 transition: 'all 0.3s ease',
                 zIndex: 10
               }}>
                 Get Quote
               </button>
            </div>
          </div>
        </div>,
        document.body
      )}
      
      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-content">
                <h1 className="hero-title">Our Portfolio</h1>
                <p className="hero-subtitle">
                  Discover our latest projects and see how we bring ideas to life through innovative design and development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Navigation */}
      <div className="portfolio-filters">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="filter-nav">
                {portfolioData.categories.map((category) => (
                  <button
                    key={category.id}
                    className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="projects-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="projects-grid">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="project-card">
                    <div className="project-image">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={300}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                    </div>
                    <div className="project-content">
                      <div className="project-meta">
                        <span className="project-category">{project.category}</span>
                        <span className="project-year">{project.year}</span>
                      </div>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                      <div className="project-technologies">
                        {project.technologies && project.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      <button 
                        className="view-project-btn"
                        onClick={() => handleViewImages(project)}
                      >
                        {project.hasMultipleImages ? 'View Work' : 'View Details'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PortfolioDetails;
