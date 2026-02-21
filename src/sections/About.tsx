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

                {content[language]?.motto && (
                    <div className={styles.mottoContainer}>
                        <div className={styles.mottoHeader}>
                            <span className={styles.mottoLabel}>{t('about.motto')}</span>
                            <span className={styles.philosopherLabel}>{t('about.philosopher')}: {content[language].motto.author}</span>
                        </div>
                        <blockquote className={styles.blockquote}>
                            <p>"{content[language].motto.quote}"</p>
                        </blockquote>

                        <div className={styles.storySection}>
                            <h3 className={styles.storyTitle}>{t('about.story')}</h3>
                            <p className={styles.storyText}>{content[language].motto.story}</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default About;
