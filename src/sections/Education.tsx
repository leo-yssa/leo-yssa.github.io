import { useLanguage } from '../context/LanguageContext';
import { content, EducationItem, AwardItem } from '../data';
import styles from './Education.module.css';

const Education = () => {
    const { language, t } = useLanguage();
    const educationData: EducationItem[] = content[language]?.education || [];
    const awardData: AwardItem[] = content[language]?.awards || [];

    return (
        <section id="education" className={styles.section}>
            <h2 className="heading">{t('education.title')}</h2>

            {/* Education List */}
            {educationData.map((item, index) => (
                <div key={`edu-${index}`} className={styles.block}>
                    <div className={styles.header}>
                        <h3>{item.school}</h3>
                        <span className={styles.date}>{item.date}</span>
                    </div>
                    <h4 className={styles.degree}>{item.degree}</h4>
                    <p className={styles.grade}>{item.grade}</p>
                </div>
            ))}

            {/* Awards Section */}
            {awardData.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                    <h3 style={{ fontSize: '1.5em', color: 'var(--color-text-main)', marginBottom: '20px' }}>{t('education.awards')}</h3>
                    {awardData.map((item, index) => (
                        <div key={`award-${index}`} className={styles.block}>
                            <div className={styles.header}>
                                <h3>{item.title}</h3>
                                <span className={styles.date}>{item.date}</span>
                            </div>
                            <h4 className={styles.degree}>{item.organization}</h4>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Education;
