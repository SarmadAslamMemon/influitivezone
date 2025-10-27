import { useEffect, useRef, useState } from "react";
import Canvas from "../canvas/Canvas";
import Link from "next/link";
import LogoWhite2 from "../../../public/assets/imgs/logo/site-logo-white-2.png";
import MenuWhite from "../../../public/assets/imgs/icon/menu-white.png";
import Image from "next/image";

export default function Header3({ navData }) {
  const [topScroll, setTopScroll] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const ofCanvasArea = useRef();
  const headerArea = useRef();

  const handleTopScroll = () => {
    const position = window.pageYOffset;
    setTopScroll(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleTopScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleTopScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const openCanvas = () => {
    setIsMenuOpen(true);
    ofCanvasArea.current.style.opacity = "1";
    ofCanvasArea.current.style.visibility = "visible";
  };

  const closeCanvas = () => {
    setIsMenuOpen(false);
    ofCanvasArea.current.style.opacity = "0";
    ofCanvasArea.current.style.visibility = "hidden";
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEmailClick = (e) => {
    e.preventDefault();
    window.location.href = 'mailto:info@influitivezone.com';
  };

  const handlePhoneClick = (e) => {
    e.preventDefault();
    window.location.href = 'tel:+18562520922';
  };

  return (
    <>
      <header 
        className={`header__area header__dark ${topScroll > 20 ? 'scrolled' : ''}`} 
        ref={headerArea}
      >
        {/* Top Header Row - Contact Info */}
        <div className="header__top">
          <div className="header__top-inner">
            {/* Email above logo */}
            <div className="header__email">
              <a href="mailto:info@influitivezone.com" className="contact-email" onClick={handleEmailClick}>
                info@influitivezone.com
              </a>
            </div>

            {/* Empty center space */}
            <div className="header__top-center"></div>

            {/* Phone above button */}
            <div className="header__phone">
              <a href="tel:+18562520922" className="contact-phone" onClick={handlePhoneClick}>
                +1 856-252-0922
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Row */}
        <div className="header__main">
          <div className="header__main-inner">
            {/* Logo - Left Side */}
            <div className="header__logo">
              <Link href="/digital-agency">
                <Image 
                  priority
                  width={200}
                  height={66}
                  className="logo-primary"
                  src={LogoWhite2}
                  alt="Site Logo"
                  quality={100}
                  style={{ 
                    width: 'auto', 
                    height: '50px', 
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
                <Image 
                  priority
                  width={200}
                  height={66}
                  className="logo-secondary"
                  src={LogoWhite2}
                  alt="Site Logo"
                  quality={100}
                  style={{ 
                    width: 'auto', 
                    height: '50px', 
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Link>
            </div>

            {/* Navigation Menu - Center */}
            <nav className="header__nav">
              <ul className="header__menu">
                <li><Link href="/digital-agency">Home</Link></li>
                <li className="dropdown" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                  <Link href="/service" onClick={(e) => { e.preventDefault(); toggleDropdown(); }}>
                    Services <span className="dropdown-arrow">▼</span>
                  </Link>
                  <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                    <li><Link href="/service">Web Development</Link></li>
                    <li><Link href="/service">Mobile App Development</Link></li>
                    <li><Link href="/service">Interaction Design</Link></li>
                    <li><Link href="/service">Digital Marketing</Link></li>
                  </ul>
                </li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/portfolio">Portfolio</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </nav>

            {/* CTA Button - Right Side */}
            <div className="header__cta">
              <Link href="/contact" className="btn btn-primary">
                Let&apos;s Get Started
              </Link>
              <button 
                className="header__menu-toggle" 
                onClick={openCanvas}
                aria-label="Open menu"
              >
                <Image
                  priority
                  width={22}
                  height={22}
                  src={MenuWhite}
                  alt="Menu Icon"
                />
              </button>
            </div>
          </div>
        </div>
        
        <Canvas bladeMode={headerArea.current} ofCanvasArea={ofCanvasArea} />
      </header>
    </>
  );
}
