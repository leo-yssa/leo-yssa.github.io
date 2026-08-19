import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, TrendingUp, Layers, CheckCircle2, ChevronRight } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
import { projects } from '../data/portfolio';
import type { Locale, ProjectItem } from '../data/portfolio';

interface ProjectsSectionProps { locale: Locale }

const TYPE_BADGE: Record<string, { label: string; color: string }> = {
  B2C:      { label: 'B2C App',     color: '#00D2A0' },
  B2B:      { label: 'B2B',         color: '#3B82F6' },
  Web3:     { label: 'Web3',        color: '#8B5CF6' },
  AI:       { label: 'AI / LLM',    color: '#EC4899' },
  Platform: { label: 'Platform',    color: '#F59E0B' },
  IoT:      { label: 'IoT',         color: '#06B6D4' },
};

const STATUS_BADGE: Record<string, { label: { en: string; ko: string }; dot: string }> = {
  live:     { label: { en: 'Live', ko: '운영 중' }, dot: '#00D2A0' },
  shipped:  { label: { en: 'Shipped', ko: '출시' }, dot: '#3B82F6' },
  research: { label: { en: 'R&D', ko: '연구' }, dot: '#F59E0B' },
};

function ProjectModal({ project, locale, onClose }: { project: ProjectItem; locale: Locale; onClose: () => void }) {
  const typeMeta = TYPE_BADGE[project.type];
  const statusMeta = STATUS_BADGE[project.status];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative glass border border-slate-700/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="relative p-6 border-b border-slate-700/50"
          style={{ background: `linear-gradient(135deg, ${project.color}15, transparent)` }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-slate-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: typeMeta.color + '20', color: typeMeta.color }}
            >
              {typeMeta.label}
            </span>
            <span className="flex items-center gap-1 text-xs font-medium" style={{ color: statusMeta.dot }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: statusMeta.dot }} />
              {statusMeta.label[locale]}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-50 mb-1">{project.title}</h2>
          <p className="text-slate-400 text-sm">{project.subtitle[locale]}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <p className="text-slate-300 leading-relaxed">{project.description[locale]}</p>

          {/* Metrics */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              {locale === 'en' ? 'Key Metrics' : '핵심 지표'}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label.en}
                  className="p-3 rounded-xl text-center"
                  style={{ backgroundColor: project.color + '10', border: `1px solid ${project.color}25` }}
                >
                  <div className="text-lg font-black font-mono" style={{ color: project.color }}>
                    {m.value}
                    {m.unit && <span className="text-xs ml-0.5 opacity-70">{m.unit}</span>}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{m.label[locale]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering highlights */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {locale === 'en' ? 'Engineering Highlights' : '엔지니어링 하이라이트'}
            </h3>
            <ul className="space-y-2">
              {project.highlights[locale].map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: project.color }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              {locale === 'en' ? 'Architecture Flow' : '아키텍처 흐름'}
            </h3>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
              <code className="text-xs text-slate-300 font-mono leading-relaxed">
                {project.architecture[locale]}
              </code>
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/50 text-xs font-mono text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {(project.github || project.live) && (
            <div className="flex gap-3 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg glass border border-slate-700 text-sm text-slate-300 hover:text-white hover:border-slate-500 transition-all"
                >
                  <GithubIcon className="w-4 h-4" /> GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{ backgroundColor: project.color + '20', color: project.color, border: `1px solid ${project.color}40` }}
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, locale, index, onClick }: {
  project: ProjectItem;
  locale: Locale;
  index: number;
  onClick: () => void;
}) {
  const typeMeta = TYPE_BADGE[project.type];
  const statusMeta = STATUS_BADGE[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="group glass rounded-2xl border border-slate-700/50 overflow-hidden cursor-pointer hover:border-slate-600/70 transition-all duration-300 hover:shadow-xl"
      style={{ '--project-color': project.color } as React.CSSProperties}
    >
      {/* Top color strip */}
      <div className="h-px" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      <div className="p-5 sm:p-6">
        {/* Badges */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
              style={{ backgroundColor: typeMeta.color + '20', color: typeMeta.color }}
            >
              {typeMeta.label}
            </span>
            <span className="flex items-center gap-1 text-[11px]" style={{ color: statusMeta.dot }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusMeta.dot }} />
              {statusMeta.label[locale]}
            </span>
          </div>
          <ChevronRight
            className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all"
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 mb-4">{project.subtitle[locale]}</p>

        {/* Metrics */}
        <div className="flex gap-3 mb-4">
          {project.metrics.slice(0, 3).map((m) => (
            <div key={m.label.en} className="flex-1 text-center">
              <div className="text-sm font-black font-mono" style={{ color: project.color }}>
                {m.value}
              </div>
              <div className="text-[10px] text-slate-600 mt-0.5">{m.label[locale]}</div>
            </div>
          ))}
        </div>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/80 text-slate-400 border border-slate-700/50">
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="px-2 py-0.5 rounded text-[10px] text-slate-600">
              +{project.stack.length - 5}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection({ locale }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-[#00D2A0] tracking-widest uppercase mb-3 block">
            // featured work
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-50 mb-4">
            {locale === 'en' ? 'Projects & Showcase' : '프로젝트 쇼케이스'}
          </h2>
          <p className="text-slate-400 max-w-xl text-sm sm:text-base">
            {locale === 'en'
              ? 'Click any card to explore architecture, engineering decisions, and measured outcomes.'
              : '카드를 클릭하면 아키텍처, 엔지니어링 결정 사항, 정량적 성과를 확인할 수 있습니다.'}
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            locale={locale}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
