import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// Use relative API paths for production compatibility
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

// Country data with flags
const countries = [
  { code: '+1', flag: '🇺🇸', name: 'US' },
  { code: '+92', flag: '🇵🇰', name: 'PK' },
  { code: '+44', flag: '🇬🇧', name: 'GB' },
  { code: '+91', flag: '🇮🇳', name: 'IN' },
  { code: '+971', flag: '🇦🇪', name: 'AE' },
  { code: '+33', flag: '🇫🇷', name: 'FR' },
  { code: '+49', flag: '🇩🇪', name: 'DE' },
  { code: '+39', flag: '🇮🇹', name: 'IT' },
  { code: '+34', flag: '🇪🇸', name: 'ES' },
  { code: '+31', flag: '🇳🇱', name: 'NL' },
  { code: '+46', flag: '🇸🇪', name: 'SE' },
  { code: '+47', flag: '🇳🇴', name: 'NO' },
  { code: '+45', flag: '🇩🇰', name: 'DK' },
  { code: '+41', flag: '🇨🇭', name: 'CH' },
  { code: '+43', flag: '🇦🇹', name: 'AT' },
  { code: '+32', flag: '🇧🇪', name: 'BE' },
  { code: '+351', flag: '🇵🇹', name: 'PT' },
  { code: '+30', flag: '🇬🇷', name: 'GR' },
  { code: '+90', flag: '🇹🇷', name: 'TR' },
  { code: '+20', flag: '🇪🇬', name: 'EG' },
  { code: '+966', flag: '🇸🇦', name: 'SA' },
  { code: '+974', flag: '🇶🇦', name: 'QA' },
  { code: '+965', flag: '🇰🇼', name: 'KW' },
  { code: '+973', flag: '🇧🇭', name: 'BH' },
  { code: '+968', flag: '🇴🇲', name: 'OM' },
  { code: '+60', flag: '🇲🇾', name: 'MY' },
  { code: '+65', flag: '🇸🇬', name: 'SG' },
  { code: '+66', flag: '🇹🇭', name: 'TH' },
  { code: '+63', flag: '🇵🇭', name: 'PH' },
  { code: '+62', flag: '🇮🇩', name: 'ID' },
  { code: '+84', flag: '🇻🇳', name: 'VN' },
  { code: '+86', flag: '🇨🇳', name: 'CN' },
  { code: '+81', flag: '🇯🇵', name: 'JP' },
  { code: '+82', flag: '🇰🇷', name: 'KR' },
  { code: '+61', flag: '🇦🇺', name: 'AU' },
  { code: '+64', flag: '🇳🇿', name: 'NZ' },
  { code: '+27', flag: '🇿🇦', name: 'ZA' },
  { code: '+234', flag: '🇳🇬', name: 'NG' },
  { code: '+254', flag: '🇰🇪', name: 'KE' },
  { code: '+212', flag: '🇲🇦', name: 'MA' },
  { code: '+213', flag: '🇩🇿', name: 'DZ' },
  { code: '+216', flag: '🇹🇳', name: 'TN' },
  { code: '+218', flag: '🇱🇾', name: 'LY' },
  { code: '+249', flag: '🇸🇩', name: 'SD' },
  { code: '+251', flag: '🇪🇹', name: 'ET' },
  { code: '+255', flag: '🇹🇿', name: 'TZ' },
  { code: '+256', flag: '🇺🇬', name: 'UG' },
  { code: '+250', flag: '🇷🇼', name: 'RW' },
  { code: '+257', flag: '🇧🇮', name: 'BI' },
  { code: '+258', flag: '🇲🇿', name: 'MZ' },
  { code: '+260', flag: '🇿🇲', name: 'ZM' },
  { code: '+263', flag: '🇿🇼', name: 'ZW' },
  { code: '+264', flag: '🇳🇦', name: 'NA' },
  { code: '+267', flag: '🇧🇼', name: 'BW' },
  { code: '+268', flag: '🇸🇿', name: 'SZ' },
  { code: '+269', flag: '🇰🇲', name: 'KM' },
  { code: '+290', flag: '🇸🇭', name: 'SH' },
  { code: '+291', flag: '🇪🇷', name: 'ER' },
  { code: '+297', flag: '🇦🇼', name: 'AW' },
  { code: '+298', flag: '🇫🇴', name: 'FO' },
  { code: '+299', flag: '🇬🇱', name: 'GL' },
  { code: '+350', flag: '🇬🇮', name: 'GI' },
  { code: '+352', flag: '🇱🇺', name: 'LU' },
  { code: '+353', flag: '🇮🇪', name: 'IE' },
  { code: '+354', flag: '🇮🇸', name: 'IS' },
  { code: '+355', flag: '🇦🇱', name: 'AL' },
  { code: '+356', flag: '🇲🇹', name: 'MT' },
  { code: '+357', flag: '🇨🇾', name: 'CY' },
  { code: '+358', flag: '🇫🇮', name: 'FI' },
  { code: '+359', flag: '🇧🇬', name: 'BG' },
  { code: '+370', flag: '🇱🇹', name: 'LT' },
  { code: '+371', flag: '🇱🇻', name: 'LV' },
  { code: '+372', flag: '🇪🇪', name: 'EE' },
  { code: '+373', flag: '🇲🇩', name: 'MD' },
  { code: '+374', flag: '🇦🇲', name: 'AM' },
  { code: '+375', flag: '🇧🇾', name: 'BY' },
  { code: '+376', flag: '🇦🇩', name: 'AD' },
  { code: '+377', flag: '🇲🇨', name: 'MC' },
  { code: '+378', flag: '🇸🇲', name: 'SM' },
  { code: '+380', flag: '🇺🇦', name: 'UA' },
  { code: '+381', flag: '🇷🇸', name: 'RS' },
  { code: '+382', flag: '🇲🇪', name: 'ME' },
  { code: '+383', flag: '🇽🇰', name: 'XK' },
  { code: '+385', flag: '🇭🇷', name: 'HR' },
  { code: '+386', flag: '🇸🇮', name: 'SI' },
  { code: '+387', flag: '🇧🇦', name: 'BA' },
  { code: '+389', flag: '🇲🇰', name: 'MK' },
  { code: '+420', flag: '🇨🇿', name: 'CZ' },
  { code: '+421', flag: '🇸🇰', name: 'SK' },
  { code: '+423', flag: '🇱🇮', name: 'LI' },
  { code: '+500', flag: '🇫🇰', name: 'FK' },
  { code: '+501', flag: '🇧🇿', name: 'BZ' },
  { code: '+502', flag: '🇬🇹', name: 'GT' },
  { code: '+503', flag: '🇸🇻', name: 'SV' },
  { code: '+504', flag: '🇭🇳', name: 'HN' },
  { code: '+505', flag: '🇳🇮', name: 'NI' },
  { code: '+506', flag: '🇨🇷', name: 'CR' },
  { code: '+507', flag: '🇵🇦', name: 'PA' },
  { code: '+508', flag: '🇵🇲', name: 'PM' },
  { code: '+509', flag: '🇭🇹', name: 'HT' },
  { code: '+590', flag: '🇬🇵', name: 'GP' },
  { code: '+591', flag: '🇧🇴', name: 'BO' },
  { code: '+592', flag: '🇬🇾', name: 'GY' },
  { code: '+593', flag: '🇪🇨', name: 'EC' },
  { code: '+594', flag: '🇬🇫', name: 'GF' },
  { code: '+595', flag: '🇵🇾', name: 'PY' },
  { code: '+596', flag: '🇲🇶', name: 'MQ' },
  { code: '+597', flag: '🇸🇷', name: 'SR' },
  { code: '+598', flag: '🇺🇾', name: 'UY' },
  { code: '+599', flag: '🇧🇶', name: 'BQ' },
  { code: '+670', flag: '🇹🇱', name: 'TL' },
  { code: '+672', flag: '🇦🇶', name: 'AQ' },
  { code: '+673', flag: '🇧🇳', name: 'BN' },
  { code: '+674', flag: '🇳🇷', name: 'NR' },
  { code: '+675', flag: '🇵🇬', name: 'PG' },
  { code: '+676', flag: '🇹🇴', name: 'TO' },
  { code: '+677', flag: '🇸🇧', name: 'SB' },
  { code: '+678', flag: '🇻🇺', name: 'VU' },
  { code: '+679', flag: '🇫🇯', name: 'FJ' },
  { code: '+680', flag: '🇵🇼', name: 'PW' },
  { code: '+681', flag: '🇼🇫', name: 'WF' },
  { code: '+682', flag: '🇨🇰', name: 'CK' },
  { code: '+683', flag: '🇳🇺', name: 'NU' },
  { code: '+684', flag: '🇦🇸', name: 'AS' },
  { code: '+685', flag: '🇼🇸', name: 'WS' },
  { code: '+686', flag: '🇰🇮', name: 'KI' },
  { code: '+687', flag: '🇳🇨', name: 'NC' },
  { code: '+688', flag: '🇹🇻', name: 'TV' },
  { code: '+689', flag: '🇵🇫', name: 'PF' },
  { code: '+690', flag: '🇹🇰', name: 'TK' },
  { code: '+691', flag: '🇫🇲', name: 'FM' },
  { code: '+692', flag: '🇲🇭', name: 'MH' },
  { code: '+850', flag: '🇰🇵', name: 'KP' },
  { code: '+852', flag: '🇭🇰', name: 'HK' },
  { code: '+853', flag: '🇲🇴', name: 'MO' },
  { code: '+855', flag: '🇰🇭', name: 'KH' },
  { code: '+856', flag: '🇱🇦', name: 'LA' },
  { code: '+880', flag: '🇧🇩', name: 'BD' },
  { code: '+886', flag: '🇹🇼', name: 'TW' },
  { code: '+960', flag: '🇲🇻', name: 'MV' },
  { code: '+961', flag: '🇱🇧', name: 'LB' },
  { code: '+962', flag: '🇯🇴', name: 'JO' },
  { code: '+963', flag: '🇸🇾', name: 'SY' },
  { code: '+964', flag: '🇮🇶', name: 'IQ' },
  { code: '+965', flag: '🇰🇼', name: 'KW' },
  { code: '+966', flag: '🇸🇦', name: 'SA' },
  { code: '+967', flag: '🇾🇪', name: 'YE' },
  { code: '+968', flag: '🇴🇲', name: 'OM' },
  { code: '+970', flag: '🇵🇸', name: 'PS' },
  { code: '+971', flag: '🇦🇪', name: 'AE' },
  { code: '+972', flag: '🇮🇱', name: 'IL' },
  { code: '+973', flag: '🇧🇭', name: 'BH' },
  { code: '+974', flag: '🇶🇦', name: 'QA' },
  { code: '+975', flag: '🇧🇹', name: 'BT' },
  { code: '+976', flag: '🇲🇳', name: 'MN' },
  { code: '+977', flag: '🇳🇵', name: 'NP' },
  { code: '+992', flag: '🇹🇯', name: 'TJ' },
  { code: '+993', flag: '🇹🇲', name: 'TM' },
  { code: '+994', flag: '🇦🇿', name: 'AZ' },
  { code: '+995', flag: '🇬🇪', name: 'GE' },
  { code: '+996', flag: '🇰🇬', name: 'KG' },
  { code: '+998', flag: '🇺🇿', name: 'UZ' }
];

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
  
  // Country code dropdown state
  const [selectedCountry, setSelectedCountry] = useState({ code: '+1', flag: '🇺🇸', name: 'US' });
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef(null);

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

  // Handle country selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              <div className="country-dropdown" ref={countryDropdownRef}>
                <button
                  type="button"
                  className="country-code-btn"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                >
                  <span className="country-flag">{selectedCountry.flag}</span>
                  <span className="country-code-text">{selectedCountry.code}</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                
                {isCountryDropdownOpen && (
                  <div className="country-dropdown-menu">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        className={`country-option ${selectedCountry.code === country.code ? 'selected' : ''}`}
                        onClick={() => handleCountrySelect(country)}
                      >
                        <span className="country-flag">{country.flag}</span>
                        <span className="country-code-text">{country.code}</span>
                        <span className="country-name">{country.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
