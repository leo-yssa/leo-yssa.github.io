import { motion } from 'framer-motion';
import { techStack } from '../data/portfolio';
import type { Locale } from '../data/portfolio';

interface StackSectionProps { locale: Locale }

const LEVEL_CONFIG = {
  production: { label: { en: 'Production', ko: '프로덕션' }, width: '90%', color: '#00D2A0' },
  proficient: { label: { en: 'Proficient', ko: '숙련' }, width: '70%', color: '#3B82F6' },
  familiar:   { label: { en: 'Familiar', ko: '학습 중' }, width: '45%', color: '#64748B' },
};

export default function StackSection({ locale }: StackSectionProps) {
  return (
    <section id="stack" className="relative py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-[#00D2A0]/5 rounded-full blur-3xl" />
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
            // tech matrix
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-50 mb-4">
            {locale === 'en' ? 'Tech Stack' : '기술 스택'}
          </h2>
          <p className="text-slate-400 max-w-xl text-sm sm:text-base">
            {locale === 'en'
              ? 'Production-grade experience across the full engineering stack.'
              : '풀 엔지니어링 스택 전반의 프로덕션 수준 경험.'}
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4">
            {Object.entries(LEVEL_CONFIG).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                {cfg.label[locale]}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stack grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {techStack.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="glass rounded-xl border border-slate-700/50 p-5"
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{category.icon}</span>
                <h3 className="text-sm font-bold" style={{ color: category.color }}>
                  {category.label[locale]}
                </h3>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => {
                  const levelCfg = LEVEL_CONFIG[item.level];
                  return (
                    <div key={item.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-slate-300">{item.name}</span>
                        {item.years && (
                          <span className="text-[10px] text-slate-600 font-mono">{item.years}y</span>
                        )}
                      </div>
                      <div className="h-1 bg-slate-800/80 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: levelCfg.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: catIndex * 0.1 + itemIndex * 0.04, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: levelCfg.color + 'CC' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
