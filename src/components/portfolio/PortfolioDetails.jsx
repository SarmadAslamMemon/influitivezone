import { useState, useEffect, useRef } from 'react';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageZoom, setImageZoom] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

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
    // Always open the detailed project modal first
    // User can view images from within the modal if needed
    setSelectedProject(project);
    setCurrentImageIndex(0); // Reset to first image when opening modal
    setImageZoom(1); // Reset zoom
    setImagePosition({ x: 0, y: 0 }); // Reset position
  };

  const zoomIn = () => {
    setImageZoom(prev => {
      const newZoom = Math.min(prev + 0.25, 3);
      console.log('Zoom In:', newZoom);
      return newZoom;
    });
  };

  const zoomOut = () => {
    setImageZoom(prev => {
      const newZoom = Math.max(prev - 0.25, 0.5);
      console.log('Zoom Out:', newZoom);
      return newZoom;
    });
  };

  const resetZoom = () => {
    setImageZoom(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleImageMouseDown = (e) => {
    if (imageZoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  };

  const handleImageMouseMove = (e) => {
    if (isDragging && imageZoom > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleImageMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      e.stopPropagation();
      if (e.deltaY < 0) {
        setImageZoom(prev => Math.min(prev + 0.25, 3));
    } else {
        setImageZoom(prev => Math.max(prev - 0.25, 0.5));
      }
    }
  };

  const closeImageSlider = () => {
    console.log('Closing image slider');
    setShowImageSlider(false);
    setSliderImages([]);
    setSliderTitle('');
    // Ensure body overflow is reset when closing slider
    if (typeof document !== 'undefined' && document.body) {
      document.body.style.overflow = '';
    }
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
    if (typeof document === 'undefined' || !document.body) return;
    
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setCurrentImageIndex(0); // Reset image index when modal closes
    }
    
    return () => {
      if (typeof document !== 'undefined' && document.body) {
        document.body.style.overflow = '';
      }
    };
  }, [selectedProject]);

  // Keyboard navigation for image carousel and zoom
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyPress = (e) => {
      // Image navigation
      if (selectedProject.images && selectedProject.images.length > 1) {
        if (e.key === 'ArrowLeft') {
          setCurrentImageIndex((prev) => {
            const newIndex = prev === 0 ? selectedProject.images.length - 1 : prev - 1;
            setImageZoom(1);
            setImagePosition({ x: 0, y: 0 });
            return newIndex;
          });
        } else if (e.key === 'ArrowRight') {
          setCurrentImageIndex((prev) => {
            const newIndex = prev === selectedProject.images.length - 1 ? 0 : prev + 1;
            setImageZoom(1);
            setImagePosition({ x: 0, y: 0 });
            return newIndex;
          });
        }
      }
      
      // Zoom controls
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setImageZoom(prev => Math.min(prev + 0.25, 3));
      } else if (e.key === '-') {
        e.preventDefault();
        setImageZoom(prev => Math.max(prev - 0.25, 0.5));
      } else if (e.key === '0') {
        e.preventDefault();
        setImageZoom(1);
        setImagePosition({ x: 0, y: 0 });
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedProject]);

  // Add non-passive wheel event listener for zoom
  useEffect(() => {
    if (!selectedProject || !imageContainerRef.current) return;

    const container = imageContainerRef.current;
    
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        if (e.deltaY < 0) {
          setImageZoom(prev => Math.min(prev + 0.25, 3));
        } else {
          setImageZoom(prev => Math.max(prev - 0.25, 0.5));
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [selectedProject]);

  // Also handle overflow for image slider
  useEffect(() => {
    if (typeof document === 'undefined' || !document.body) return;
    
    if (showImageSlider) {
      // Overflow will be managed by ImageSlider component
      // But ensure it's set here as backup
      document.body.style.overflow = 'hidden';
    } else {
      // Reset overflow when slider closes
      document.body.style.overflow = '';
    }
    
    return () => {
      if (typeof document !== 'undefined' && document.body) {
        document.body.style.overflow = '';
      }
    };
  }, [showImageSlider]);

  // Ensure overflow is reset if slider fails to open
  useEffect(() => {
    if (!showImageSlider) {
      // Reset overflow when slider is closed
      if (typeof document !== 'undefined' && document.body) {
        document.body.style.overflow = '';
      }
    }
  }, [showImageSlider]);

  return (
    <div className="portfolio-details-page">
      {/* Image Slider */}
      {showImageSlider && sliderImages.length > 0 && sliderTitle && (
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
          <div 
            className="project-modal-content"
            style={{
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
            }} 
            onClick={(e) => e.stopPropagation()}
          >
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
            
            
            {/* Project Image - Show current image from array if available */}
            <div 
              ref={imageContainerRef}
              className="modal-project-image" 
              style={{ 
                marginBottom: '20px', 
                width: '100%', 
                position: 'relative',
                overflow: imageZoom > 1 ? 'auto' : 'hidden',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                minHeight: '250px',
                maxHeight: imageZoom > 1 ? 'none' : '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseDown={handleImageMouseDown}
              onMouseMove={handleImageMouseMove}
              onMouseUp={handleImageMouseUp}
              onMouseLeave={handleImageMouseUp}
            >
              {selectedProject.images && selectedProject.images.length > 0 ? (
                <>
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    overflow: imageZoom > 1 ? 'auto' : 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: imageZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                  }}>
                    <Image 
                      src={selectedProject.images[currentImageIndex] || selectedProject.image} 
                      alt={selectedProject.title}
                      width={800}
                      height={300}
                      style={{
                        width: '100%',
                        height: 'auto',
                        minHeight: '250px',
                        maxHeight: '400px',
                        objectFit: 'contain',
                        transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageZoom})`,
                        transformOrigin: 'center center',
                        transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                        cursor: imageZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                        userSelect: 'none',
                        display: 'block'
                      }}
                      draggable={false}
                    />
                  </div>
                  {/* Navigation Arrows */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => {
                            const newIndex = prev === 0 ? selectedProject.images.length - 1 : prev - 1;
                            setImageZoom(1);
                            setImagePosition({ x: 0, y: 0 });
                            return newIndex;
                          });
                        }}
                        style={{
                          position: 'absolute',
                          left: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(0, 0, 0, 0.7)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          cursor: 'pointer',
                          fontSize: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 15,
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
                        onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
                      >
                        ‹
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => {
                            const newIndex = prev === selectedProject.images.length - 1 ? 0 : prev + 1;
                            setImageZoom(1);
                            setImagePosition({ x: 0, y: 0 });
                            return newIndex;
                          });
                        }}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(0, 0, 0, 0.7)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          cursor: 'pointer',
                          fontSize: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 15,
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
                        onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
                      >
                        ›
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: imageZoom > 1 ? 'auto' : 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: imageZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}>
              <Image 
                src={selectedProject.image} 
                alt={selectedProject.title}
                width={800}
                    height={300}
                style={{
                  width: '100%',
                      height: 'auto',
                      minHeight: '250px',
                      maxHeight: '400px',
                      objectFit: 'contain',
                      transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageZoom})`,
                      transformOrigin: 'center center',
                      transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                      cursor: imageZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                      userSelect: 'none',
                      display: 'block'
                    }}
                    draggable={false}
                  />
                </div>
              )}
              
              {/* Zoom Controls */}
              <div style={{
                position: 'absolute',
                bottom: '15px',
                right: '15px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                background: 'rgba(0, 0, 0, 0.7)',
                padding: '8px 12px',
                borderRadius: '25px',
                backdropFilter: 'blur(10px)',
                zIndex: 20
              }}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Zoom Out button clicked, current zoom:', imageZoom);
                    zoomOut();
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                  title="Zoom Out (-)"
                >
                  −
                </button>
                <span style={{
                  color: 'white',
                  fontSize: '0.9rem',
                  minWidth: '50px',
                  textAlign: 'center',
                  fontWeight: '500'
                }}>
                  {Math.round(imageZoom * 100)}%
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Zoom In button clicked, current zoom:', imageZoom);
                    zoomIn();
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                  title="Zoom In (+)"
                >
                  +
                </button>
                {imageZoom > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resetZoom();
                    }}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      marginLeft: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                    title="Reset Zoom (0)"
                  >
                    0
                  </button>
                )}
              </div>
            </div>
            
            {/* Image Pagination Dots */}
            {selectedProject.images && selectedProject.images.length > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '20px',
                flexWrap: 'wrap'
              }}>
                {selectedProject.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    style={{
                      width: currentImageIndex === index ? '30px' : '10px',
                      height: '10px',
                      borderRadius: '5px',
                      border: 'none',
                      background: currentImageIndex === index ? '#89C3E5' : 'rgba(255, 255, 255, 0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0
                    }}
                  />
                ))}
              </div>
            )}
            
            {/* Project Info */}
            <h2 className="modal-project-title" style={{ 
              marginBottom: '15px', 
              background: 'linear-gradient(45deg, #89C3E5, #ffffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '700'
            }}>
              {selectedProject.title}
            </h2>
            
            <p className="modal-project-description" style={{ 
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
                {selectedProject.technologies && selectedProject.technologies.length > 0 ? (
                  selectedProject.technologies.map((tech, index) => (
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
                  ))
                ) : (
                  <span style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '0.85rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    Not specified
                  </span>
                )}
              </div>
            </div>
            
            {/* Image Counter */}
            {selectedProject.images && selectedProject.images.length > 1 && (
              <div style={{
                textAlign: 'center',
                marginBottom: '15px',
                fontSize: '0.9rem',
                opacity: 0.8,
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                Image {currentImageIndex + 1} of {selectedProject.images.length}
              </div>
            )}
            
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
