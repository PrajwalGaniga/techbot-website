import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clubLogo from '../assets/logo.png';
import '../styles/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 1. Handle Scroll Effect (Glassmorphism trigger)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. FIXED: Handle Body Scroll Lock based on state
  // This ensures scrolling is ALWAYS locked when menu is open, and released when closed.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // or 'unset'
    }

    // Cleanup: Ensure scroll is restored if component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Function to toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Helper to close menu on link click
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <div className="logo-wrapper">
            <img src={clubLogo} alt="TechBots Logo" className="header-logo-img" />
            <span className="brand-name">TECHBOTS<span>.</span></span>
          </div>
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className={`menu-toggle ${isOpen ? 'is-active' : ''}`} onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>

      {/* Navigation Overlay */}
      <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
        <div className="nav-center-links">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/team" onClick={closeMenu}>Team</Link>
          <Link to="/projects" onClick={closeMenu}>Projects</Link>
          <Link to="/workshops" onClick={closeMenu}>Workshop & Outreach</Link>
          <Link to="/achievements" onClick={closeMenu}>Achievements</Link>
          <Link to="/contact" className="mobile-cta" onClick={closeMenu}>Join Us</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;