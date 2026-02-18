import { useLanguage } from '../context/LanguageContext';
import { content, ProjectItem } from '../data';
import styles from './Projects.module.css';

const Projects = () => {
    const { language, t } = useLanguage();
    const projectData: ProjectItem[] = content[language]?.projects || [];

    return (
        <section id="projects" className={styles.section}>
            <h2 className="heading">{t('projects.title')}</h2>
            <div className="container">
                <div className={styles.row}>
                    {projectData.map((project, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.imageContainer}>
                                <img src={project.image} alt={project.title} className={styles.image} />
                            </div>
                            <div className={styles.info}>
                                <h3>{project.title}</h3>
                                <p style={{ whiteSpace: 'pre-line' }}>{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
