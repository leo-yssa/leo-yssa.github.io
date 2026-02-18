import { useLanguage } from '../context/LanguageContext';
import { content } from '../data';
import styles from './Certifications.module.css';

const Certifications = () => {
    const { language, t } = useLanguage();
    const { certifications } = content[language];

    return (
        <section id="certifications" className={styles.section}>
            <h2 className="heading">{t('certifications.title')}</h2>
            <div className={styles.container}>
                {certifications.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.header}>
                            <h3 className={styles.title}>{item.title}</h3>
                            <span className={styles.date}>{item.date}</span>
                        </div>
                        <p className={styles.organization}>{item.organization}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Certifications;
