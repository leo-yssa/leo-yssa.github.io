import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ko';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
    en: {
        'nav.about': 'About',
        'nav.experience': 'Experience',
        'nav.education': 'Education',
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        'hero.role': 'Software Engineer',
        'hero.resume': 'Download Resume',
        'about.title': 'About Me',
        'experience.title': 'Experience',
        'education.title': 'Education',
        'education.awards': 'Awards',
        'projects.title': 'Projects',
        'skills.title': 'Skills',
        'contact.title': 'Contact',
        'footer.copyright': 'Copyright © {year} Youngsoo(Leo) Sa',
    },
    ko: {
        'nav.about': '소개',
        'nav.experience': '경력',
        'nav.education': '학력',
        'nav.projects': '프로젝트',
        'nav.skills': '기술',
        'hero.role': '소프트웨어 엔지니어',
        'hero.resume': '이력서 다운로드',
        'about.title': '자기소개',
        'experience.title': '경력',
        'education.title': '학력',
        'education.awards': '수상이력',
        'projects.title': '프로젝트',
        'skills.title': '기술 스택',
        'contact.title': '연락처',
        'footer.copyright': '저작권 © {year} 사영수(Leo)',
    }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('ko'); // Default to Korean as requested

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ko' : 'en');
    };

    const t = (key: string) => {
        return translations[language][key as keyof typeof translations['en']] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
