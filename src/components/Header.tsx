import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Header.module.css';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    }
  };

  return (
    <>
      <div className={styles.mobileMenuToggle} onClick={toggleMobileMenu}>
        <FaBars />
      </div>

      <header className={`${styles.header} ${isSticky ? styles.sticky : ''} ${isMobileOpen ? styles.active : ''}`}>
        {isMobileOpen && (
          <div className={styles.fileClose} onClick={closeMobileMenu}>
            <FaTimes />
          </div>
        )}
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <a href="#about" className={styles.link} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
          </li>
          <li className={styles.menuItem}>
            <a href="#experience" className={styles.link} onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}>Experience</a>
          </li>
          <li className={styles.menuItem}>
            <a href="#education" className={styles.link} onClick={(e) => { e.preventDefault(); scrollToSection('education'); }}>Education</a>
          </li>
          <li className={styles.menuItem}>
            <a href="#projects" className={styles.link} onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a>
          </li>
          <li className={styles.menuItem}>
            <a href="#skills" className={styles.link} onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Skills</a>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
