import { useLanguage } from '../context/LanguageContext';
import { skills } from '../data/portfolio';
import styles from './Skills.module.css';

const Skills = () => {
    const { t } = useLanguage();

    return (
        <section id="skills" className={styles.section}>
            <h2 className="heading">{t('skills.title')}</h2>
            <ul className={styles.list}>
                {skills.map((skill, index) => (
                    <li key={index} className={styles.item}>{skill}</li>
                ))}
            </ul>
        </section>
    );
};

export default Skills;
