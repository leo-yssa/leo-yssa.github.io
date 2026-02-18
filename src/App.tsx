import { LanguageProvider } from './context/LanguageContext';
import Sidebar from './components/Sidebar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Certifications from './sections/Certifications';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Sidebar />
        <main className="main-content">
          <Hero />
          <About />
          <Experience />
          <Education />
          <Projects />
          <Skills />
          <Certifications />
          <Footer />
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
