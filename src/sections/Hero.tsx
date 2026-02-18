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
            <div className={styles.scrollDown} onClick={scrollToAbout}>
                <div className={styles.scrollIcon}>
                    <FaChevronDown />
                </div>
            </div>
        </section>
    );
};

export default Hero;
