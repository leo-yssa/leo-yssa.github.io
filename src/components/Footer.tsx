import { FaChevronUp, FaGithub, FaStackOverflow, FaLinkedin, FaEnvelope, FaPen, FaFileAlt } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
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
                            {currentYear}
                        </p>
                    </div>

                    <div className={styles.top} onClick={scrollToTop}>
                        <FaChevronUp />
                    </div>

                    <div className={styles.social}>
                        <div className={styles.socialLink} data-tooltip="Email" onClick={() => window.location.href = 'mailto:yssa@kakao.com'}>
                            <FaEnvelope />
                        </div>
                        <div className={styles.socialLink} data-tooltip="Blog" onClick={() => window.open('https://yssa.tistory.com', '_blank')}>
                            <FaPen />
                        </div>
                        <div className={styles.socialLink} data-tooltip="GitHub" onClick={() => window.open('https://github.com/leo-yssa', '_blank')}>
                            <FaGithub />
                        </div>
                        <div className={styles.socialLink} data-tooltip="Stack Overflow" onClick={() => window.open('https://stackoverflow.com/', '_blank')}>
                            <FaStackOverflow />
                        </div>
                        <div className={styles.socialLink} data-tooltip="LinkedIn" onClick={() => window.open('https://linkedin.com/', '_blank')}>
                            <FaLinkedin />
                        </div>
                        <div className={styles.socialLink} data-tooltip="Resume" onClick={() => window.open('/resume.html', '_blank')}>
                            <FaFileAlt />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
