import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import ArchitectureSection from './sections/ArchitectureSection';
import ExperienceSection from './sections/ExperienceSection';
import StackSection from './sections/StackSection';
import ContactSection from './sections/ContactSection';
import './styles/global.css';
import type { Locale } from './data/portfolio';

function App() {
  const [locale, setLocale] = useState<Locale>('en');

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-50 overflow-x-hidden">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      <Navbar locale={locale} onLocaleChange={setLocale} />

      <main>
        <HeroSection locale={locale} />
        <ProjectsSection locale={locale} />
        <ArchitectureSection locale={locale} />
        <ExperienceSection locale={locale} />
        <StackSection locale={locale} />
        <ContactSection locale={locale} />
      </main>
    </div>
  );
}

export default App;
