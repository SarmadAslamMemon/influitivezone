import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import TechnologyAnimation from '../../data/Technology.json';

export default function PopupContactForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errors, setErrors] = useState({});

  // Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.project.trim()) {
      newErrors.project = 'Project description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Try the Next.js API route first
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: 'Popup Contact Form - Project Inquiry',
          message: formData.project
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', project: '' });
        // Auto-close popup after 3 seconds
        setTimeout(() => {
          setIsVisible(false);
          setSubmitStatus(null);
        }, 3000);
      } else {
        // If API fails, try alternative method
        console.log('API failed:', result);
        await handleAlternativeSubmission();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Try alternative method
      await handleAlternativeSubmission();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Alternative submission method using mailto
  const handleAlternativeSubmission = async () => {
    try {
      const subject = encodeURIComponent('Popup Contact Form - Quick Inquiry');
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Project Description: ${formData.project}

This inquiry was submitted through the popup contact form on the website.
      `);
      
      // Create mailto link and open in same window
      const mailtoLink = `mailto:info@influitivezone.com?subject=${subject}&body=${body}`;
      
      // Try to open email client
      try {
        window.location.href = mailtoLink;
      } catch (e) {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`Email: info@influitivezone.com\nSubject: ${subject}\n\n${decodeURIComponent(body)}`);
        alert('Email client not available. Contact details copied to clipboard!');
      }
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', project: '' });
      
      // Auto-close popup after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      console.error('Alternative submission failed:', error);
      setSubmitStatus('error');
    }
  };

  const closePopup = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay popup-cursor-fix" onClick={closePopup}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="popup-close-btn" onClick={closePopup}>
          ×
        </button>

        {/* Main Content */}
        <div className="popup-content">
          {/* Left Side - Contact Form */}
          <div className="popup-form-section">
            <div className="popup-header">
              <h2 className="popup-title">CONTACT US</h2>
            </div>

            <form onSubmit={handleSubmit} className="popup-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email here"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <div className="phone-input">
                  <select className="country-code">
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+92">🇵🇰 +92</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <textarea
                  name="project"
                  placeholder="Talk About Your Project"
                  rows="3"
                  value={formData.project}
                  onChange={handleInputChange}
                  className={errors.project ? 'error' : ''}
                />
                {errors.project && <span className="error-message">{errors.project}</span>}
              </div>
              
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="success-message">
                  ✅ Thank you! Your message has been sent successfully. We&apos;ll contact you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="error-message-general">
                  ❌ Sorry, there was an error sending your message. Please try again or contact us directly at info@influitivezone.com
                </div>
              )}
              
              <button 
                type="submit" 
                className={`popup-submit-btn ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'CONTACT'}
              </button>
            </form>
          </div>

          {/* Right Side - Animation */}
          <div className="popup-animation-section">
            <div className="animation-container">
              <Lottie
                animationData={TechnologyAnimation}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
