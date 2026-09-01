import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  ChevronRight,
  Layers,
  CheckCircle2,
  X,
  Cpu,
  GitBranch,
  ArrowRight,
} from 'lucide-react';
import { FaGithub as GithubIcon } from 'react-icons/fa';
import { projects } from '../data/portfolio';
import type { ProjectItem, Locale } from '../data/portfolio';

interface ProjectsSectionProps {
  locale: Locale;
}

const TYPE_BADGE: Record<ProjectItem['type'], { label: string; color: string }> = {
  AI: { label: 'AI & LLM', color: '#10B981' },
  Web3: { label: 'Web3 & Chain', color: '#8B5CF6' },
  Platform: { label: 'Platform', color: '#3B82F6' },
  B2B: { label: 'B2B SaaS', color: '#00D2A0' },
  Fintech: { label: 'Fintech CRM', color: '#F59E0B' },
};

const STATUS_BADGE: Record<ProjectItem['status'], { label: { en: string; ko: string }; dot: string }> = {
  live: { label: { en: 'In Production', ko: '운영 중' }, dot: '#00D2A0' },
  shipped: { label: { en: 'Shipped', ko: '개발 완료' }, dot: '#3B82F6' },
  research: { label: { en: 'PoC / Research', ko: '연구 / PoC' }, dot: '#F59E0B' },
};

function ProjectModal({
  project,
  locale,
  onClose,
}: {
  project: ProjectItem;
  locale: Locale;
  onClose: () => void;
}) {
  const typeMeta = TYPE_BADGE[project.type];
  const statusMeta = STATUS_BADGE[project.status];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="glass rounded-2xl border border-slate-700/80 p-6 sm:p-8 max-w-3xl w-full my-8 text-left shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: typeMeta.color + '20', color: typeMeta.color }}
          >
            {typeMeta.label}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusMeta.dot }} />
            {statusMeta.label[locale]}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-slate-50 mb-1">
          {project.title}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mb-6">{project.subtitle[locale]}</p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-slate-900/70 border border-slate-700/60">
          {project.metrics.map((m) => (
            <div key={m.label.en} className="text-center">
              <div className="text-xl sm:text-2xl font-black font-mono" style={{ color: project.color }}>
                {m.value}
                <span className="text-xs font-normal text-slate-500 ml-1">{m.unit}</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{m.label[locale]}</div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description[locale]}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D2A0]" />
              {locale === 'en' ? 'Core Engineering Highlights' : '핵심 엔지니어링 성과 & 문제 해결'}
            </h3>
            <ul className="space-y-2.5">
              {project.highlights[locale].map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-200 leading-relaxed">
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: project.color }} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Flow & Deep-Dive */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#3B82F6]" />
              {locale === 'en' ? 'System Architecture & Data Flow' : '시스템 아키텍처 & 데이터 흐름'}
            </h3>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-xs text-slate-300 font-mono leading-relaxed mb-3">
                {project.architecture[locale]}
              </div>

              {project.architectureDoc && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-3">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {project.architectureDoc.overview[locale]}
                  </p>

                  {/* Key Decisions */}
                  {project.architectureDoc.keyDecisions.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                        {locale === 'en' ? 'Key Architectural Decisions (ADR)' : '주요 아키텍처 의사결정 (ADR)'}
                      </span>
                      {project.architectureDoc.keyDecisions.map((kd, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                          <div className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                            <Cpu className="w-3.5 h-3.5 text-[#00D2A0]" />
                            {kd.title[locale]}
                          </div>
                          <div className="text-slate-400 leading-relaxed">{kd.desc[locale]}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Step by step flow */}
                  {project.architectureDoc.dataFlow.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                        {locale === 'en' ? 'Execution Pipeline' : '실행 파이프라인 흐름'}
                      </span>
                      <div className="space-y-1.5">
                        {project.architectureDoc.dataFlow.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                            <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[9px] font-bold">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <GitBranch className="w-4 h-4 text-[#F59E0B]" />
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-slate-300"
                >
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
                  style={{
                    backgroundColor: project.color + '20',
                    color: project.color,
                    border: `1px solid ${project.color}40`,
                  }}
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

function ProjectCard({
  project,
  locale,
  index,
  onClick,
}: {
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
      className="group glass rounded-2xl border border-slate-700/50 overflow-hidden cursor-pointer hover:border-slate-600/70 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
      style={{ '--project-color': project.color } as React.CSSProperties}
    >
      {/* Top color strip */}
      <div className="h-px" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      <div className="p-5 sm:p-6">
        {/* Badges */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
              style={{ backgroundColor: typeMeta.color + '20', color: typeMeta.color }}
            >
              {typeMeta.label}
            </span>
            <span className="flex items-center gap-1.5 text-[11px]" style={{ color: statusMeta.dot }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusMeta.dot }} />
              {statusMeta.label[locale]}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mb-4 line-clamp-2">{project.subtitle[locale]}</p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
          {project.metrics.slice(0, 3).map((m) => (
            <div key={m.label.en} className="text-center">
              <div className="text-sm font-black font-mono" style={{ color: project.color }}>
                {m.value}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate">{m.label[locale]}</div>
            </div>
          ))}
        </div>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/80 text-slate-400 border border-slate-700/50"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="px-2 py-0.5 rounded text-[10px] text-slate-500 font-mono">
              +{project.stack.length - 5}
            </span>
          )}
        </div>
      </div>

      <div className="px-5 py-3 border-t border-slate-800/60 bg-slate-900/30 flex items-center justify-between text-xs text-slate-400 group-hover:text-[#00D2A0] transition-colors">
        <span>{locale === 'en' ? 'Explore Architecture & Code' : '아키텍처 & 상세 분석 보기'}</span>
        <ArrowRight className="w-3.5 h-3.5" />
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
            // featured engineering projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-50 mb-4">
            {locale === 'en' ? 'Projects & Architecture Deep-Dive' : '프로젝트 및 아키텍처 상세 쇼케이스'}
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            {locale === 'en'
              ? 'Click any project card to inspect full system architectures, ADR decisions, and quantitative business impacts.'
              : '각 프로젝트 카드를 클릭하여 시스템 아키텍처, 주요 의사결정(ADR), 정량적 성과 및 파이프라인 흐름을 심층 확인할 수 있습니다.'}
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
