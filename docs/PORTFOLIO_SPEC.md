# Dotorio Portfolio Specification & Engineering Blueprint

> **Target Site**: `https://portfolio.dotorio.com`  
> **Brand Identity**: Dotorio (작지만 단단한 엔지니어링 씨앗에서 성장하는 고신뢰성 시스템)  
> **Deploy Platform**: GitHub Pages (Static Export)

---

## 1. Project Overview & Target Persona
- **Developer Profile**: 백엔드 / 클라우드 인프라 / 블록체인 & 풀스택 엔지니어 (리드급/팀장)
- **Core Value**: 
  - 단순 기능 구현이 아닌 대규모 트래픽 분산, 동시성 제어, 분산 원장, 안정적인 시스템 아키텍처 설계
  - Web2(NestJS, Spring, PostgreSQL, AWS), Web3(Ethereum, Hyperledger Fabric), AI/LLM 파이프라인 연동 역량
- **Goal**: 글로벌 수준의 모던 테크 기업/투자자/파트너에게 신뢰감을 주는 하이엔드 테크 쇼케이스 사이트 구축

---

## 2. Tech Stack Recommendations
- **Framework**: Next.js (App Router, SSG static export `output: 'export'`) 또는 Astro (초고속 정적 사이트)
- **Styling**: Tailwind CSS, Tailwind Merge, `clsx`
- **Animations**: Framer Motion (부드러운 스크롤 페이드인, 인터랙티브 호버, 아키텍처 인터랙션)
- **Icons**: Lucide React, Simple Icons (Tech Stack)
- **Components**: Radix UI / Shadcn UI 기반 맞춤형 컴포넌트

---

## 3. Brand & Design System

### Color Palette (Dark Theme First)
- **Background Deep**: `#0B0F17` (깊은 다크 네이비/슬레이트)
- **Surface / Card**: `#111827` (반투명 글래스모피즘 `backdrop-blur-md bg-opacity-70 border border-slate-800`)
- **Accent Primary**: `#00D2A0` / `#10B981` (Dotorio 민트/에메랄드 - 성장과 활력)
- **Accent Secondary**: `#3B82F6` (테크 블루 - 안정성과 신뢰)
- **Text Main**: `#F8FAFC` (Slate-50)
- **Text Muted**: `#94A3B8` (Slate-400)

### Typography & Tone
- **Font**: Inter, Pretendard, Fira Code (코드 및 아키텍처 라벨)
- **Tone & Voice**: 직관적이고 군더더기 없는 엔지니어링 중심의 간결한 문체

---

## 4. Information Architecture (Page Sections)

```
[ Navigation Bar ]
  - Brand Logo (Dotorio) + Status Badge (Open for collaboration)
  - Anchor Links (About, Experience, Projects, Architecture, Stack, Contact)
  - Locale Switcher (KR / EN) + Theme Toggle

[ 1. Hero Section ]
  - Bold Value Statement ("Engineering Resilient Systems & Scalable Architectures")
  - Core Role & Tech Pills (NestJS · Spring · Web3 · AWS · Distributed Systems)
  - Primary CTA ("View Architecture Showcase", "Get in Touch")
  - Interactive Terminal / Mini Code Preview Card

[ 2. Featured Projects & App Showcase ]
  - Card Layout with Rich Badges (Live Service, B2C App, B2B Platform)
  - Key Engineering Highlights (e.g. TPS 처리량, 쿼리 최적화 70% 개선, 실시간 소켓 동시 접속)
  - Tech Stack Tags + Modal for Deep Dive (Architecture Diagram + Problem Solving)
  - GitHub & Live Demo Links

[ 3. Interactive Architecture & System Design ]
  - 모듈화된 백엔드/인프라 아키텍처 시각화 다이어그램 (Interactive flow)
  - Web3 스마트 컨트랙트 연동 및 AWS 클라우드 인프라 파이프라인 쇼케이스

[ 4. Professional Experience & Leadership ]
  - Timeline UI (Team Lead / Senior Engineer)
  - 팀 리딩 및 기술적 의사결정(ADR) 중심의 정량적 성과 기록

[ 5. Tech Stack & Matrix ]
  - 카테고리별 숙련도 및 프로덕션 적용 경험
    - Backend: NestJS, Spring Boot, Go, Node.js
    - Blockchain / Web3: Ethereum, Hyperledger Fabric, Smart Contracts
    - Database & Cache: PostgreSQL, MySQL, Redis
    - Cloud & DevOps: AWS (EC2, ECS, RDS, CloudFront, S3), Docker, GitHub Actions

[ 6. Engineering Notes / Articles (Tech Log) ]
  - 트러블슈팅, 아키텍처 고민, 최적화 경험 요약 카드

[ 7. Contact & Footer ]
  - Direct Email Form or Mailto CTA
  - GitHub, LinkedIn, Resume Download
  - Copyright © Dotorio. All rights reserved.
```

---

## 5. Deployment & Configuration for GitHub Pages

```typescript
// next.config.mjs (If using Next.js)
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

- **Custom Domain File**: `public/CNAME` 파일 생성 후 `portfolio.dotorio.com` 기입
- **GitHub Action**: `.github/workflows/deploy.yml`로 `main` 브랜치 푸시 시 자동 정적 빌드 및 배포