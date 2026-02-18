import { useLanguage } from '../context/LanguageContext';
import { content } from '../data';
import styles from './About.module.css';

const About = () => {
    const { language, t } = useLanguage();
    const aboutText = content[language]?.about || '';

    return (
        <section id="about" className={styles.section}>
            <div className="container">
                <div className={styles.row}>
                    <div className={styles.headerCol}>
                        <h2 className="heading">{t('about.title')}</h2>
                    </div>
                    <div className={styles.contentCol}>
                        <p className={styles.text}>
                            {aboutText}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
