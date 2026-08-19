import { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Globe, Cpu, Cloud, Zap } from 'lucide-react';
import type { Locale } from '../data/portfolio';

interface ArchitectureSectionProps { locale: Locale }

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  color: string;
  type: 'client' | 'cdn' | 'gateway' | 'cache' | 'db' | 'worker' | 'infra' | 'chain';
  desc: { en: string; ko: string };
}

interface Edge {
  from: string;
  to: string;
  label: string;
  dashed?: boolean;
}

const NODES: Node[] = [
  {
    id: 'client', x: 60, y: 160, label: 'Client', sublabel: 'Web / Mobile',
    icon: <Globe className="w-5 h-5" />, color: '#94A3B8', type: 'client',
    desc: { en: 'React / React Native frontend clients', ko: 'React / React Native 프론트엔드 클라이언트' },
  },
  {
    id: 'cdn', x: 220, y: 80, label: 'CloudFront', sublabel: 'CDN / Edge',
    icon: <Cloud className="w-5 h-5" />, color: '#FF9900', type: 'cdn',
    desc: { en: 'AWS CloudFront for static assets & global edge caching', ko: 'AWS CloudFront 정적 자산 & 글로벌 엣지 캐싱' },
  },
  {
    id: 'gateway', x: 220, y: 240, label: 'API Gateway', sublabel: 'NestJS + WS',
    icon: <Server className="w-5 h-5" />, color: '#00D2A0', type: 'gateway',
    desc: { en: 'NestJS REST + WebSocket gateway with JWT auth & rate limiting', ko: 'NestJS REST + WebSocket 게이트웨이, JWT 인증 & 레이트 리미팅' },
  },
  {
    id: 'redis', x: 420, y: 80, label: 'Redis', sublabel: 'Cache / Lock / Pub-Sub',
    icon: <Zap className="w-5 h-5" />, color: '#DC382D', type: 'cache',
    desc: { en: 'Session cache, distributed lock (prevents race conditions), Pub/Sub for WS scaling', ko: '세션 캐시, 분산 락(레이스 컨디션 방지), WS 수평 확장 Pub/Sub' },
  },
  {
    id: 'postgres', x: 420, y: 240, label: 'PostgreSQL', sublabel: 'RDS Multi-AZ',
    icon: <Database className="w-5 h-5" />, color: '#336791', type: 'db',
    desc: { en: 'Primary DB on AWS RDS Multi-AZ with composite index optimization', ko: 'AWS RDS Multi-AZ 주 DB, 복합 인덱스 최적화' },
  },
  {
    id: 'worker', x: 420, y: 390, label: 'Job Worker', sublabel: 'BullMQ / Queue',
    icon: <Cpu className="w-5 h-5" />, color: '#F59E0B', type: 'worker',
    desc: { en: 'Async job queue for notifications, batch processing, and heavy tasks', ko: '알림, 배치 처리, 무거운 작업을 위한 비동기 잡 큐' },
  },
  {
    id: 'ecs', x: 220, y: 390, label: 'AWS ECS', sublabel: 'Fargate',
    icon: <Cloud className="w-5 h-5" />, color: '#3B82F6', type: 'infra',
    desc: { en: 'Containerized NestJS services auto-scaled on ECS Fargate', ko: 'ECS Fargate에서 자동 확장되는 컨테이너화 NestJS 서비스' },
  },
  {
    id: 'chain', x: 580, y: 240, label: 'Blockchain', sublabel: 'Fabric / EVM',
    icon: <Zap className="w-5 h-5" />, color: '#8B5CF6', type: 'chain',
    desc: { en: 'Hyperledger Fabric (permissioned) or EVM-compatible chain for on-chain state', ko: 'Hyperledger Fabric(허가형) 또는 EVM 호환 체인 온체인 상태 관리' },
  },
];

const EDGES: Edge[] = [
  { from: 'client', to: 'cdn', label: 'HTTPS' },
  { from: 'client', to: 'gateway', label: 'REST/WS' },
  { from: 'cdn', to: 'gateway', label: 'Forward' },
  { from: 'gateway', to: 'redis', label: 'Cache/Lock' },
  { from: 'gateway', to: 'postgres', label: 'ORM' },
  { from: 'gateway', to: 'worker', label: 'Enqueue', dashed: true },
  { from: 'worker', to: 'chain', label: 'TX', dashed: true },
  { from: 'postgres', to: 'chain', label: 'Sync', dashed: true },
  { from: 'ecs', to: 'gateway', label: 'Scale' },
];

const W = 700;
const H = 500;

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export default function ArchitectureSection({ locale }: ArchitectureSectionProps) {
  const [activeNode, setActiveNode] = useState<Node | null>(null);

  return (
    <section id="architecture" className="relative py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#3B82F6]/5 rounded-full blur-3xl" />
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
          <span className="text-xs font-mono text-[#3B82F6] tracking-widest uppercase mb-3 block">
            // system design
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-50 mb-4">
            {locale === 'en' ? 'Architecture Showcase' : '아키텍처 쇼케이스'}
          </h2>
          <p className="text-slate-400 max-w-xl text-sm sm:text-base">
            {locale === 'en'
              ? 'Interactive system diagram — hover nodes to explore each layer.'
              : '인터랙티브 시스템 다이어그램 — 노드에 호버하면 각 레이어를 탐색할 수 있습니다.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          {/* Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl border border-slate-700/50 p-4 overflow-x-auto"
          >
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              style={{ minWidth: '420px', maxHeight: '480px' }}
            >
              {/* Grid background */}
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(148,163,184,0.04)" strokeWidth="1" />
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
                      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke={active ? '#00D2A0' : 'rgba(148,163,184,0.15)'}
                      strokeWidth={active ? 1.5 : 1}
                      strokeDasharray={edge.dashed ? '5 4' : undefined}
                      className="transition-all duration-300"
                    />
                    <text x={mx} y={my - 5} textAnchor="middle" className="text-[8px]" fill="rgba(148,163,184,0.5)" fontSize="9">
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
                    onMouseLeave={() => setActiveNode(null)}
                    onClick={() => setActiveNode(isActive ? null : node)}
                  >
                    {/* Glow */}
                    {isActive && (
                      <circle r="36" fill={node.color} opacity="0.12" className="animate-pulse" />
                    )}
                    {/* Outer ring */}
                    <circle
                      r="30"
                      fill={`${node.color}18`}
                      stroke={isActive ? node.color : `${node.color}40`}
                      strokeWidth={isActive ? 1.5 : 1}
                      className="transition-all duration-200"
                    />
                    {/* Icon background */}
                    <circle r="18" fill={`${node.color}25`} />
                    {/* Icon (rendered as foreign object for React icons) */}
                    <foreignObject x="-9" y="-9" width="18" height="18">
                      <div
                        style={{ color: node.color, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={node.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {node.type === 'client' && <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>}
                          {node.type === 'cdn' && <><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></>}
                          {node.type === 'gateway' && <><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>}
                          {node.type === 'cache' && <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>}
                          {node.type === 'db' && <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>}
                          {node.type === 'worker' && <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="14" x2="22" y2="14"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="14" x2="4" y2="14"/></>}
                          {node.type === 'infra' && <><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></>}
                          {node.type === 'chain' && <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>}
                        </svg>
                      </div>
                    </foreignObject>
                    {/* Label */}
                    <text y="46" textAnchor="middle" fontSize="11" fontWeight="600" fill={isActive ? node.color : '#cbd5e1'} className="transition-all">
                      {node.label}
                    </text>
                    <text y="58" textAnchor="middle" fontSize="9" fill="rgba(148,163,184,0.6)">
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
            <div className="glass rounded-xl border border-slate-700/50 p-4 min-h-[140px]">
              {activeNode ? (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeNode.color }} />
                    <span className="font-bold text-slate-100">{activeNode.label}</span>
                    <span className="text-xs text-slate-500">{activeNode.sublabel}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {activeNode.desc[locale]}
                  </p>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-sm text-slate-600 text-center">
                    {locale === 'en' ? 'Hover a node to explore' : '노드에 호버하여 탐색'}
                  </p>
                </div>
              )}
            </div>

            {/* Stack highlights */}
            <div className="glass rounded-xl border border-slate-700/50 p-4">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                {locale === 'en' ? 'Design Principles' : '설계 원칙'}
              </h4>
              <ul className="space-y-2.5">
                {[
                  { en: 'Distributed lock prevents race conditions', ko: '분산 락으로 레이스 컨디션 방지', color: '#00D2A0' },
                  { en: 'Redis Pub/Sub for horizontal WS scaling', ko: 'Redis Pub/Sub WS 수평 확장', color: '#DC382D' },
                  { en: 'Multi-AZ for high availability', ko: 'Multi-AZ 고가용성', color: '#336791' },
                  { en: 'Async queue decouples heavy processing', ko: '비동기 큐로 무거운 처리 분리', color: '#F59E0B' },
                  { en: 'Atomic cross-chain finality', ko: '원자적 크로스체인 최종성', color: '#8B5CF6' },
                ].map((item) => (
                  <li key={item.en} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-slate-400">{item[locale]}</span>
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
