import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { learningContent, LearningCategory, LearningTopic } from '../data/learning';
import styles from './Learning.module.css';
import { FaDatabase, FaArrowLeft, FaChevronRight } from 'react-icons/fa';

type ViewState = 'categories' | 'topics' | 'detail';

const Learning = () => {
    const { language, t } = useLanguage();
    const content = learningContent[language];

    const [view, setView] = useState<ViewState>('categories');
    const [selectedCategory, setSelectedCategory] = useState<LearningCategory | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<LearningTopic | null>(null);

    const handleCategoryClick = (category: LearningCategory) => {
        setSelectedCategory(category);
        setView('topics');
    };

    const handleTopicClick = (topic: LearningTopic) => {
        setSelectedTopic(topic);
        setView('detail');
    };

    const handleBackToCategories = () => {
        setView('categories');
        setSelectedCategory(null);
    };

    const handleBackToTopics = () => {
        setView('topics');
        setSelectedTopic(null);
    };

    return (
        <section id="learning" className={styles.section}>
            <h2 className="heading">{t('learning.title')}</h2>
            <div className="container">
                {/* Categories View */}
                {view === 'categories' && (
                    <div className={styles.grid}>
                        {content.categories.map((category) => (
                            <div
                                key={category.id}
                                className={styles.card}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <div className={styles.iconWrapper}>
                                    <FaDatabase />
                                </div>
                                <h3 className={styles.cardTitle}>{category.title}</h3>
                                <p className={styles.cardCount}>
                                    {category.topics.length} Topics
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Topics List View */}
                {view === 'topics' && selectedCategory && (
                    <div className={styles.topicsContainer}>
                        <button className={styles.backButton} onClick={handleBackToCategories}>
                            <FaArrowLeft /> {t('learning.back')}
                        </button>
                        <h3 className={styles.subHeading}>{selectedCategory.title}</h3>
                        <div className={styles.topicList}>
                            {selectedCategory.topics.map((topic) => (
                                <div
                                    key={topic.id}
                                    className={styles.topicItem}
                                    onClick={() => handleTopicClick(topic)}
                                >
                                    <div className={styles.topicInfo}>
                                        <h4 className={styles.topicTitle}>{topic.title}</h4>
                                        <p className={styles.topicDesc}>{topic.description}</p>
                                    </div>
                                    <FaChevronRight className={styles.chevron} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Detail Content View */}
                {view === 'detail' && selectedTopic && (
                    <div className={styles.detailContainer}>
                        <button className={styles.backButton} onClick={handleBackToTopics}>
                            <FaArrowLeft /> {t('learning.back')}
                        </button>
                        <article className={styles.article}>
                            <h3 className={styles.articleTitle}>{selectedTopic.title}</h3>
                            <div
                                className={styles.markdownContent}
                                dangerouslySetInnerHTML={{
                                    __html: selectedTopic.content
                                        .replace(/\n\n/g, '<br/><br/>')
                                        .replace(/### (.*)/g, '<h3>$1</h3>')
                                        .replace(/#### (.*)/g, '<h4>$1</h4>')
                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        .replace(/```(.*?)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
                                        .replace(/- (.*)/g, '<li>$1</li>')
                                }}
                            />
                        </article>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Learning;
