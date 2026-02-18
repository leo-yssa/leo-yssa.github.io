import { FaChevronDown } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import styles from './Hero.module.css';

const Hero = () => {
    const { t } = useLanguage();

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className={styles.hero}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <h1 className={styles.title}>Youngsoo(Leo) Sa</h1>
                <h2 className={styles.subtitle}>{t('hero.role')}</h2>
                <div className={styles.cta}>
                    <a href="#" className="btn-rounded-white">{t('hero.resume')}</a>
                </div>
            </div>
            <div className={styles.scrollDown} onClick={scrollToAbout}>
                <div className={styles.scrollIcon}>
                    <FaChevronDown />
                </div>
            </div>
        </section>
    );
};

export default Hero;
