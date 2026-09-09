// ============================================================
// Youngsoo Sa (Dotorio) Portfolio — Core Data Layer
// ============================================================

export type Locale = 'en' | 'ko';

// ─── Navigation ────────────────────────────────────────────
export const navItems = [
  { id: 'about', label: { en: 'About', ko: '소개' } },
  { id: 'projects', label: { en: 'Projects', ko: '프로젝트' } },
  { id: 'architecture', label: { en: 'Architecture', ko: '아키텍처' } },
  { id: 'experience', label: { en: 'Experience', ko: '경력' } },
  { id: 'stack', label: { en: 'Stack', ko: '기술 스택' } },
  { id: 'credentials', label: { en: 'Credentials', ko: '학력·자격' } },
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
  type: 'AI' | 'Web3' | 'Platform' | 'B2B' | 'Fintech';
  status: 'live' | 'shipped' | 'research';
  metrics: ProjectMetric[];
  stack: string[];
  highlights: { en: string[]; ko: string[] };
  architecture: { en: string; ko: string };
  architectureDoc?: {
    overview: { en: string; ko: string };
    keyDecisions: { title: { en: string; ko: string }; desc: { en: string; ko: string } }[];
    dataFlow: string[];
  };
  github?: string;
  live?: string;
  color: string;
  personal?: boolean;
}

export const projects: ProjectItem[] = [
  {
    id: 'ccuc-ai',
    title: '꾸욱 (CCUC)',
    subtitle: {
      en: 'AI Character Interaction & Simulation Platform',
      ko: '생성형 AI 캐릭터 대화 및 시뮬레이션 플랫폼',
    },
    description: {
      en: 'Full-stack AI character platform featuring multi-LLM orchestration (Gemini/Claude), real-time WebSocket chunk streaming, token optimization (Lagged & Rolling Summary), and automated PostgreSQL monthly partitioning.',
      ko: 'Gemini, Claude 등 멀티 LLM 오케스트레이션과 실시간 웹소켓 청크 스트리밍, 1턴 지연 및 동적 롤링 요약 기반 토큰 최적화, 대화 로그 자동 월별 파티셔닝이 적용된 AI 인터랙션 플랫폼.',
    },
    type: 'AI',
    status: 'live',
    metrics: [
      { label: { en: 'Cost Bomb Prevention', ko: '비용 폭탄 방지' }, value: '100', unit: '%' },
      { label: { en: 'Context Retained', ko: '대화 맥락 보존' }, value: '1,000+', unit: 'turns' },
    ],
    stack: [
      'NestJS',
      'TypeScript',
      'PostgreSQL (Partitioning)',
      'TypeORM',
      'Redis',
      'WebSocket (Socket.io)',
      'Google Gemini',
      'Claude Opus',
      'Vertex AI',
      'React',
      'React Native',
    ],
    highlights: {
      en: [
        'Designed Lagged Summarization (1-turn delay) to eliminate memory distortion and prevent double-summary billing on regeneration',
        'Built Rolling Summary pipeline by model max tokens, preserving long-term context over 1,000+ turns without context overflow',
        'Engineered decoupled WebSocket stream architecture: token streaming + statusDelta game stats + situational image generation triggers',
        'Implemented automatic monthly table partitioning (ChatPartitionService) for the chat_messages table to maintain query performance and archiving stability',
      ],
      ko: [
        '1턴 지연 요약(Lagged Summarization) 기법을 자체 고안하여 답변 재생성 시 기억 왜곡 방지 및 중복 과금 100% 차단',
        '모델별 Max Token 기반 동적 청크 롤링 요약(Rolling Summary) 파이프라인으로 수천 턴 대화에서도 비용 폭증 방지 및 맥락 보존',
        'WebSocket 기반 실시간 청크 스트리밍과 게임 스탯(호감도/도파민/HP 변동 delta), 상황 이미지 생성 트리거를 분리 비동기 처리',
        '월별 chat_messages 테이블 자동 파티셔닝(ChatPartitionService) 구축으로 쿼리 성능 유지 및 데이터 아카이빙 안정성 확보',
      ],
    },
    architecture: {
      en: 'Client (Web/RN) ↔ Socket.io Gateway ↔ LLM Orchestrator (Lagged & Rolling Summary) ↔ Redis Cache / PostgreSQL (Monthly Partitioned)',
      ko: '클라이언트 (React/App) ↔ Socket.io 게이트웨이 ↔ LLM 오케스트레이터 (1턴 지연 & 롤링 요약) ↔ Redis 캐시 / PostgreSQL (월별 파티셔닝)',
    },
    architectureDoc: {
      overview: {
        en: 'Realtime AI interaction architecture optimized for token efficiency and stable conversation log persistence.',
        ko: '실시간 스트리밍, 대화 토큰 비용 최적화, 안정적인 대화 로그 저장을 위한 아키텍처.',
      },
      keyDecisions: [
        {
          title: { en: 'Lagged Summarization & Token Quota', ko: '1턴 지연 요약 및 토큰 버짓 최적화' },
          desc: {
            en: 'Prevents summarizing unfinalized user turns and dynamically rolls chunks to prevent LLM context limit overflows.',
            ko: '사용자의 재생성/삭제 가능성을 고려해 1턴 지연 후 요약하며, 모델별 컨텍스트 상한에 맞춰 동적으로 롤링 압축합니다.',
          },
        },
        {
          title: { en: 'PostgreSQL Monthly Partitioning', ko: 'PostgreSQL 월별 자동 파티셔닝' },
          desc: {
            en: 'Partitioned chat_messages tables by month to maintain query performance and ensure stable data archiving.',
            ko: '월별 파티셔닝 테이블을 자동 생성·라우팅하여 쿼리 성능 유지 및 데이터 아카이빙 안정성을 확보합니다.',
          },
        },
      ],
      dataFlow: [
        'User message received via WebSocket → Stored in PostgreSQL with idempotency check',
        'Context Window Builder loads conversation history + lagged summary + game progress',
        'LLM Stream chunks emitted in real-time → statusDelta & image unlock parsed concurrently',
        'Async background task persists assistant message and triggers partition archiving',
      ],
    },
    color: '#00D2A0',
  },
  {
    id: 'konkrit-web3',
    title: 'Konkrit & Konkrit Renewal',
    subtitle: {
      en: 'High-Traffic NFT Ticketing Platform',
      ko: '대규모 트래픽 NFT 티켓팅 & 체인 인덱서 플랫폼',
    },
    description: {
      en: 'NFT ticketing platform on Polygon, Ethereum, and NEAR Protocol with a Chainlink VRF on-chain lottery and GitOps deployment (K8s/ArgoCD).',
      ko: 'Polygon, Ethereum, NEAR 체인 기반 NFT 티켓팅 플랫폼. Chainlink VRF 온체인 무작위 추첨 및 Kubernetes/ArgoCD 기반 GitOps 배포 구현.',
    },
    type: 'Web3',
    status: 'live',
    metrics: [
      { label: { en: 'Draw Mechanism', ko: '추첨 방식' }, value: 'Chainlink VRF', unit: '' },
      { label: { en: 'Deployment', ko: '배포 방식' }, value: 'GitOps', unit: '' },
    ],
    stack: [
      'NestJS',
      'Near Protocol (Rust/JS)',
      'Solidity',
      'Chainlink VRF',
      'Polygon',
      'Kubernetes',
      'ArgoCD',
      'Keycloak',
      'PostgreSQL',
    ],
    highlights: {
      en: [
        'Implemented on-chain verifiable lottery smart contract using Chainlink VRF (Verifiable Random Function)',
        'Built Near Protocol smart contracts and realtime ledger data extraction & indexing pipeline',
        'Operated GitOps deployment workflows on Kubernetes & ArgoCD, maintaining enterprise auth via Keycloak',
      ],
      ko: [
        'Chainlink VRF(검증 가능한 온체인 난수) 기반 스마트 컨트랙트 개발로 티켓팅 추첨의 공정성과 투명성 확보',
        'Near Protocol 스마트 컨트랙트(Rust/JS) 개발 및 온체인 원장 데이터의 실시간 수집·가공·인덱싱 파이프라인 구축',
        'Kubernetes 및 ArgoCD 기반 GitOps 배포 파이프라인 운영 및 Keycloak 인증/인가 체계 유지보수',
      ],
    },
    architecture: {
      en: 'Client ↔ NestJS Gateway ↔ Keycloak Auth ↔ Near/Polygon Contract ↔ Chainlink VRF Oracle ↔ Indexer Worker',
      ko: '클라이언트 ↔ NestJS 게이트웨이 ↔ Keycloak 인증 ↔ Near/Polygon 컨트랙트 ↔ Chainlink VRF 오라클 ↔ 인덱서 워커',
    },
    architectureDoc: {
      overview: {
        en: 'Fair on-chain ticketing with hybrid Web2 payment and Web3 NFT issuance architecture.',
        ko: '공정한 온체인 추첨과 Web2 결제·Web3 NFT 발급이 결합된 하이브리드 티켓팅 아키텍처.',
      },
      keyDecisions: [
        {
          title: { en: 'Provably Fair VRF Draws', ko: 'Chainlink VRF 온체인 추첨' },
          desc: {
            en: 'Replaced black-box server draws with tamper-proof cryptographic random proofs directly verifiable on-chain.',
            ko: '중앙 서버 추첨 대신 블록체인 온체인에서 수학적으로 증명 가능한 난수를 사용하여 조작 불가능한 추첨 시스템을 완성했습니다.',
          },
        },
      ],
      dataFlow: [
        'User enters lottery → Entry recorded with signed transaction',
        'Lottery trigger calls Chainlink VRF Coordinator contract',
        'Random seed returned in callback → Winners selected on-chain',
        'Indexer service detects event → Syncs state to PostgreSQL and notifies user',
      ],
    },
    color: '#8B5CF6',
  },
  {
    id: 'lge-web3-survey',
    title: 'LGE Web3 ZKP Survey Platform',
    subtitle: {
      en: 'Zero-Knowledge Privacy-Preserving Anonymous Survey',
      ko: '영지식 증명(ZKP) 기반 익명 설문 플랫폼',
    },
    description: {
      en: 'Enterprise anonymous survey smart contract on Ethereum and Hedera Hashgraph using zk-SNARKs and Merkle Trees to validate eligible participants without exposing identity.',
      ko: 'Ethereum 및 Hedera Hashgraph 상에서 zk-SNARK 및 Merkle Tree를 활용하여 참여자의 신원을 노출하지 않고 유효 참여자 여부를 검증하는 영지식 증명(ZKP) 기반 익명 설문 스마트 컨트랙트.',
    },
    type: 'Web3',
    status: 'shipped',
    metrics: [
      { label: { en: 'Privacy Grade', ko: '개인정보 보호' }, value: 'ZKP', unit: '' },
      { label: { en: 'Ledger Network', ko: '블록체인 네트워크' }, value: 'Hedera/ETH', unit: '' },
    ],
    stack: ['Solidity', 'NestJS', 'zk-SNARK', 'Merkle Tree', 'Hedera Hashgraph'],
    highlights: {
      en: [
        'Developed zk-SNARK & Merkle tree verification logic to prove participant eligibility anonymously',
        'Built the anonymous survey smart contract and NestJS backend',
      ],
      ko: [
        'zk-SNARK 및 Merkle Tree 라이브러리를 활용한 익명 증명(ZKP) 파이프라인 및 Solidity 컨트랙트 구현',
        '익명 설문 스마트 컨트랙트 개발 및 NestJS 백엔드 구축',
      ],
    },
    architecture: {
      en: 'Client (ZKP Proof Generation) → NestJS Backend → Ethereum / Hedera Smart Contract',
      ko: '클라이언트 (ZKP 증명 생성) → NestJS 백엔드 → Ethereum / Hedera 스마트 컨트랙트',
    },
    color: '#3B82F6',
  },
  {
    id: 'did-w3c-platform',
    title: 'W3C Decentralized Identity (DID/VC)',
    subtitle: {
      en: 'Self-Sovereign Identity & Verifiable Credentials',
      ko: 'W3C 표준 분산 신원증명(DID/VC) 플랫폼',
    },
    description: {
      en: 'Decentralized identity platform on Hyperledger Fabric adhering to W3C DID/VC standards, featuring Issuer/Verifier APIs, DID Document Resolvers, and public sector PoC (National Election Commission).',
      ko: 'Hyperledger Fabric 기반 W3C 표준 분산 신원증명 플랫폼. Issuer/Verifier API, DID Storage 체인코드(Go), 중앙선관위 전자투표 및 강릉시민증 PoC 시스템 구축.',
    },
    type: 'Web3',
    status: 'shipped',
    metrics: [
      { label: { en: 'Standards', ko: '표준 준수' }, value: 'W3C DID', unit: '' },
      { label: { en: 'Ledger', ko: '원장' }, value: 'Hyperledger Fabric', unit: '' },
    ],
    stack: ['Hyperledger Fabric', 'Go (Chaincode)', 'NestJS', 'TypeScript', 'W3C DID/VC', 'Docker', 'Python'],
    highlights: {
      en: [
        'Designed W3C-compliant Issuer/Verifier REST API servers using NestJS',
        'Implemented on-chain DID Document Resolver & Storage Chaincode in Golang',
        'Built electronic voting and citizen ID PoC with immutable distributed ledger for National Election Commission & Gangneung City',
      ],
      ko: [
        'W3C 표준 규격에 맞춘 분산 신원증명 체계 Issuer(발급기관) 및 Verifier(검증기관) NestJS API 설계·구현',
        'Hyperledger Fabric 원장 상에 DID 식별자 및 공개키/인증 정보를 안전하게 관리하는 DID Storage 체인코드(Go) 개발',
        '중앙선거관리위원회 전자투표 및 강릉시민증 위변조 방지를 위한 블록체인 합의 네트워크 및 미들웨어 구축',
      ],
    },
    architecture: {
      en: 'Mobile Wallet (VC) ↔ NestJS Verifier/Issuer API ↔ Fabric Peer (Go DID Chaincode) ↔ Universal Resolver',
      ko: '모바일 지갑 (VC) ↔ NestJS 발급/검증 API ↔ Fabric Peer (Go DID 체인코드) ↔ Universal Resolver',
    },
    color: '#06B6D4',
  },
  {
    id: 'did-vc-payment-reference',
    title: 'DID/VC 신원인증 결제 플랫폼 레퍼런스 구현',
    subtitle: {
      en: 'Personal Project — On-Chain Identity & Verifiable Credential Payment Reference Architecture',
      ko: '개인 프로젝트 — 온체인 신원증명(DID/VC) 기반 결제 레퍼런스 아키텍처',
    },
    description: {
      en: 'A personal reference architecture combining on-chain DID/VC identity verification with a gasless payment relay pipeline, built on a private Hyperledger Besu network with a custom QBFT validator cluster.',
      ko: '사설 Hyperledger Besu 네트워크와 자체 QBFT 검증자 클러스터 위에서, 온체인 DID/VC 신원 검증과 가스리스 결제 릴레이 파이프라인을 결합한 개인 레퍼런스 아키텍처 프로젝트.',
    },
    type: 'Web3',
    status: 'research',
    personal: true,
    metrics: [
      { label: { en: 'Ingestion Latency', ko: '수신 API 응답' }, value: '<50', unit: 'ms' },
      { label: { en: 'Fault Tolerance', ko: '장애 허용' }, value: 'f=1', unit: '4-node QBFT' },
      { label: { en: 'Quorum', ko: '쿼럼' }, value: '2f+1=3', unit: '' },
    ],
    stack: [
      'Hyperledger Besu',
      'Solidity',
      'QBFT',
      'did:ethr',
      'BBS+',
      'OpenID4VCI/VP',
      'ICAO PKD',
      'EIP-712',
      'ERC-2771',
      'Kafka',
      'Redis',
      'React',
      'WebCrypto',
      'JWT',
    ],
    highlights: {
      en: [
        'Designed three on-chain identity contracts — DIDRegistry (did:ethr), IssuerRegistry, and RevocationRegistry — so issuer trust and credential revocation status are always read from-chain rather than trusted to backend logic',
        'Built both a single-node dev profile and a 4-validator QBFT cluster profile; wrote and ran a failover test killing one of four validators to confirm safety and liveness held (f=1 fault tolerance, quorum 2f+1=3)',
        'Implemented BBS+ selective-disclosure credential issuance with OpenID4VCI/OpenID4VP flows, plus an ICAO PKD CSCA certificate sync pipeline so passport-based credential issuance validates against real international trust anchors',
        'Built an EIP-712 + ERC-2771 gasless meta-transaction relay pipeline so users sign without holding gas',
        'Split the payment submission API into fast ingestion and async verification/broadcast over Kafka, keeping ingestion response time under 50ms; managed a multi-relayer hot-wallet key pool with Redis atomic INCR nonce tracking (no per-request on-chain lookups), TTL-lock round-robin concurrency, and nonce rollback/DLQ routing on failure',
        'Added JWT-based role separation for admin/merchant access and settlement statistics API guards',
        'Built React wallet and merchant demo apps with WebCrypto keyring signing, plus an admin console and on-chain event explorer to visualize the full DID/VC issue-submit-verify flow',
      ],
      ko: [
        'DIDRegistry(did:ethr), IssuerRegistry, RevocationRegistry 3개 온체인 컨트랙트를 직접 설계하여 발급기관 신뢰 여부·자격증명 폐기 상태를 백엔드가 임의 판단하지 않고 항상 온체인에서 조회하도록 강제',
        '단일 노드 개발 프로파일과 4-validator QBFT 클러스터 프로파일을 각각 구성, 4노드 중 1노드를 강제 종료하는 failover 테스트를 작성·실행해 안전성·활성 유지 확인 (f=1 장애 허용, 쿼럼 2f+1=3)',
        'BBS+ 서명 기반 선택적 공개(Selective Disclosure) 자격증명 발급 및 OpenID4VCI/OpenID4VP 흐름 구현, ICAO PKD CSCA 인증서 동기화 파이프라인 구축으로 여권 기반 VC 발급 시 실제 국제 표준 신뢰 앵커 검증',
        'EIP-712 서명 + ERC-2771 기반 가스리스 메타트랜잭션 릴레이 파이프라인 구현',
        '결제 제출 API를 빠른 수신(Fast Ingestion)과 Kafka 기반 비동기 검증/브로드캐스트로 분리해 수신 응답 시간을 50ms 이내로 유지, 다중 릴레이어 핫월렛 키 풀을 Redis 원자적 INCR로 관리(매 요청 온체인 조회 없이 nonce 추적)하고 TTL 락 기반 라운드로빈 동시성 처리, 실패 시 nonce 롤백/DLQ 라우팅 구현',
        'JWT 기반 관리자/가맹점 역할 분리 가드 및 정산 통계 API 접근 제어 추가',
        'WebCrypto 기반 키링 서명을 사용하는 React 지갑/가맹점 데모 앱과, DID/VC 발급-제출-검증 전 과정을 시각적으로 확인할 수 있는 관리 콘솔 및 온체인 이벤트 익스플로러 구축',
      ],
    },
    architecture: {
      en: 'Wallet/Merchant Client → Fast Ingestion API → Kafka → Async Verification Workers (EIP-712 + On-chain VC Check) → Meta-tx Relayer (ERC-2771) → Besu QBFT Network (DIDRegistry / IssuerRegistry / RevocationRegistry)',
      ko: '지갑/가맹점 클라이언트 → 빠른 수신 API → Kafka → 비동기 검증 워커 (EIP-712 서명 + 온체인 VC 검증) → 메타트랜잭션 릴레이어 (ERC-2771) → Besu QBFT 네트워크 (DIDRegistry / IssuerRegistry / RevocationRegistry)',
    },
    architectureDoc: {
      overview: {
        en: 'A personal reference implementation demonstrating how on-chain identity trust (DID/VC) can be combined with a high-throughput, gasless payment relay without compromising verification integrity.',
        ko: '온체인 신원 신뢰 체계(DID/VC)를 검증 무결성 손상 없이 고처리량 가스리스 결제 릴레이와 결합하는 방법을 보여주는 개인 레퍼런스 구현.',
      },
      keyDecisions: [
        {
          title: { en: 'On-Chain Trust Source of Truth', ko: '온체인 신뢰 소스' },
          desc: {
            en: 'Issuer trust and revocation checks are always read from IssuerRegistry/RevocationRegistry on-chain rather than cached or trusted in application code, removing a single point of falsifiable trust.',
            ko: '발급기관 신뢰 여부와 자격증명 폐기 상태를 애플리케이션 코드에서 캐싱하거나 임의로 신뢰하지 않고, 항상 IssuerRegistry/RevocationRegistry 온체인 조회로 판단하도록 강제하여 위변조 가능한 단일 신뢰 지점을 제거.',
          },
        },
        {
          title: { en: 'QBFT Fault Tolerance', ko: 'QBFT 장애 허용 설계' },
          desc: {
            en: 'A 4-validator QBFT cluster tolerates 1 validator failure (f=1, quorum 2f+1=3); validated with an actual failover test that killed one node and confirmed continued safety and liveness.',
            ko: '4-validator QBFT 클러스터로 1개 노드 장애까지 허용(f=1, 쿼럼 2f+1=3)하도록 설계했고, 실제 노드 1개를 강제 종료하는 failover 테스트로 안전성·활성 유지를 검증.',
          },
        },
        {
          title: { en: 'Fast Ingestion / Async Verification Split', ko: '빠른 수신 / 비동기 검증 분리' },
          desc: {
            en: 'Payment submission is split into a fast-ack ingestion API and Kafka-driven async workers that perform EIP-712 signature and on-chain VC verification, keeping client-facing latency under 50ms regardless of verification cost.',
            ko: '결제 제출을 빠른 응답의 수신 API와 Kafka 기반 비동기 검증 워커(EIP-712 서명 및 온체인 VC 검증)로 분리하여, 검증 비용과 무관하게 클라이언트 응답 지연을 50ms 이내로 유지.',
          },
        },
      ],
      dataFlow: [
        'Wallet/Merchant signs payment intent (EIP-712) and submits to the Fast Ingestion API',
        'Ingestion API acknowledges immediately and publishes the signed intent to Kafka',
        'Async worker verifies the EIP-712 signature and checks IssuerRegistry/RevocationRegistry on-chain state',
        'Verified transaction is handed to the meta-tx relayer, which pulls a nonce via Redis atomic INCR from the hot-wallet key pool and submits via ERC-2771',
        'On failure, the nonce is rolled back and the transaction routes to a DLQ for retry/inspection',
      ],
    },
    color: '#6366F1',
  },
  {
    id: 'fintech-crm',
    title: 'Enterprise Fintech CRM & Batch Engine',
    subtitle: {
      en: 'Automated Marketing Distribution & High-Volume ETL',
      ko: '금융권 대용량 CRM & 마케팅 분산 배치 스케줄러',
    },
    description: {
      en: 'High-volume customer CRM and distributed batch marketing platform for Hyundai Capital and Renault Capital, eliminating manual excel tasks via custom scheduling algorithms.',
      ko: '현대캐피탈 및 르노캐피탈 대용량 고객 데이터 CRM 솔루션 커스터마이징. 수작업 엑셀 배정 업무를 해결한 채널별 분산 배치 스케줄링 알고리즘 구축 및 프로젝트 리더(PL) 수행.',
    },
    type: 'Fintech',
    status: 'shipped',
    metrics: [
      { label: { en: 'Manual Process', ko: '수작업 처리' }, value: 'Days → 1-Click', unit: '' },
      { label: { en: 'Role', ko: '역할' }, value: 'Project Leader', unit: '' },
    ],
    stack: ['Java', 'Spring Framework', 'JPA', 'PostgreSQL', 'Oracle 11g', 'Angular', 'Python'],
    highlights: {
      en: [
        'Served as Project Leader (PL), directing interface design and technical scheduling',
        'Invented automated customer group combination and channel distribution scheduling algorithm (SMS/Alimtalk/Email)',
        'Designed high-volume ETL data marts and optimized complex SQL queries for large customer segments',
      ],
      ko: [
        '프로젝트 리더(PL)로서 고객사 인터페이스 설계, 개발 일정 조율 및 팀 분장 총괄',
        '채널별(SMS/알림톡/Email) 일일 수용량과 우선순위를 반영한 "자동 고객 그룹 조합 및 분산 배치 스케줄링 알고리즘" 자체 설계·도입',
        '수작업으로 며칠씩 걸리던 마케팅 배정 업무를 클릭 한 번의 자동화로 단축하여 고객사 신뢰 확보',
      ],
    },
    architecture: {
      en: 'Enterprise Data Mart (Oracle/PG) → Spring Batch Engine (Custom Scheduling) → Multi-Channel Dispatcher (SMS/Kakao/Email)',
      ko: '엔터프라이즈 데이터 마트 (Oracle/PG) → Spring 배치 엔진 (스케줄링 알고리즘) → 멀티 채널 디스패처 (SMS/알림톡/Email)',
    },
    color: '#F59E0B',
  },
  {
    id: 'madezone',
    title: 'Madezone',
    subtitle: { en: 'Smart Study Space Management Platform', ko: '스마트 독서실 관리 시스템' },
    description: {
      en: 'Full-stack study space management platform with real-time attendance tracking and PortOne payment integration.',
      ko: '실시간 출결 관리 및 포트원 결제 연동이 적용된 스마트 독서실 풀스택 관리 시스템.',
    },
    type: 'Platform',
    status: 'live',
    metrics: [
      { label: { en: 'Role', ko: '역할' }, value: 'Full-Stack', unit: '' },
    ],
    stack: ['React Native', 'NestJS', 'TypeScript', 'PostgreSQL', 'PortOne', 'Docker'],
    highlights: {
      en: [
        'Developed full-stack mobile app (React Native) and backend API services',
        'Built real-time attendance and payment integration via PortOne',
        'Delivered manager dashboard for branch operations',
      ],
      ko: [
        '모바일 앱(React Native) 및 백엔드 전반 풀스택 개발',
        '실시간 출결 상태 및 결제 시스템 연동',
        '점주용 관리자 대시보드 구축',
      ],
    },
    architecture: {
      en: 'React Native App → NestJS API Gateway → PostgreSQL → PortOne Payment Webhooks',
      ko: 'React Native 모바일 앱 → NestJS API 게이트웨이 → PostgreSQL → 포트원 결제 웹훅',
    },
    color: '#10B981',
  },
  {
    id: 'ble-medical-sdk',
    title: 'Android Bluetooth SDK',
    subtitle: {
      en: 'In-House Short-Term Project — BLE Medical Device Communication SDK',
      ko: '사내 단기 프로젝트 — BLE 의료기기 통신 SDK',
    },
    description: {
      en: 'Reusable Android library (AAR) module for communicating with a BLE (Bluetooth Low Energy) medical device — custom binary protocol parsing, device authentication/registration handshake, and history (dose/injection site) sync with local persistence.',
      ko: 'BLE(Bluetooth Low Energy) 의료기기와 통신하는 재사용 가능한 Android 라이브러리(AAR) 모듈. 커스텀 바이너리 프로토콜 파싱, 기기 인증/등록 핸드셰이크, 이력(주사 용량/부위) 동기화 및 로컬 영속 저장을 담당.',
    },
    type: 'Platform',
    status: 'shipped',
    metrics: [
      { label: { en: 'Duration', ko: '개발 기간' }, value: '~1', unit: 'week' },
      { label: { en: 'Delivery Format', ko: '배포 형태' }, value: 'AAR Library', unit: '' },
      { label: { en: 'Protocol', ko: '프로토콜' }, value: 'Custom BLE Binary', unit: '' },
    ],
    stack: ['Kotlin', 'Android Library Module', 'RxJava2/RxAndroid', 'RxAndroidBLE', 'Gson', 'JUnit'],
    highlights: {
      en: [
        'Designed a custom BLE binary protocol parser handling STX-framed packets (command/length/payload/CRC16) alongside ASCII responses (firmware version, RTC time, factory mode), with a CRC16 checksum utility implemented from scratch for packet integrity verification',
        'Built a BLE manager on RxAndroidBLE handling device scanning, GATT connection, MTU negotiation, and notification subscriptions as RxJava Observable chains',
        'Implemented a state-based device registration/authentication handshake with a re-registration fallback on auth failure',
        'Exposed connection state, logs, and the latest packet reactively via BehaviorSubject, with per-command handlers for settings sync, historical data sync, and real-time event reception',
        'Built local persistence with Gson serialization over SharedPreferences, including timestamp-based deduplication and most-recent-first sorting',
        'Modeled the domain with Kotlin data classes and configured the module for external distribution (package namespace refactor, JVM compatibility, build configuration)',
        'Wrote JUnit unit tests for the protocol parser',
      ],
      ko: [
        'STX 프레이밍, 커맨드/길이/페이로드/CRC16 구조의 바이너리 패킷과 ASCII 응답(펌웨어 버전, RTC 시간, 팩토리 모드)을 함께 처리하는 커스텀 BLE 프로토콜 파서 설계, CRC16 체크섬 유틸리티 직접 구현으로 패킷 무결성 검증',
        'RxAndroidBLE 기반 BLE 매니저 구현: 기기 스캔, GATT 연결, MTU 협상, Notification 구독을 RxJava Observable 체인으로 처리',
        '상태 기반 기기 등록/인증 핸드셰이크 및 인증 실패 시 재등록 폴백 로직 구현',
        'BehaviorSubject로 연결 상태·로그·최근 패킷을 외부에 반응형으로 노출, 기기 설정 동기화·과거 이력 동기화·실시간 이벤트 수신 등 커맨드별 핸들러 구현',
        'Gson 직렬화 + SharedPreferences 기반 로컬 영속 저장소 구현, 타임스탬프 기준 중복 제거 및 최신순 정렬 로직 포함',
        'Kotlin data class 기반 도메인 모델 설계 및 외부 배포를 위한 패키지 네임스페이스 리팩토링, JVM 호환성 설정, 빌드 구성 작업',
        '프로토콜 파서에 대한 JUnit 단위 테스트 작성',
      ],
    },
    architecture: {
      en: 'BLE Medical Device ↔ RxAndroidBLE GATT Layer ↔ Custom Binary Protocol Parser (STX/CRC16) ↔ Command Handlers ↔ Local Persistence (Gson/SharedPreferences)',
      ko: 'BLE 의료기기 ↔ RxAndroidBLE GATT 레이어 ↔ 커스텀 바이너리 프로토콜 파서(STX/CRC16) ↔ 커맨드 핸들러 ↔ 로컬 영속 저장소(Gson/SharedPreferences)',
    },
    color: '#EC4899',
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
    company: '주식회사 엠유소프트 (MUSoft)',
    role: { en: 'Development Team Lead (Full-Stack / Backend)', ko: '개발팀 팀장 (Full-Stack / Backend Lead)' },
    type: 'Team Lead',
    impact: {
      en: [
        'Led tech decisions from product planning through architecture ADR & code review (Full-stack)',
        'CCUC: Multi-LLM (Gemini/Claude) orchestration, Lagged & Rolling Summary token optimization to prevent cost overruns, WebSocket real-time streaming, monthly DB partitioning',
        'Madezone: Smart study room management full-stack mobile & backend development with PortOne payment',
        'Pioneered AI-assisted developer workflows (Cursor, Claude Code, Gemini CLI) to boost team velocity',
      ],
      ko: [
        '서비스 기획부터 아키텍처 ADR, 풀스택 설계, 코드 리뷰까지 기술 의사결정 및 팀 리딩 총괄',
        '꾸욱(CCUC): 멀티 LLM 오케스트레이션, 1턴 지연 및 동적 롤링 요약 기반 토큰 비용 폭탄 방지, 웹소켓 스트리밍, 대화 로그 자동 월별 파티셔닝 구축',
        '메이드존: 실시간 출결 관리 모바일 앱(React Native) & 백엔드 풀스택 개발 및 포트원 결제 연동',
        'Cursor, Claude Code, Gemini CLI 등 최신 AI 개발 도구를 팀 표준 워크플로우로 도입하여 개발 생산성 극대화',
      ],
    },
    tech: ['NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'WebSocket', 'Google Gemini', 'Claude Opus', 'Vertex AI', 'React', 'React Native'],
  },
  {
    period: { en: 'Sep 2024 – Jun 2025', ko: '2024.09 – 2025.06' },
    company: '모던라이언(주) (Modern Lion)',
    role: { en: 'Manager — Blockchain & Backend Engineer', ko: '블록체인 매니저 — Blockchain & Backend' },
    type: 'Senior',
    impact: {
      en: [
        'Developed and integrated a Chainlink VRF (Verifiable Random Function) on-chain lottery system to ensure fairness and transparency in NFT ticketing draws',
        'Operated GitOps deployment workflows on Kubernetes & ArgoCD, maintaining Keycloak enterprise auth',
        'Built Near Protocol smart contracts and a realtime ledger data extraction & indexing pipeline for the Near Chain migration',
      ],
      ko: [
        '티켓팅 추첨의 공정성과 투명성 확보를 위해 Chainlink VRF 기반의 온체인 무작위 추첨 시스템 개발 및 연동',
        'Kubernetes 및 ArgoCD 기반 GitOps 배포 파이프라인 운영 및 Keycloak 기반 인증/인가 시스템 유지보수',
        'Near Chain 전환에 따른 Near Protocol 스마트 컨트랙트 개발 및 블록체인 원장 데이터의 실시간 수집·가공·인덱싱 파이프라인 구축',
      ],
    },
    tech: ['Solidity', 'Near Protocol (Rust)', 'Chainlink VRF', 'Polygon', 'Ethereum', 'Kubernetes', 'ArgoCD', 'Keycloak', 'NestJS'],
  },
  {
    period: { en: 'Sep 2023 – Sep 2024', ko: '2023.09 – 2024.09' },
    company: '주식회사 이노그리드 (Innogrid)',
    role: { en: 'Senior Researcher — Blockchain & Backend', ko: '블록체인 선임연구원 — Blockchain & Backend' },
    type: 'Senior',
    impact: {
      en: [
        'LGE Web3 Project: Developed anonymous survey smart contract and NestJS backend; built zk-SNARK & Merkle tree pipeline for anonymous participant verification without exposing identity',
        'Architected distributed advertising platform backend and REST APIs in Golang',
      ],
      ko: [
        'LGE Web3 프로젝트: 익명 설문 스마트 컨트랙트 개발, NestJS 백엔드 구축 / zk-SNARK 및 Merkle Tree를 활용하여 참여자 신원을 노출하지 않고 유효 참여자임을 검증하는 ZKP 파이프라인 구현',
        'Go 언어 기반 분산 광고 플랫폼 백엔드 아키텍처 및 API 개발',
      ],
    },
    tech: ['Solidity', 'zk-SNARK', 'Merkle Tree', 'Golang', 'Hedera Hashgraph', 'NestJS'],
  },
  {
    period: { en: 'Jul 2022 – Sep 2023', ko: '2022.07 – 2023.09' },
    company: '주식회사 미디움 (Medium)',
    role: { en: 'Core Team Manager — Blockchain Backend', ko: '코어팀 매니저 — Core Backend' },
    type: 'Senior',
    impact: {
      en: [
        'Analyzed enterprise private blockchain consensus/ledger engine and customized Hyperledger Fabric Core',
        'Built Go-based Chaincode and Java Spring / NestJS backend services',
      ],
      ko: [
        '엔터프라이즈 프라이빗 블록체인 합의/원장 엔진 분석 및 Hyperledger Fabric 코어 커스텀',
        'Go 기반 Chaincode 및 Java Spring / NestJS 백엔드 구축',
      ],
    },
    tech: ['Hyperledger Fabric', 'Golang (Chaincode)', 'NestJS', 'Java Spring', 'Docker'],
  },
  {
    period: { en: 'Jul 2021 – Jul 2022', ko: '2021.07 – 2022.07' },
    company: '(주)마크애니 (MarkAny)',
    role: { en: 'Assistant Manager — Blockchain Business Dept.', ko: '블록체인사업부 대리 — Blockchain Engineer' },
    type: 'Engineer',
    impact: {
      en: [
        'Designed and implemented W3C-compliant DID/VC Issuer & Verifier REST APIs on NestJS',
        'Developed DID Storage Chaincode (Go) on Hyperledger Fabric with Universal Resolver integration',
        'Engineered e-voting and citizen ID PoCs with immutable distributed ledgers for National Election Commission & Gangneung City',
      ],
      ko: [
        'W3C 표준 규격에 맞춘 분산 신원증명(DID/VC) Issuer/Verifier API 서버를 NestJS 기반으로 설계 및 구현',
        '온체인 원장에 DID 식별자 및 공개키/인증 정보를 안전하게 관리하는 DID Storage 체인코드(Go) 개발',
        '중앙선거관리위원회 전자투표 및 강릉시민증 위변조 방지를 위한 체인코드 및 비동기 트랜잭션 NestJS 미들웨어 구축',
      ],
    },
    tech: ['Hyperledger Fabric', 'Golang', 'NestJS', 'TypeScript', 'W3C DID/VC', 'Docker', 'Python'],
  },
  {
    period: { en: 'Nov 2018 – Dec 2020', ko: '2018.11 – 2020.12' },
    company: '오브젠(주) (Obzen)',
    role: { en: 'Project Leader (PL) / Assistant Manager', ko: '프로젝트 리더(PL) / 대리 — Enterprise Backend' },
    type: 'Engineer',
    impact: {
      en: [
        'Served as Project Leader (PL) directing customer interface design and team development schedules',
        'Invented automated customer group combination & channel distribution scheduling algorithm (SMS/Kakao/Email) for Hyundai Capital',
        'Architected high-volume ETL data marts and batch campaign execution pipelines on Java Spring & Oracle/PostgreSQL',
      ],
      ko: [
        '프로젝트 리더(PL)로서 현대캐피탈/르노캐피탈 엔터프라이즈 CRM 인터페이스 설계 및 개발 일정 총괄 조율',
        '수작업 엑셀 배정 업무를 채널별(SMS/알림톡/Email) 수용량과 우선순위를 반영한 "자동 고객 그룹 조합 및 분산 배치 스케줄링 알고리즘"으로 자동화',
        '대용량 고객 세그먼트를 처리하는 ETL 데이터 마트 설계 및 복잡 쿼리 튜닝 수행',
      ],
    },
    tech: ['Java', 'Spring Framework', 'JPA', 'Oracle 11g', 'PostgreSQL', 'Batch Scheduling', 'Angular'],
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
    label: { en: 'Backend Core', ko: '백엔드 코어' },
    icon: '⚙️',
    color: '#00D2A0',
    items: [
      { name: 'Node.js / NestJS', level: 'production', years: 4 },
      { name: 'TypeScript / JavaScript', level: 'production', years: 5 },
      { name: 'Java / Spring Boot / JPA', level: 'production', years: 4 },
      { name: 'Go (Gin/gRPC/Chaincode)', level: 'production', years: 3 },
      { name: 'Python (FastAPI/Flask)', level: 'proficient', years: 3 },
      { name: 'REST / GraphQL / gRPC', level: 'production', years: 6 },
    ],
  },
  {
    id: 'ai',
    label: { en: 'AI & LLM Orchestration', ko: 'AI & LLM 오케스트레이션' },
    icon: '🧠',
    color: '#10B981',
    items: [
      { name: 'Google Gemini 1.5 / 2.0', level: 'production', years: 2 },
      { name: 'Claude Opus / Sonnet', level: 'production', years: 2 },
      { name: 'Vertex AI / AI Studio', level: 'production', years: 2 },
      { name: 'Lagged & Rolling Summarization', level: 'production', years: 2 },
      { name: 'Prompt Engineering & Tools', level: 'production', years: 2 },
      { name: 'Cursor / Claude Code / Gemini CLI', level: 'production', years: 2 },
    ],
  },
  {
    id: 'blockchain',
    label: { en: 'Blockchain & Web3', ko: '블록체인 & Web3' },
    icon: '🔗',
    color: '#8B5CF6',
    items: [
      { name: 'Hyperledger Fabric Core', level: 'production', years: 4 },
      { name: 'Solidity (ERC-20/721/UUPS)', level: 'production', years: 3 },
      { name: 'Near Protocol (Rust/JS)', level: 'production', years: 2 },
      { name: 'Chainlink VRF (Random Draw)', level: 'production', years: 2 },
      { name: 'zk-SNARKs / ZKP Merkle Tree', level: 'production', years: 2 },
      { name: 'W3C DID / Verifiable Credentials', level: 'production', years: 2 },
    ],
  },
  {
    id: 'database',
    label: { en: 'Database & Realtime', ko: '데이터베이스 & 실시간' },
    icon: '🗄️',
    color: '#F59E0B',
    items: [
      { name: 'PostgreSQL (Table Partitioning)', level: 'production', years: 5 },
      { name: 'MySQL / Oracle 11g', level: 'production', years: 5 },
      { name: 'Redis (Cache / Pub-Sub / Locks)', level: 'production', years: 4 },
      { name: 'WebSocket (Socket.io Rooms)', level: 'production', years: 3 },
      { name: 'TypeORM / JPA', level: 'production', years: 5 },
    ],
  },
  {
    id: 'devops',
    label: { en: 'Cloud & DevOps', ko: '클라우드 & DevOps' },
    icon: '☁️',
    color: '#3B82F6',
    items: [
      { name: 'Docker / Containerization', level: 'production', years: 5 },
      { name: 'Kubernetes / ArgoCD (GitOps)', level: 'production', years: 2 },
      { name: 'AWS (EC2/RDS/ECS/S3/CloudFront)', level: 'production', years: 4 },
      { name: 'Keycloak (OAuth2/OIDC)', level: 'production', years: 2 },
      { name: 'GitHub Actions / CI-CD', level: 'production', years: 4 },
    ],
  },
];

// ─── Core strengths ──────────────────────────────────────────
export const coreStrengths = [
  {
    title: { en: 'LLM Orchestration & Token Optimization', ko: 'LLM 오케스트레이션 & 토큰 최적화' },
    desc: {
      en: 'Lagged Summarization & model-aware Rolling Summaries preventing runaway token cost while preserving long-term conversation context',
      ko: '1턴 지연 요약 및 모델별 동적 롤링 요약 파이프라인으로 비용 폭탄 방지 및 장기 대화 맥락 보존',
    },
  },
  {
    title: { en: 'Realtime Streaming & Concurrency', ko: '실시간 스트리밍 & 동시성 제어' },
    desc: {
      en: 'WebSocket chunk streaming, Redis distributed locking, and decoupled async game status/image generation triggers',
      ko: '웹소켓 청크 스트리밍, Redis 분산 락, 비동기 게임 스탯(delta) 및 상황 이미지 생성 트리거 분리 처리',
    },
  },
  {
    title: { en: 'Automated Partitioned DB', ko: '대화 로그 자동 파티셔닝' },
    desc: {
      en: 'Automated PostgreSQL monthly partitioning to maintain query performance and stable log archiving',
      ko: '대화 로그를 PostgreSQL 월별 자동 파티셔닝으로 관리하여 쿼리 성능 및 안정성 확보',
    },
  },
  {
    title: { en: 'Enterprise Batch & Web3 Security', ko: '엔터프라이즈 배치 & Web3 보안' },
    desc: {
      en: 'Financial CRM marketing batch distribution algorithms, Chainlink VRF on-chain lotteries, and ZKP/DID identity verification',
      ko: '금융권 마케팅 분산 배치 스케줄링 알고리즘 구축, Chainlink VRF 온체인 공정 추첨 및 ZKP/DID 신원인증 시스템 구현',
    },
  },
];

// ─── Architecture Nodes (Live Interactive Diagram) ───────────
export interface ArchNode {
  id: string;
  label: string;
  sublabel: string;
  type: 'client' | 'gateway' | 'service' | 'db' | 'infra' | 'external';
  color: string;
  x: number;
  y: number;
  desc: { en: string; ko: string };
}

export interface ArchEdge {
  from: string;
  to: string;
  label: string;
  dashed?: boolean;
}

export const architectureNodes: ArchNode[] = [
  {
    id: 'client',
    label: 'Client Apps',
    sublabel: 'React / React Native',
    type: 'client',
    color: '#00D2A0',
    x: 80,
    y: 110,
    desc: {
      en: 'Cross-platform Web & Mobile clients with real-time WebSocket connection and Markdown stream rendering.',
      ko: '실시간 웹소켓 연결 및 마크다운 청크 렌더링을 지원하는 React 웹 / React Native 모바일 클라이언트.',
    },
  },
  {
    id: 'gateway',
    label: 'API Gateway',
    sublabel: 'NestJS / WsGuard',
    type: 'gateway',
    color: '#3B82F6',
    x: 280,
    y: 110,
    desc: {
      en: 'Handles JWT/Redis session auth, rate limiting, and routes WebSocket events & REST APIs.',
      ko: 'JWT 및 Redis 세션 인증, 속도 제한, 웹소켓 룸 격리 및 REST API 라우팅을 총괄하는 NestJS 게이트웨이.',
    },
  },
  {
    id: 'llm_orchestrator',
    label: 'LLM Orchestrator',
    sublabel: 'Lagged & Rolling Summary',
    type: 'service',
    color: '#10B981',
    x: 480,
    y: 40,
    desc: {
      en: 'Manages context window assembly, 1-turn delayed summarization, model token budgeting, and multi-model fallbacks.',
      ko: '1턴 지연 요약, 모델별 Max Token 기반 동적 롤링 요약, 상황 프롬프트 조립 및 멀티 LLM 스트리밍 처리 엔진.',
    },
  },
  {
    id: 'redis_pubsub',
    label: 'Redis Cluster',
    sublabel: 'Cache / Pub-Sub / Lock',
    type: 'db',
    color: '#EF4444',
    x: 480,
    y: 180,
    desc: {
      en: 'Provides distributed locking for idempotent turns, Pub/Sub for horizontal WS clustering, and hot cache.',
      ko: '멱등성 보장을 위한 분산 락, 웹소켓 수평 확장을 위한 Pub/Sub, 세션 및 핫 데이터 캐싱 레이어.',
    },
  },
  {
    id: 'postgres_partition',
    label: 'PostgreSQL DB',
    sublabel: 'Monthly Partitioned',
    type: 'db',
    color: '#F59E0B',
    x: 680,
    y: 110,
    desc: {
      en: 'Primary persistence layer with automated monthly table partitioning for scalable chat message archiving.',
      ko: '대화 로그 자동 월별 테이블 파티셔닝(ChatPartitionService)이 적용된 고성능 주 데이터베이스.',
    },
  },
  {
    id: 'external_llm_chain',
    label: 'AI & Web3 Network',
    sublabel: 'Vertex AI / Gemini / Chainlink',
    type: 'external',
    color: '#8B5CF6',
    x: 680,
    y: 200,
    desc: {
      en: 'External integrations: Google Vertex AI, Gemini 2.0, Claude Opus, and Chainlink VRF on-chain contracts.',
      ko: 'Google Vertex AI, Gemini 2.0, Claude Opus 및 블록체인 온체인 컨트랙트(Chainlink VRF) 연동.',
    },
  },
];

export const architectureEdges: ArchEdge[] = [
  { from: 'client', to: 'gateway', label: 'WebSocket / REST' },
  { from: 'gateway', to: 'llm_orchestrator', label: 'Prompt Payload' },
  { from: 'gateway', to: 'redis_pubsub', label: 'Session / Lock' },
  { from: 'llm_orchestrator', to: 'external_llm_chain', label: 'Stream Tokens' },
  { from: 'llm_orchestrator', to: 'postgres_partition', label: 'Partitioned Write', dashed: true },
  { from: 'gateway', to: 'postgres_partition', label: 'TypeORM / Query' },
];

// ─── Certifications & Awards ─────────────────────────────────
export const education = [
  {
    school: { en: 'Gangneung-Wonju National University (Wonju)', ko: '강릉원주대학교 (원주)' },
    degree: { en: 'B.S. in Computer Science', ko: '컴퓨터공학과 학사 졸업' },
    period: { en: 'Mar 2015 – Feb 2019', ko: '2015.03 – 2019.02' },
    note: { en: 'GPA 4.31 / 4.5 — Valedictorian / Top of Class (수석 졸업)', ko: '학점 4.31 / 4.5 — 과 수석 졸업 (학생회 학회장 역임)' },
  },
];

export const certifications = [
  { title: { en: 'Engineer Information Processing (정보처리기사)', ko: '정보처리기사' }, date: '2018.05', org: '과학기술정보통신부' },
  { title: { en: 'Network Master Level-2 (네트워크관리사 2급)', ko: '네트워크관리사 2급' }, date: '2017.09', org: '한국정보통신자격협회' },
  { title: { en: 'Linux Master Level-2 (리눅스마스터 2급)', ko: '리눅스마스터 2급' }, date: '2017.09', org: '한국정보통신인력개발센터' },
  { title: { en: 'OCJP (Oracle Certified Java Programmer)', ko: 'OCJP (Java Programmer)' }, date: '2016.12', org: 'Oracle' },
];

export const awards = [
  { title: { en: 'Academic Excellence Award (Grand Prize - 3rd Year)', ko: '학업 성적 우수 최우수상 (3학년)' }, date: '2018', org: '과학기술대학' },
  { title: { en: 'Academic Excellence Award (Grand Prize - 1st Year)', ko: '학업 성적 우수 최우수상 (1학년)' }, date: '2016', org: '과학기술대학' },
  { title: { en: 'Seoul Accord Programming Championship Excellence Award', ko: '서울어코드 프로그래밍 경진대회 우수상' }, date: '2015', org: '서울어코드활성화사업단' },
];

// ─── Personal Info ────────────────────────────────────────────
export const personalInfo = {
  name: '사영수 (Youngsoo Sa)',
  brandName: 'Dotorio',
  title: {
    en: 'Team Lead · Full-Stack & Backend Engineer (7+ Years)',
    ko: '개발팀 팀장 · 풀스택 & 백엔드 엔지니어 (7년 4개월)',
  },
  tagline: {
    en: 'Bridging Enterprise Backend, Generative AI Orchestration & Web3 Systems',
    ko: '엔터프라이즈 백엔드부터 생성형 AI 오케스트레이션·Web3 시스템까지 기술의 경계를 넓혀갑니다',
  },
  about: {
    en: '7+ years experienced Backend & Full-stack Team Lead specializing in high-concurrency systems, generative AI orchestration (token cost optimization, streaming WebSocket architectures), automated database partitioning, and enterprise Web3/Fintech platforms. Passionate about solving business bottlenecks through clean architecture and empowering engineering teams with cutting-edge developer tools.',
    ko: '7년 4개월 차 풀스택/백엔드 개발팀 팀장. 생성형 AI 오케스트레이션(1턴 지연 요약 및 롤링 요약을 통한 토큰 비용 폭탄 방지, 실시간 웹소켓 스트리밍), DB 자동 파티셔닝, 엔터프라이즈 Web3 및 핀테크 CRM 시스템 구축을 주도했습니다. 비즈니스 병목을 아키텍처로 근본 해결하고 최신 AI 개발 도구로 팀 생산성을 혁신하는 엔지니어링을 지향합니다.',
  },
  location: 'Incheon / Seoul, South Korea',
  email: 'yssa@kakao.com',
  github: 'https://github.com/leo-yssa',
  blog: 'https://yssa.tistory.com',
  status: { en: 'Actively seeking next challenge', ko: '적극 구직 중' },
};
