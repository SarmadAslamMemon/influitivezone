import animationCharCome from "@/lib/utils/animationCharCome";
import animationWordCome from "@/lib/utils/animationWordCome";
import { useEffect, useRef, useState } from "react";

// Use relative API paths for production compatibility
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

const Contact1 = () => {
  const charAnim = useRef();
  const wordAnim = useRef();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errors, setErrors] = useState({});

  useEffect(() => {
    animationCharCome(charAnim.current);
    animationWordCome(wordAnim.current);
  }, []);

  // Handle input changes
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
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <section className="contact__area-6">
        <div className="container g-0 line pt-120 pb-110">
          <span className="line-3"></span>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="sec-title-wrapper">
                <h2 className="sec-title-2 animation__char_come" ref={charAnim}>
                  Let’s get in touch
                </h2>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="contact__text">
                <p>
                  {
                    "Great! We're excited to hear from you and let's start something special togerter. call us for any inquery."
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="row contact__btm">
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
              <div className="contact__info">
                <h3
                  className="sub-title-anim-top animation__word_come"
                  ref={wordAnim}
                >
                  {"Don't be afraid man ! "}
                  <br />
                  say hello
                </h3>
                <ul>
                  <li>
                    <a href="tel:+18562520922">+1 856-252-0922</a>
                  </li>
                  <li>
                    <a href="mailto:info@influitivezone.com">info@influitivezone.com</a>
                  </li>
                  <li>
                    <span>
                      55 Water St, PECK SLIP, NY 10038, United States, New York, NY, United States, New York
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
              <div className="contact__form">
                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="alert alert-success" style={{ 
                    padding: '15px', 
                    marginBottom: '20px', 
                    backgroundColor: '#d4edda', 
                    border: '1px solid #c3e6cb', 
                    borderRadius: '5px', 
                    color: '#155724' 
                  }}>
                    <i className="fa-solid fa-check-circle" style={{ marginRight: '8px' }}></i>
                    Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="alert alert-danger" style={{ 
                    padding: '15px', 
                    marginBottom: '20px', 
                    backgroundColor: '#f8d7da', 
                    border: '1px solid #f5c6cb', 
                    borderRadius: '5px', 
                    color: '#721c24' 
                  }}>
                    <i className="fa-solid fa-exclamation-triangle" style={{ marginRight: '8px' }}></i>
                    Sorry, there was an error sending your message. Please try again later.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-xxl-6 col-xl-6 col-12">
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="Name *" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className={errors.name ? 'error' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <div className="error-message" style={{ 
                          color: '#dc3545', 
                          fontSize: '12px', 
                          marginTop: '5px' 
                        }}>
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-12">
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="Email *" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'error' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <div className="error-message" style={{ 
                          color: '#dc3545', 
                          fontSize: '12px', 
                          marginTop: '5px' 
                        }}>
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-xxl-6 col-xl-6 col-12">
                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="Phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-12">
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject *"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={errors.subject ? 'error' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.subject && (
                        <div className="error-message" style={{ 
                          color: '#dc3545', 
                          fontSize: '12px', 
                          marginTop: '5px' 
                        }}>
                          {errors.subject}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-12">
                      <textarea
                        name="message"
                        placeholder="Messages *"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={errors.message ? 'error' : ''}
                        disabled={isSubmitting}
                        rows="5"
                      ></textarea>
                      {errors.message && (
                        <div className="error-message" style={{ 
                          color: '#dc3545', 
                          fontSize: '12px', 
                          marginTop: '5px' 
                        }}>
                          {errors.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="btn_wrapper">
                        <button 
                          type="submit"
                          className="wc-btn-primary btn-hover btn-item"
                          disabled={isSubmitting}
                          style={{ 
                            opacity: isSubmitting ? 0.7 : 1,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer'
                          }}
                        >
                          <span></span> 
                          {isSubmitting ? (
                            <>
                              <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send <br />
                              Messages <i className="fa-solid fa-arrow-right"></i>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact1;
