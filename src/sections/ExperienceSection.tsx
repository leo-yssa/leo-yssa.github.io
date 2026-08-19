import { motion } from 'framer-motion';
import { Briefcase, ChevronRight } from 'lucide-react';
import { experiences } from '../data/portfolio';
import type { Locale } from '../data/portfolio';

interface ExperienceSectionProps { locale: Locale }

const TYPE_STYLE: Record<string, { label: { en: string; ko: string }; color: string }> = {
  'Team Lead': { label: { en: 'Team Lead', ko: '팀장' }, color: '#00D2A0' },
  'Senior':    { label: { en: 'Senior Eng', ko: '시니어' }, color: '#3B82F6' },
  'Engineer':  { label: { en: 'Engineer', ko: '엔지니어' }, color: '#94A3B8' },
};

export default function ExperienceSection({ locale }: ExperienceSectionProps) {
  return (
    <section id="experience" className="relative py-24">
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
            // career timeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-50 mb-4">
            {locale === 'en' ? 'Experience & Leadership' : '경력 & 리더십'}
          </h2>
          <p className="text-slate-400 max-w-xl text-sm sm:text-base">
            {locale === 'en'
              ? '6+ years building production systems across Fintech, Web3, AI, and SaaS domains.'
              : '핀테크, Web3, AI, SaaS 도메인에서 6년+ 프로덕션 시스템 구축 경험.'}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00D2A0]/40 via-slate-700/40 to-transparent" />

          <div className="space-y-6">
            {experiences.map((exp, index) => {
              const typeMeta = TYPE_STYLE[exp.type] ?? TYPE_STYLE['Engineer'];
              return (
                <motion.div
                  key={`${exp.company}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="relative pl-14 sm:pl-20"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-2.5 sm:left-6 top-5 w-3 h-3 rounded-full border-2 bg-[#0B0F17]"
                    style={{ borderColor: typeMeta.color }}
                  >
                    {index === 0 && (
                      <span
                        className="absolute inset-0 rounded-full animate-ping opacity-60"
                        style={{ backgroundColor: typeMeta.color }}
                      />
                    )}
                  </div>

                  <div className="glass rounded-xl border border-slate-700/50 p-5 sm:p-6 hover:border-slate-600/70 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                            style={{ backgroundColor: typeMeta.color + '20', color: typeMeta.color }}
                          >
                            {typeMeta.label[locale]}
                          </span>
                          <span className="text-xs font-mono text-slate-500">{exp.period[locale]}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-100">{exp.company}</h3>
                        <p className="text-sm text-slate-400">{exp.role[locale]}</p>
                      </div>
                      <Briefcase className="w-4 h-4 text-slate-600 flex-shrink-0 mt-1" />
                    </div>

                    {/* Impact items */}
                    <ul className="space-y-1.5 mb-4">
                      {exp.impact[locale].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-600" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/60 text-slate-500 border border-slate-700/50">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
