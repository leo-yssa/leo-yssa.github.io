import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { architectureBlueprints } from '../data/portfolio';
import type { ArchNode, Locale } from '../data/portfolio';

interface ArchitectureSectionProps {
  locale: Locale;
}

export default function ArchitectureSection({ locale }: ArchitectureSectionProps) {
  const [activeBlueprintId, setActiveBlueprintId] = useState(architectureBlueprints[0].id);
  const blueprint = architectureBlueprints.find((b) => b.id === activeBlueprintId) || architectureBlueprints[0];

  const [activeNode, setActiveNode] = useState<ArchNode | null>(blueprint.nodes[0]);

  useEffect(() => {
    setActiveNode(blueprint.nodes[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBlueprintId]);

  const NODES = blueprint.nodes;
  const EDGES = blueprint.edges;

  const getNode = (id: string) => NODES.find((n) => n.id === id) || NODES[0];

  const W = 780;
  const H = 260;

  return (
    <section id="architecture" className="relative py-24">
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
            // interactive system blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-50 mb-4">
            {locale === 'en' ? 'Core System Architecture' : '코어 시스템 아키텍처 블루프린트'}
          </h2>

          {/* Project switcher */}
          <div className="flex flex-wrap gap-2 mb-4">
            {architectureBlueprints.map((bp) => {
              const active = bp.id === activeBlueprintId;
              return (
                <button
                  key={bp.id}
                  onClick={() => setActiveBlueprintId(bp.id)}
                  className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-all"
                  style={
                    active
                      ? { backgroundColor: `${bp.accentColor}20`, borderColor: bp.accentColor, color: bp.accentColor }
                      : { backgroundColor: 'transparent', borderColor: 'rgba(148,163,184,0.3)', color: 'rgba(148,163,184,0.8)' }
                  }
                >
                  {bp.label[locale]}
                </button>
              );
            })}
          </div>

          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">{blueprint.description[locale]}</p>
        </motion.div>

        {/* Strengths cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {blueprint.strengths.map((cs, i) => (
            <motion.div
              key={cs.title.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl border border-slate-700/50 p-4 hover:border-slate-600 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: blueprint.accentColor }} />
                <h3 className="font-bold text-slate-200 text-sm">{cs.title[locale]}</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{cs.desc[locale]}</p>
            </motion.div>
          ))}
        </div>

        {/* Architecture canvas */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* SVG Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass rounded-2xl border border-slate-700/60 p-4 sm:p-6 overflow-x-auto shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
              <span className="font-mono" style={{ color: blueprint.accentColor }}>{blueprint.diagramTitle[locale]}</span>
              <span className="text-[11px] text-slate-500">Interactive Blueprint</span>
            </div>

            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full min-w-[620px] select-none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148,163,184,0.04)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width={W} height={H} fill="url(#grid)" />

              {/* Edges */}
              {EDGES.map((edge) => {
                const a = getNode(edge.from);
                const b = getNode(edge.to);
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2;
                const active = activeNode && (activeNode.id === a.id || activeNode.id === b.id);
                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    <line
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke={active ? '#00D2A0' : 'rgba(148,163,184,0.18)'}
                      strokeWidth={active ? 1.8 : 1}
                      strokeDasharray={edge.dashed ? '5 4' : undefined}
                      className="transition-all duration-300"
                    />
                    <text
                      x={mx}
                      y={my - 6}
                      textAnchor="middle"
                      className="text-[9px]"
                      fill={active ? '#00D2A0' : 'rgba(148,163,184,0.5)'}
                      fontSize="9"
                      fontWeight="500"
                    >
                      {edge.label}
                    </text>
                  </g>
                );
              })}

              {/* Nodes */}
              {NODES.map((node) => {
                const isActive = activeNode?.id === node.id;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveNode(node)}
                    onClick={() => setActiveNode(node)}
                  >
                    {/* Glow */}
                    {isActive && (
                      <circle r="36" fill={node.color} opacity="0.15" className="animate-pulse" />
                    )}
                    {/* Outer ring */}
                    <circle
                      r="28"
                      fill={`${node.color}15`}
                      stroke={isActive ? node.color : `${node.color}50`}
                      strokeWidth={isActive ? 2 : 1}
                      className="transition-all duration-200"
                    />
                    {/* Inner core */}
                    <circle r="16" fill={`${node.color}25`} />
                    <circle r="6" fill={node.color} />

                    {/* Label */}
                    <text
                      y="42"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={isActive ? node.color : '#f1f5f9'}
                      className="transition-all"
                    >
                      {node.label}
                    </text>
                    <text
                      y="54"
                      textAnchor="middle"
                      fontSize="9"
                      fill="rgba(148,163,184,0.7)"
                    >
                      {node.sublabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {/* Active node info */}
            <div className="glass rounded-xl border border-slate-700/60 p-5 min-h-[160px] shadow-lg">
              {activeNode ? (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeNode.color }} />
                    <span className="font-bold text-slate-100 text-base">{activeNode.label}</span>
                    <span className="text-xs text-slate-500 font-mono">({activeNode.sublabel})</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeNode.desc[locale]}
                  </p>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-sm text-slate-500 text-center">
                    {locale === 'en' ? 'Click or hover a node to inspect architecture' : '노드를 클릭하여 아키텍처 상세 정보를 확인하세요'}
                  </p>
                </div>
              )}
            </div>

            {/* Design Principles */}
            <div className="glass rounded-xl border border-slate-700/60 p-5 shadow-lg">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3.5">
                {locale === 'en' ? 'Core Architectural Principles' : '핵심 아키텍처 설계 원칙'}
              </h4>
              <ul className="space-y-3">
                {blueprint.principles.map((item) => (
                  <li key={item.en} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-slate-300 leading-relaxed">{item[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
