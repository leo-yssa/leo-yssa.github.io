import { FaBriefcase } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { content, ExperienceItem } from '../data/portfolio';
import styles from './Experience.module.css';

const Experience = () => {
    const { language, t } = useLanguage();
    const experienceData: ExperienceItem[] = content[language]?.experience || [];

    return (
        <section id="experience" className={styles.section}>
            <h2 className="heading">{t('experience.title')}</h2>
            <div className={styles.timeline}>
                {experienceData.map((item, index) => (
                    <div key={index} className={styles.timelineBlock}>
                        <div className={styles.timelineDate}>
                            {item.date}
                        </div>
                        <div className={styles.timelineIcon}>
                            <FaBriefcase />
                        </div>
                        <div className={styles.timelineContent}>
                            <h3>{item.company}</h3>
                            <h4>{item.title}</h4>
                            <ul className={styles.list}>
                                {item.items.map((desc: string, i: number) => (
                                    <li key={i}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
