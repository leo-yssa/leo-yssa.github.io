import { FaChevronUp, FaGithub, FaStackOverflow, FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import styles from './Footer.module.css';

const Footer = () => {
    const { t } = useLanguage();
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.copyright}>
                        <p>
                            {t('footer.copyright').replace('{year}', String(currentYear))}
                        </p>
                    </div>

                    <div className={styles.top} onClick={scrollToTop}>
                        <FaChevronUp />
                    </div>

                    <div className={styles.social}>
                        <a href="https://github.com/leo-yssa" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <FaGithub />
                        </a>
                        <a href="https://stackoverflow.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <FaStackOverflow />
                        </a>
                        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
