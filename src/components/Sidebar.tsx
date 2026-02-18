import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaUser, FaBriefcase, FaGraduationCap, FaCode, FaLaptopCode, FaGithub, FaLinkedin, FaBars, FaTimes, FaEnvelope, FaPen } from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const { language, toggleLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    const navItems = [
        { id: 'about', icon: <FaUser />, label: 'nav.about' },
        { id: 'experience', icon: <FaBriefcase />, label: 'nav.experience' },
        { id: 'education', icon: <FaGraduationCap />, label: 'nav.education' },
        { id: 'projects', icon: <FaLaptopCode />, label: 'nav.projects' },
        { id: 'skills', icon: <FaCode />, label: 'nav.skills' },
        { id: 'certifications', icon: <FaCode />, label: 'nav.certifications' },
    ];

    const handleNavClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
            setIsOpen(false);
        }
    };

    return (
        <>
            <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.profile}>
                    <div className={styles.profileImageContainer}>
                        {/* Ideally replace with actual profile image */}
                        <img src="/images/lead-bg.png" alt="Profile" className={styles.profileImage} />
                    </div>
                    <h2 className={styles.name}>Youngsoo(Leo) Sa</h2>
                    <p className={styles.role}>{t('hero.role')}</p>
                </div>

                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {navItems.map((item) => (
                            <li key={item.id} className={styles.navItem}>
                                <a
                                    href={`#${item.id}`}
                                    className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                                >
                                    <span className={styles.icon}>{item.icon}</span>
                                    {t(item.label)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={styles.footer}>
                    <div className={styles.langToggle}>
                        <button
                            className={`${styles.langBtn} ${language === 'ko' ? styles.active : ''}`}
                            onClick={() => language !== 'ko' && toggleLanguage()}
                        >
                            KR
                        </button>
                        <button
                            className={`${styles.langBtn} ${language === 'en' ? styles.active : ''}`}
                            onClick={() => language !== 'en' && toggleLanguage()}
                        >
                            EN
                        </button>
                    </div>

                    <div className={styles.social}>
                        <a href="mailto:yssa@kakao.com" className={styles.socialLink} title="Email">
                            <FaEnvelope />
                        </a>
                        <a href="https://yssa.tistory.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="Blog">
                            <FaPen />
                        </a>
                        <a href="https://github.com/leo-yssa" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <FaGithub />
                        </a>
                        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
