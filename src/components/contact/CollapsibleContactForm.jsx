import { useState } from 'react';
import Image from 'next/image';

// Use relative API paths for production compatibility
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export default function CollapsibleContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errors, setErrors] = useState({});

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
      // Try the Next.js API route first (now with direct credentials)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: 'Collapsible Contact Form - Project Inquiry',
          message: formData.project
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', project: '' });
        // Auto-close form after 3 seconds
        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus(null);
        }, 3000);
      } else {
        // If API fails, try alternative method
        console.log('API failed:', result);
        console.log('Trying alternative method...');
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
      const subject = encodeURIComponent('Collapsible Contact Form - Project Inquiry');
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Project Description: ${formData.project}

This inquiry was submitted through the collapsible contact form on the website.
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
      
      // Auto-close form after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      console.error('Alternative submission failed:', error);
      setSubmitStatus('error');
    }
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-contact-form">
      {/* Discount Banner */}
      <div className={`discount-banner ${isOpen ? 'open' : ''}`} onClick={toggleForm}>
        <div className="discount-content">
          <div className="discount-icon">
            <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
          </div>
          <div className="discount-text">
            <h3>GET IN TOUCH</h3>
            <p>We’re ready to collaborate.</p>
          </div>
        </div>
      </div>

      {/* Collapsible Form */}
      <div className={`contact-form-container ${isOpen ? 'open' : ''}`}>
        <div className="form-header">
          <h3>PING US ANYTIME</h3>
          <p>We’re ready to collaborate.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="contact-form">
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
              rows="4"
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
            className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
