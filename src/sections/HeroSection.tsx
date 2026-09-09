import { motion } from 'framer-motion';
import { ArrowRight, Mail, Layers } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
import { personalInfo } from '../data/portfolio';
import type { Locale } from '../data/portfolio';

interface HeroSectionProps { locale: Locale }

const techPills = [
  { label: 'NestJS', color: '#E0234E' },
  { label: 'Spring Boot', color: '#6DB33F' },
  { label: 'Hyperledger Fabric', color: '#2C3E50' },
  { label: 'Solidity', color: '#627EEA' },
  { label: 'PostgreSQL', color: '#336791' },
  { label: 'Redis', color: '#DC382D' },
  { label: 'AWS ECS', color: '#FF9900' },
  { label: 'Docker', color: '#2496ED' },
  { label: 'Go / gRPC', color: '#00ADD8' },
  { label: 'WebSocket', color: '#00D2A0' },
];

const headlineLines: Record<string, { text: string; accent?: boolean }[]> = {
  en: [
    { text: 'Engineering', accent: true },
    { text: 'Resilient Systems' },
    { text: '& Scalable' },
    { text: 'Architectures', accent: true },
  ],
  ko: [
    { text: '안정적인 시스템과', accent: true },
    { text: '확장 가능한' },
    { text: '아키텍처를' },
    { text: '설계합니다', accent: true },
  ],
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } } as const,
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { ease: 'easeOut' as const, duration: 0.6 } },
};

export default function HeroSection({ locale }: HeroSectionProps) {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#00D2A0]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-[#3B82F6]/8 rounded-full blur-3xl" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
            {/* Status pill */}
            <motion.div variants={item} className="inline-flex items-center gap-2 mb-6">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00D2A0]/10 border border-[#00D2A0]/25 text-[#00D2A0] text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2A0] animate-pulse" />
                {personalInfo.status[locale]}
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={item} className="mb-2">
              <span className="text-sm font-mono text-slate-500 tracking-widest uppercase">
                {personalInfo.name}
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black leading-[1.1] tracking-tight mb-6"
            >
              {headlineLines[locale].map((line, i) => (
                <span key={i}>
                  <span className={line.accent ? 'gradient-text-mint' : 'text-slate-100'}>
                    {line.text}
                  </span>
                  {i < headlineLines[locale].length - 1 && <br />}
                </span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={item} className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              {personalInfo.about[locale]}
            </motion.p>

            {/* Tech pills */}
            <motion.div variants={item} className="flex flex-wrap gap-2 mb-8">
              {techPills.map((pill) => (
                <span
                  key={pill.label}
                  className="px-2.5 py-1 rounded-full text-xs font-medium border transition-all hover:scale-105 cursor-default"
                  style={{
                    borderColor: pill.color + '40',
                    backgroundColor: pill.color + '12',
                    color: pill.color,
                  }}
                >
                  {pill.label}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00D2A0] to-[#00b389] text-[#0B0F17] text-sm font-bold hover:shadow-lg hover:shadow-[#00D2A0]/25 hover:scale-[1.02] transition-all duration-200"
              >
                <Layers className="w-4 h-4" />
                {locale === 'en' ? 'View Projects' : '프로젝트 보기'}
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg glass border border-slate-700 text-slate-300 text-sm font-medium hover:border-[#3B82F6]/50 hover:text-white hover:bg-[#3B82F6]/10 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                {locale === 'en' ? 'Get in Touch' : '연락하기'}
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg glass border border-slate-700 text-slate-300 text-sm font-medium hover:border-slate-500 hover:text-white transition-all duration-200"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </a>
            </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] text-slate-600 tracking-widest uppercase font-mono">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
