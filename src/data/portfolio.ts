// ============================================================
// Dotorio Portfolio — Core Data Layer
// ============================================================

export type Locale = 'en' | 'ko';

// ─── Navigation ────────────────────────────────────────────
export const navItems = [
  { id: 'about', label: { en: 'About', ko: '소개' } },
  { id: 'projects', label: { en: 'Projects', ko: '프로젝트' } },
  { id: 'architecture', label: { en: 'Architecture', ko: '아키텍처' } },
  { id: 'experience', label: { en: 'Experience', ko: '경력' } },
  { id: 'stack', label: { en: 'Stack', ko: '기술 스택' } },
  { id: 'contact', label: { en: 'Contact', ko: '연락' } },
];

// ─── Projects ──────────────────────────────────────────────
export interface ProjectMetric {
  label: { en: string; ko: string };
  value: string;
  unit?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: { en: string; ko: string };
  description: { en: string; ko: string };
  type: 'B2C' | 'B2B' | 'Web3' | 'AI' | 'IoT' | 'Platform';
  status: 'live' | 'shipped' | 'research';
  metrics: ProjectMetric[];
  stack: string[];
  highlights: { en: string[]; ko: string[] };
  architecture: { en: string; ko: string };
  github?: string;
  live?: string;
  color: string;
}

export const projects: ProjectItem[] = [
  {
    id: 'madezone',
    title: 'Madezone',
    subtitle: { en: 'Study Room Management Platform', ko: '스터디룸 관리 플랫폼' },
    description: {
      en: 'Full-stack study room management platform with real-time booking, Kakao notifications, and PortOne payment integration.',
      ko: 'NestJS 기반 스터디룸 예약 관리 플랫폼. 카카오 알림톡, 포트원 결제 모듈 연동.',
    },
    type: 'B2C',
    status: 'live',
    metrics: [
      { label: { en: 'Concurrent Users', ko: '동시 접속자' }, value: '500+', unit: 'users' },
      { label: { en: 'API Response', ko: 'API 응답 시간' }, value: '<120', unit: 'ms' },
      { label: { en: 'Uptime', ko: '가동률' }, value: '99.9', unit: '%' },
    ],
    stack: ['NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'React Native', 'Docker', 'AWS ECS'],
    highlights: {
      en: [
        'Designed multi-tenant schema with row-level security for concurrent booking conflict prevention',
        'Implemented Redis-based distributed locking to prevent double-booking race conditions',
        'Built real-time notification pipeline with Kakao Alimtalk & PortOne webhook integration',
      ],
      ko: [
        '멀티 테넌트 스키마 + Row-level Security로 동시 예약 충돌 방지 설계',
        'Redis 분산 락으로 이중 예약 레이스 컨디션 제거',
        '카카오 알림톡 + 포트원 웹훅 기반 실시간 알림 파이프라인 구축',
      ],
    },
    architecture: {
      en: 'NestJS → PostgreSQL (primary) + Redis (session/lock) → AWS ECS (containerized) → CloudFront CDN',
      ko: 'NestJS → PostgreSQL (주 DB) + Redis (세션/락) → AWS ECS (컨테이너화) → CloudFront CDN',
    },
    color: '#00D2A0',
  },
  {
    id: 'itda',
    title: 'ITDA',
    subtitle: { en: 'Acquaintance Matching Platform', ko: '지인 매칭 플랫폼' },
    description: {
      en: 'Real-time matching & chat platform with AI-powered recommendations, payment settlement, and WebSocket messaging.',
      ko: 'WebSocket 기반 실시간 채팅 및 AI 추천 매칭 플랫폼. 결제/정산 시스템 포함.',
    },
    type: 'Platform',
    status: 'live',
    metrics: [
      { label: { en: 'Matching Accuracy', ko: '매칭 정확도' }, value: '87', unit: '%' },
      { label: { en: 'WS Latency', ko: 'WS 지연' }, value: '<50', unit: 'ms' },
      { label: { en: 'DB Query Opt.', ko: 'DB 쿼리 개선' }, value: '70', unit: '%' },
    ],
    stack: ['NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'WebSocket', 'Docker', 'AWS RDS'],
    highlights: {
      en: [
        'Optimized complex matching queries with composite index strategy — 70% query time reduction',
        'WebSocket room-based real-time messaging with Redis Pub/Sub for horizontal scaling',
        'Designed settlement engine with idempotent payment processing to prevent duplicate charges',
      ],
      ko: [
        '복합 인덱스 전략으로 매칭 쿼리 70% 성능 개선',
        'Redis Pub/Sub 기반 WS 수평 확장으로 실시간 채팅 동시성 확보',
        '멱등성 결제 처리 엔진으로 이중 청구 방지',
      ],
    },
    architecture: {
      en: 'NestJS Gateway → Redis Pub/Sub → WS Cluster → PostgreSQL (indexed) → AWS RDS Multi-AZ',
      ko: 'NestJS Gateway → Redis Pub/Sub → WS 클러스터 → PostgreSQL (인덱스 최적화) → AWS RDS Multi-AZ',
    },
    color: '#3B82F6',
  },
  {
    id: 'monster-hunt',
    title: 'Monster Hunt GameFi',
    subtitle: { en: 'P2E On-Chain Game', ko: 'P2E 온체인 게임' },
    description: {
      en: 'Play-to-Earn blockchain game with UUPS upgradeable smart contracts, ERC-20 reward tokens, and high-frequency on-chain transactions.',
      ko: 'UUPS 업그레이더블 컨트랙트, ERC-20 보상 토큰 기반 P2E 게임. Golang 고성능 백엔드.',
    },
    type: 'Web3',
    status: 'shipped',
    metrics: [
      { label: { en: 'TPS (peak)', ko: '최대 TPS' }, value: '1,200+', unit: 'tx/s' },
      { label: { en: 'Gas Savings', ko: '가스 절약' }, value: '40', unit: '%' },
      { label: { en: 'Contract Uptime', ko: '컨트랙트 가동' }, value: '100', unit: '%' },
    ],
    stack: ['Solidity', 'Golang', 'Redis', 'Gin', 'ERC-20', 'UUPS Proxy', 'Hardhat'],
    highlights: {
      en: [
        'Implemented UUPS upgradeable proxy pattern for zero-downtime contract upgrades',
        'Golang + Redis caching layer achieving 1,200+ TPS for game event processing',
        'ERC-20 reward token with anti-inflation emission schedule and on-chain governance',
      ],
      ko: [
        'UUPS 업그레이더블 프록시 패턴으로 무중단 컨트랙트 업그레이드 구현',
        'Golang + Redis 캐싱으로 게임 이벤트 처리 1,200+ TPS 달성',
        'Anti-inflation 발행 스케줄 및 온체인 거버넌스 ERC-20 토큰 설계',
      ],
    },
    architecture: {
      en: 'Golang API → Redis Cache → Solidity Contracts (UUPS) → Ethereum L2 → Event Indexer',
      ko: 'Golang API → Redis 캐시 → Solidity 컨트랙트 (UUPS) → Ethereum L2 → 이벤트 인덱서',
    },
    color: '#8B5CF6',
  },
  {
    id: 'web3-ticketing',
    title: 'Web3 Ticketing',
    subtitle: { en: 'NFT-based Event Ticketing', ko: 'NFT 기반 이벤트 티켓팅' },
    description: {
      en: 'Decentralized ticketing platform on Polygon & NEAR with Chainlink VRF lottery and PortOne payment bridge.',
      ko: 'Polygon, NEAR 네트워크 기반 Web3 티켓팅. Chainlink VRF 랜덤 추첨 및 PortOne 결제 연동.',
    },
    type: 'Web3',
    status: 'shipped',
    metrics: [
      { label: { en: 'NFTs Issued', ko: '발행 NFT' }, value: '10K+', unit: '' },
      { label: { en: 'Fraud Rate', ko: '위조율' }, value: '0', unit: '%' },
      { label: { en: 'VRF Fairness', ko: 'VRF 무결성' }, value: '100', unit: '%' },
    ],
    stack: ['Solidity', 'ERC-721', 'Chainlink VRF', 'Polygon', 'NEAR', 'NestJS', 'PortOne'],
    highlights: {
      en: [
        'ERC-721 Ticket NFT with soulbound option to prevent scalping',
        'Chainlink VRF integration for provably fair random draw lotteries',
        'Web2/Web3 data sync pipeline between PortOne, Seatio, and on-chain state',
      ],
      ko: [
        'ERC-721 Ticket NFT + Soulbound 옵션으로 암표 방지',
        'Chainlink VRF로 검증 가능한 공정 추첨 시스템 구현',
        'PortOne, Seatio, 온체인 상태 간 Web2/Web3 데이터 동기화 파이프라인',
      ],
    },
    architecture: {
      en: 'NestJS → PortOne → Solidity (ERC-721) → Polygon RPC → Chainlink VRF Oracle',
      ko: 'NestJS → PortOne → Solidity (ERC-721) → Polygon RPC → Chainlink VRF 오라클',
    },
    color: '#F59E0B',
  },
  {
    id: 'smartdocs-ai',
    title: 'SmartDocs-AI',
    subtitle: { en: 'LLM-powered Document Search', ko: 'LLM 기반 문서 검색 엔진' },
    description: {
      en: 'Semantic document search with RAG pipeline, FAISS vector store, and gRPC-connected Kotlin/Python microservice architecture.',
      ko: 'LangChain RAG, FAISS 벡터 DB, gRPC 연결 Kotlin/Python 마이크로서비스 아키텍처.',
    },
    type: 'AI',
    status: 'research',
    metrics: [
      { label: { en: 'Search Relevance', ko: '검색 정확도' }, value: '92', unit: '%' },
      { label: { en: 'P95 Latency', ko: 'P95 지연' }, value: '<800', unit: 'ms' },
      { label: { en: 'Doc Ingestion', ko: '문서 처리량' }, value: '5K', unit: 'docs/h' },
    ],
    stack: ['LangChain', 'FAISS', 'Python', 'Kotlin', 'gRPC', 'RAG', 'OpenAI'],
    highlights: {
      en: [
        'RAG pipeline with chunked embedding and hybrid BM25+semantic retrieval',
        'gRPC-based polyglot service: Kotlin orchestrator + Python ML inference worker',
        'FAISS index with incremental update strategy for real-time document ingestion',
      ],
      ko: [
        'BM25 + 시맨틱 하이브리드 검색 RAG 파이프라인 구축',
        'gRPC 폴리글랏: Kotlin 오케스트레이터 + Python ML 추론 워커',
        '실시간 문서 수집을 위한 FAISS 인덱스 증분 업데이트 전략',
      ],
    },
    architecture: {
      en: 'Kotlin API → gRPC → Python LangChain Worker → FAISS Index → OpenAI Embeddings',
      ko: 'Kotlin API → gRPC → Python LangChain 워커 → FAISS 인덱스 → OpenAI 임베딩',
    },
    color: '#EC4899',
  },
  {
    id: 'hyperledger-bridge',
    title: 'Native Asset & Bridge',
    subtitle: { en: 'Cross-chain Bridge on Hyperledger Fabric', ko: 'Hyperledger Fabric 크로스체인 브릿지' },
    description: {
      en: 'Native coin system on Hyperledger Fabric with Mint & Burn cross-chain bridge to Tendermint networks.',
      ko: 'Hyperledger Fabric 네이티브 코인 시스템 및 Tendermint ↔ Fabric 크로스체인 브릿지.',
    },
    type: 'Web3',
    status: 'shipped',
    metrics: [
      { label: { en: 'Bridge TPS', ko: '브릿지 TPS' }, value: '800+', unit: 'tx/s' },
      { label: { en: 'Finality', ko: '최종성' }, value: '<3', unit: 's' },
      { label: { en: 'Consensus', ko: '합의 검증' }, value: 'BFT', unit: '' },
    ],
    stack: ['Hyperledger Fabric', 'Go', 'Tendermint', 'gRPC', 'Protobuf', 'Docker'],
    highlights: {
      en: [
        'Modified Hyperledger Fabric core consensus (Raft/BFT) and Gossip protocol source code',
        'Designed Mint & Burn bridge with atomic cross-chain finality guarantee',
        'Built Prometheus Exporter for real-time Fabric network monitoring',
      ],
      ko: [
        'Hyperledger Fabric Core 합의(Raft/BFT) 및 Gossip 프로토콜 소스 수정',
        '원자적 크로스체인 최종성 보장 Mint & Burn 브릿지 설계',
        'Prometheus Exporter로 Fabric 네트워크 실시간 모니터링 구축',
      ],
    },
    architecture: {
      en: 'Fabric Peer (Go chaincode) → Bridge Service → Tendermint Node → Atomic Swap Protocol',
      ko: 'Fabric Peer (Go 체인코드) → 브릿지 서비스 → Tendermint 노드 → Atomic Swap 프로토콜',
    },
    color: '#06B6D4',
  },
];

// ─── Experience ─────────────────────────────────────────────
export interface ExperienceItem {
  period: { en: string; ko: string };
  company: string;
  role: { en: string; ko: string };
  type: string;
  impact: { en: string[]; ko: string[] };
  tech: string[];
}

export const experiences: ExperienceItem[] = [
  {
    period: { en: 'Jul 2025 – Present', ko: '2025.07 – 현재' },
    company: 'DeepLight (Musoft)',
    role: { en: 'Team Lead — Backend & Blockchain', ko: '팀장 — Backend & Blockchain' },
    type: 'Team Lead',
    impact: {
      en: [
        'Leading 6-person engineering team — defining architecture decisions & code review standards',
        'Delivered Madezone SaaS platform: multi-tenant booking with 99.9% uptime',
        'Built real-time AI character chat (Google Gemini + WebSocket) serving production users',
      ],
      ko: [
        '6인 엔지니어링 팀 리드 — 아키텍처 결정 및 코드 리뷰 기준 정립',
        'Madezone SaaS 플랫폼 출시: 멀티 테넌트 예약 시스템 99.9% 가동률 달성',
        '구글 Gemini + WebSocket 기반 AI 캐릭터 채팅 서비스 프로덕션 배포',
      ],
    },
    tech: ['NestJS', 'PostgreSQL', 'Redis', 'AWS ECS', 'React Native', 'Google Gemini'],
  },
  {
    period: { en: 'Sep 2024 – Jun 2025', ko: '2024.09 – 2025.06' },
    company: 'Modern Lion',
    role: { en: 'Manager — Blockchain & Backend', ko: '매니저 — Blockchain & Backend' },
    type: 'Senior',
    impact: {
      en: [
        'Architected Web3 ticketing on Polygon & NEAR — issued 10K+ NFT tickets with 0% fraud',
        'Implemented Chainlink VRF lottery ensuring provably fair random selection',
        'Bridged Web2/Web3 payments via PortOne + on-chain state sync (Seatio integration)',
      ],
      ko: [
        'Polygon, NEAR 기반 Web3 티켓팅 아키텍처 설계 — NFT 10K+ 발행, 위조율 0%',
        'Chainlink VRF 기반 검증 가능 공정 추첨 시스템 구현',
        'PortOne + 온체인 상태 동기화로 Web2/Web3 결제 브릿지 (Seatio 연동)',
      ],
    },
    tech: ['Solidity', 'ERC-721', 'Chainlink VRF', 'Polygon', 'NEAR', 'NestJS'],
  },
  {
    period: { en: 'Sep 2023 – Sep 2024', ko: '2023.09 – 2024.09' },
    company: 'Innogrid',
    role: { en: 'Senior Researcher — Blockchain & Backend', ko: '선임 연구원 — Blockchain & Backend' },
    type: 'Senior',
    impact: {
      en: [
        'Built LGE-COE ad platform on Hedera Hashgraph with reward token distribution system',
        'Implemented ZKP (Zero-Knowledge Proof) survey system for GDPR-grade privacy protection',
        'Designed gRPC-based microservice API with Node.js achieving sub-100ms p99 latency',
      ],
      ko: [
        'Hedera Hashgraph 기반 LGE-COE 광고 플랫폼 + 리워드 토큰 분배 시스템 구축',
        'ZKP(영지식 증명) 기반 개인정보 보호 설문 시스템 구현',
        'Node.js gRPC 마이크로서비스 API — p99 100ms 미만 지연 달성',
      ],
    },
    tech: ['Hedera Hashgraph', 'ZKP', 'Node.js', 'gRPC', 'NestJS'],
  },
  {
    period: { en: 'Jul 2022 – Aug 2023', ko: '2022.07 – 2023.08' },
    company: 'Medium',
    role: { en: 'Manager — Blockchain & Backend', ko: '매니저 — Blockchain & Backend' },
    type: 'Senior',
    impact: {
      en: [
        'Modified Hyperledger Fabric Core source (Raft consensus + Gossip protocol validation)',
        'Designed Native Asset system & cross-chain bridge with atomic Mint & Burn protocol',
        'Optimized high-volume transaction processing — 800+ TPS on permissioned ledger',
      ],
      ko: [
        'Hyperledger Fabric Core 소스 수정 (Raft 합의 + Gossip 프로토콜 검증)',
        'Native Asset 시스템 및 Atomic Mint & Burn 크로스체인 브릿지 설계',
        '고용량 트랜잭션 처리 최적화 — 허가형 원장에서 800+ TPS 달성',
      ],
    },
    tech: ['Hyperledger Fabric', 'Go', 'Tendermint', 'gRPC', 'Docker'],
  },
  {
    period: { en: 'Jul 2021 – Jun 2022', ko: '2021.07 – 2022.06' },
    company: 'MarkAny',
    role: { en: 'Assistant Manager — Blockchain & Backend', ko: '대리 — Blockchain & Backend' },
    type: 'Engineer',
    impact: {
      en: [
        'Advanced AnyBlock: Hyperledger Fabric monitoring with custom Prometheus Exporters',
        'Developed e-voting system for National Election Commission (NEC) with Fabric',
        'Built DID-based simplified identity system for Gangneung City citizen ID cards',
      ],
      ko: [
        'AnyBlock 고도화: Fabric 모니터링 + Prometheus Exporter 직접 개발',
        '중앙선거관리위원회 블록체인 기반 전자투표 시스템 개발',
        '강릉시 시민증을 위한 DID 기반 간편인증 시스템 구축',
      ],
    },
    tech: ['Hyperledger Fabric', 'Go', 'Prometheus', 'DID', 'Docker'],
  },
  {
    period: { en: 'Dec 2018 – Nov 2020', ko: '2018.12 – 2020.11' },
    company: 'Obzen',
    role: { en: 'Assistant Manager — Backend', ko: '대리 — Backend' },
    type: 'Engineer',
    impact: {
      en: [
        'Hyundai Capital: Designed batch & real-time campaign pipeline (Java, Oracle 11g)',
        'Renault Capital: Batch campaign and customer survey process architecture',
        'Hana Tour: CRM project execution + MCI/EAI channel integration for large-scale data mart',
      ],
      ko: [
        '현대캐피탈: Java/Oracle 11g 배치 + 실시간 캠페인 파이프라인 설계',
        '르노캐피탈: 배치 캠페인 및 고객 설문 프로세스 아키텍처',
        '하나투어 CRM + MCI/EAI 채널 연동 및 대용량 데이터 마트 설계',
      ],
    },
    tech: ['Java', 'Oracle 11g', 'Spring', 'MCI/EAI', 'CRM'],
  },
];

// ─── Tech Stack ─────────────────────────────────────────────
export interface TechItem {
  name: string;
  level: 'production' | 'proficient' | 'familiar';
  years?: number;
}

export interface TechCategory {
  id: string;
  label: { en: string; ko: string };
  icon: string;
  color: string;
  items: TechItem[];
}

export const techStack: TechCategory[] = [
  {
    id: 'backend',
    label: { en: 'Backend', ko: '백엔드' },
    icon: '⚙️',
    color: '#00D2A0',
    items: [
      { name: 'NestJS', level: 'production', years: 3 },
      { name: 'Spring Boot', level: 'production', years: 4 },
      { name: 'Node.js', level: 'production', years: 5 },
      { name: 'Go (Gin/gRPC)', level: 'production', years: 3 },
      { name: 'Kotlin', level: 'proficient', years: 2 },
      { name: 'Python', level: 'proficient', years: 2 },
      { name: 'REST / GraphQL', level: 'production', years: 5 },
      { name: 'WebSocket', level: 'production', years: 3 },
    ],
  },
  {
    id: 'blockchain',
    label: { en: 'Blockchain / Web3', ko: '블록체인 / Web3' },
    icon: '🔗',
    color: '#8B5CF6',
    items: [
      { name: 'Hyperledger Fabric', level: 'production', years: 4 },
      { name: 'Solidity (ERC-20/721)', level: 'production', years: 3 },
      { name: 'Ethereum / Polygon', level: 'production', years: 3 },
      { name: 'Chainlink VRF', level: 'production', years: 2 },
      { name: 'NEAR Protocol', level: 'proficient', years: 1 },
      { name: 'Hedera Hashgraph', level: 'production', years: 1 },
      { name: 'ZKP / DID', level: 'production', years: 2 },
      { name: 'Tendermint', level: 'proficient', years: 1 },
    ],
  },
  {
    id: 'database',
    label: { en: 'Database & Cache', ko: '데이터베이스 & 캐시' },
    icon: '🗄️',
    color: '#F59E0B',
    items: [
      { name: 'PostgreSQL', level: 'production', years: 4 },
      { name: 'MySQL / Oracle', level: 'production', years: 5 },
      { name: 'Redis', level: 'production', years: 3 },
      { name: 'FAISS (Vector DB)', level: 'proficient', years: 1 },
      { name: 'Schema & Index Tuning', level: 'production', years: 5 },
      { name: 'Query Optimization', level: 'production', years: 5 },
    ],
  },
  {
    id: 'cloud',
    label: { en: 'Cloud & DevOps', ko: '클라우드 & DevOps' },
    icon: '☁️',
    color: '#3B82F6',
    items: [
      { name: 'AWS EC2 / ECS', level: 'production', years: 4 },
      { name: 'AWS RDS / S3', level: 'production', years: 4 },
      { name: 'AWS CloudFront', level: 'production', years: 3 },
      { name: 'Docker', level: 'production', years: 4 },
      { name: 'GitHub Actions CI/CD', level: 'production', years: 3 },
      { name: 'Kubernetes', level: 'proficient', years: 1 },
      { name: 'Prometheus / Grafana', level: 'production', years: 2 },
    ],
  },
];

// ─── Architecture Nodes (for showcase) ──────────────────────
export interface ArchNode {
  id: string;
  label: string;
  type: 'client' | 'gateway' | 'service' | 'db' | 'infra' | 'external';
  x: number;
  y: number;
  description: { en: string; ko: string };
}

export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
  style?: 'solid' | 'dashed';
}

export const architectureNodes: ArchNode[] = [
  { id: 'client', label: 'Client\n(Web/App)', type: 'client', x: 50, y: 50, description: { en: 'React / React Native frontend', ko: 'React / React Native 프론트엔드' } },
  { id: 'cdn', label: 'CloudFront\nCDN', type: 'infra', x: 200, y: 50, description: { en: 'AWS CloudFront for global edge caching', ko: 'AWS CloudFront 글로벌 엣지 캐싱' } },
  { id: 'gateway', label: 'API Gateway\n(NestJS)', type: 'gateway', x: 370, y: 50, description: { en: 'NestJS REST + WebSocket gateway with JWT auth', ko: 'NestJS REST + WebSocket 게이트웨이, JWT 인증' } },
  { id: 'redis', label: 'Redis\nCache/Pub-Sub', type: 'db', x: 550, y: 20, description: { en: 'Session cache, distributed lock, Pub/Sub', ko: '세션 캐시, 분산 락, Pub/Sub' } },
  { id: 'postgres', label: 'PostgreSQL\nRDS Multi-AZ', type: 'db', x: 550, y: 100, description: { en: 'Primary database on AWS RDS Multi-AZ', ko: 'AWS RDS Multi-AZ 주 데이터베이스' } },
  { id: 'worker', label: 'Job Worker\n(BullMQ)', type: 'service', x: 370, y: 160, description: { en: 'Async job queue for heavy processing', ko: '무거운 처리를 위한 비동기 잡 큐' } },
  { id: 'ecs', label: 'AWS ECS\n(Fargate)', type: 'infra', x: 200, y: 160, description: { en: 'Containerized microservices on ECS Fargate', ko: 'ECS Fargate 컨테이너화 마이크로서비스' } },
  { id: 'blockchain', label: 'Blockchain\n(Fabric/EVM)', type: 'external', x: 550, y: 160, description: { en: 'Hyperledger Fabric or EVM-compatible chain', ko: 'Hyperledger Fabric 또는 EVM 호환 체인' } },
];

export const architectureEdges: ArchEdge[] = [
  { from: 'client', to: 'cdn', label: 'HTTPS' },
  { from: 'cdn', to: 'gateway', label: 'Forward' },
  { from: 'gateway', to: 'redis', label: 'Cache/Lock' },
  { from: 'gateway', to: 'postgres', label: 'ORM' },
  { from: 'gateway', to: 'worker', label: 'Queue', style: 'dashed' },
  { from: 'worker', to: 'blockchain', label: 'TX', style: 'dashed' },
  { from: 'ecs', to: 'gateway', label: 'Scale' },
];

// ─── Certifications & Awards ─────────────────────────────────
export const certifications = [
  { title: { en: 'Information Processing Engineer', ko: '정보처리기사' }, date: '2019.05', org: 'HRDK' },
  { title: { en: 'Computer Specialist Level-1', ko: '컴퓨터활용능력 1급' }, date: '2021.07', org: 'KCCI' },
  { title: { en: 'Network Master Level-2', ko: '네트워크관리사 2급' }, date: '2017.09', org: 'ICQA' },
  { title: { en: 'Linux Master Level-2', ko: '리눅스마스터 2급' }, date: '2017.05', org: 'KAIT' },
  { title: { en: 'OCJP (Java SE 6)', ko: 'OCJP (Java SE 6)' }, date: '2016.12', org: 'Oracle' },
];

export const awards = [
  { title: { en: '1st Prize — 1st Blockchain Academy (Sogang University)', ko: '제1회 블록체인 학술대회 최우수상 (서강대)' }, date: '2018' },
  { title: { en: 'Academic Excellence Award (Grand Prize)', ko: '학업 성적 우수 최우수상' }, date: '2018' },
  { title: { en: 'Programming Championship Excellence Award', ko: '프로그래밍 챔피언십 우수상' }, date: '2015' },
];

// ─── Personal Info ────────────────────────────────────────────
export const personalInfo = {
  name: 'Youngsoo Sa',
  brandName: 'Dotorio',
  title: { en: 'Backend · Cloud · Blockchain Engineer', ko: '백엔드 · 클라우드 · 블록체인 엔지니어' },
  tagline: {
    en: 'Engineering Resilient Systems & Scalable Architectures',
    ko: '회복력 있는 시스템과 확장 가능한 아키텍처를 설계합니다',
  },
  about: {
    en: 'Backend and Blockchain Engineer with 6+ years of experience building high-availability distributed systems. Specialize in concurrent processing, query optimization, and distributed ledger design across Web2, Web3, and AI stacks. Currently leading engineering at DeepLight (Musoft).',
    ko: '6년+ 경력의 백엔드 & 블록체인 엔지니어. 고가용성 분산 시스템 구축, 동시성 처리, 쿼리 최적화, 분산 원장 설계를 전문으로 합니다. Web2, Web3, AI 스택을 아우르며, 현재 딥라이트(Musoft)에서 개발 팀장으로 재직 중입니다.',
  },
  location: 'Seoul, South Korea',
  email: 'leo.yssa@gmail.com',
  github: 'https://github.com/leo-yssa',
  linkedin: 'https://linkedin.com/in/youngsoo-sa',
  status: { en: 'Open for collaboration', ko: '협업 문의 환영' },
};
