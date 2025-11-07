import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

const ImageSlider = ({ images, projectTitle, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const imageContainerRef = useRef(null);

  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    resetZoom();
  }, [images.length, resetZoom]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    resetZoom();
  }, [images.length, resetZoom]);

  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  }, []);

  // Handle wheel event with non-passive listener to allow preventDefault
  useEffect(() => {
    if (!isMounted || !imageContainerRef.current) return;

    const container = imageContainerRef.current;
    
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    };

    // Add non-passive wheel event listener
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isMounted, zoomIn, zoomOut]);

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mount check and body overflow management
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Keyboard navigation and body overflow management
  useEffect(() => {
    if (!isMounted) return;
    
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        zoomIn();
      } else if (e.key === '-') {
        e.preventDefault();
        zoomOut();
      } else if (e.key === '0') {
        e.preventDefault();
        resetZoom();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    
    // Set overflow hidden when slider is visible
    if (typeof document !== 'undefined' && document.body) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      // Always reset overflow when component unmounts or closes
      if (typeof document !== 'undefined' && document.body) {
        document.body.style.overflow = '';
      }
    };
  }, [isMounted, onClose, prevImage, nextImage, zoomIn, zoomOut, resetZoom]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetZoom();
  };

  // Don't render until mounted
  if (!isMounted || typeof document === 'undefined' || !document.body) {
    return null;
  }

  // Render directly without portal - use fixed positioning to cover screen
  // This avoids the React portal container issue entirely
  return (
    <>
      <style jsx>{`
        /* Mobile Responsive Styles for Image Slider */
        @media only screen and (max-width: 767px) {
          .image-slider-cursor-fix {
            padding: 0 !important;
          }
          
          .image-slider-container {
            max-width: 100vw !important;
            max-height: 100vh !important;
            width: 100vw !important;
            height: 100vh !important;
            border-radius: 0 !important;
          }
          
          .image-slider-header {
            padding: 15px 10px 10px 10px !important;
            flex-direction: column !important;
            gap: 15px !important;
            align-items: center !important;
          }
          
          .image-slider-header h3 {
            font-size: 18px !important;
            line-height: 1.3 !important;
            text-align: center !important;
            padding: 0 40px 0 10px !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            hyphens: auto !important;
          }
          
          .image-slider-header p {
            font-size: 12px !important;
            margin: 3px 0 !important;
          }
          
          .zoom-hint-text {
            display: none !important;
          }
          
          .zoom-controls {
            width: 100% !important;
            justify-content: center !important;
            gap: 5px !important;
            order: 2 !important;
          }
          
          .zoom-controls button {
            width: 32px !important;
            height: 32px !important;
            font-size: 14px !important;
          }
          
          .zoom-controls span {
            font-size: 0.75rem !important;
            min-width: 40px !important;
            padding: 4px 8px !important;
          }
          
          .header-title-section {
            order: 1 !important;
            width: 100% !important;
            position: relative !important;
            padding: 0 30px !important;
          }
          
          .header-spacer {
            display: none !important;
          }
          
          .image-slider-close-btn {
            top: 10px !important;
            right: 10px !important;
            width: 35px !important;
            height: 35px !important;
            font-size: 18px !important;
            z-index: 100 !important;
          }
          
          .image-slider-main {
            padding: 15px 10px !important;
            min-height: 40vh !important;
            max-height: 50vh !important;
          }
          
          .image-slider-main img {
            max-height: 45vh !important;
            width: 100% !important;
            object-fit: contain !important;
          }
          
          .nav-arrow-btn {
            width: 40px !important;
            height: 40px !important;
            font-size: 18px !important;
          }
          
          .nav-arrow-btn.prev {
            left: 5px !important;
          }
          
          .nav-arrow-btn.next {
            right: 5px !important;
          }
          
          .thumbnail-container {
            padding: 15px 10px !important;
            gap: 8px !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }
          
          .thumbnail-container::-webkit-scrollbar {
            height: 4px !important;
          }
          
          .thumbnail-btn {
            width: 60px !important;
            height: 45px !important;
            flex-shrink: 0 !important;
          }
        }
        
        @media only screen and (max-width: 480px) {
          .image-slider-header h3 {
            font-size: 16px !important;
            padding: 0 35px 0 5px !important;
          }
          
          .image-slider-main {
            padding: 10px 5px !important;
            min-height: 35vh !important;
            max-height: 45vh !important;
          }
          
          .image-slider-main img {
            max-height: 40vh !important;
          }
          
          .zoom-controls button {
            width: 28px !important;
            height: 28px !important;
            font-size: 12px !important;
          }
          
          .zoom-controls span {
            font-size: 0.7rem !important;
            min-width: 35px !important;
            padding: 3px 6px !important;
          }
          
          .nav-arrow-btn {
            width: 35px !important;
            height: 35px !important;
            font-size: 16px !important;
          }
          
          .thumbnail-btn {
            width: 50px !important;
            height: 38px !important;
          }
        }
      `}</style>
      <div 
        className="image-slider-cursor-fix"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999999,
          padding: '20px',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          visibility: 'visible',
          opacity: 1,
          cursor: 'default',
          pointerEvents: 'auto',
          margin: 0
        }}
      >
      <div 
        className="image-slider-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '90vh',
          width: '100%',
          background: 'radial-gradient(circle at left top, #030711, #3a6391, #89C3E5)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          color: 'white'
        }}
      >
        {/* Close Button */}
        <button 
          className="image-slider-close-btn"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer !important',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
        >
          ×
        </button>

        {/* Header */}
        <div className="image-slider-header" style={{
          padding: '20px 20px 10px 20px',
          background: 'linear-gradient(135deg, #030711, #3a6391, #89C3E5)',
          color: 'white',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Zoom Controls - Left Side */}
          <div className="zoom-controls" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={zoomOut}
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '6px',
                width: '35px',
                height: '35px',
                cursor: 'pointer !important',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}
              title="Zoom Out (-)"
            >
              −
            </button>
            
            <span style={{ 
              fontSize: '0.9rem', 
              minWidth: '50px', 
              textAlign: 'center',
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '4px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
            }}>
              {Math.round(zoomLevel * 100)}%
            </span>
            
            <button
              onClick={zoomIn}
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '6px',
                width: '35px',
                height: '35px',
                cursor: 'pointer !important',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}
              title="Zoom In (+)"
            >
              +
            </button>
            
            <button
              onClick={resetZoom}
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '6px',
                width: '35px',
                height: '35px',
                cursor: 'pointer !important',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}
              title="Reset Zoom (0)"
            >
              ⌂
            </button>
          </div>
          
          <div className="header-title-section" style={{ flex: 1, textAlign: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.5rem', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{projectTitle}</h3>
            <p style={{ margin: '5px 0 0 0', opacity: 0.8 }}>{currentIndex + 1} / {images.length}</p>
            <p className="zoom-hint-text" style={{ margin: '5px 0 0 0', opacity: 0.6, fontSize: '0.8rem' }}>
              Use mouse wheel or +/- keys to zoom • Drag to pan when zoomed
            </p>
          </div>
          
          {/* Empty div for balance */}
          <div className="header-spacer" style={{ width: '200px' }}></div>
        </div>

        {/* Main Image Container */}
        <div 
          ref={imageContainerRef}
          className="image-slider-main"
          style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            overflow: 'hidden',
            cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Navigation Arrows */}
          <button 
            className="nav-arrow-btn prev"
            onClick={prevImage}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer !important',
              zIndex: 5,
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
          >
            ‹
          </button>
          
          <button 
            className="nav-arrow-btn next"
            onClick={nextImage}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer !important',
              zIndex: 5,
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
          >
            ›
          </button>

          {/* Main Image */}
          <div
            style={{
              transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease',
              transformOrigin: 'center center',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          >
            <Image
              src={images[currentIndex]}
              alt={`${projectTitle} - Image ${currentIndex + 1}`}
              width={800}
              height={600}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '60vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="thumbnail-container" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          overflowX: 'auto'
        }}>
          {images.map((image, index) => (
            <button
              key={index}
              className="thumbnail-btn"
              onClick={() => goToSlide(index)}
              style={{
                width: '80px',
                height: '60px',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer !important',
                border: index === currentIndex ? '3px solid #89C3E5' : '2px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: 0,
                flexShrink: 0
              }}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={60}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ImageSlider;
