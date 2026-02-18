import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/portfolio';
import styles from './About.module.css';

const About = () => {
    const { language, t } = useLanguage();
    const aboutText = content[language]?.about || '';

    return (
        <section id="about" className={styles.section}>
            <h2 className="heading">{t('about.title')}</h2>
            <div className={styles.content}>
                <p className={styles.text}>
                    {aboutText}
                </p>
            </div>
        </section>
    );
};

export default About;
