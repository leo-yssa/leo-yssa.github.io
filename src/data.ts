export interface ExperienceItem {
    date: string;
    company: string;
    title: string;
    items: string[];
}

export interface EducationItem {
    school: string;
    date: string;
    degree: string;
    grade: string;
}

export interface ProjectItem {
    image: string;
    title: string;
    description: string;
}

export interface AwardItem {
    title: string;
    date: string;
    organization: string;
}

export interface Content {
    experience: ExperienceItem[];
    education: EducationItem[];
    awards: AwardItem[];
    projects: ProjectItem[];
    about: string;
}

export const content: Record<string, Content> = {
    en: {
        experience: [
            {
                date: "July 2025 – Present",
                company: "DeepLight (Musoft)",
                title: "Team Lead (Backend & Blockchain)",
                items: [
                    "Leading development of 'Madezone' study room management platform.",
                    "Developing 'ITDA' acquaintance matching platform using NestJS and PostgreSQL.",
                    "Building AI Character Chat services with Google Gemini and WebSocket."
                ]
            },
            {
                date: "September 2024 – June 2025",
                company: "Modern Lion",
                title: "Manager (Blockchain & Backend)",
                items: [
                    "Developed Web3 ticketing platform supporting Polygon and Near networks.",
                    "Implemented Solidity-based Ticket NFT (ERC-721) and random draw systems using Chainlink VRF.",
                    "Integrated Octet Wallet and synchronized Web2/Web3 data using PortOne and Seatio."
                ]
            },
            {
                date: "September 2023 – September 2024",
                company: "Innogrid",
                title: "Senior Researcher (Blockchain & Backend)",
                items: [
                    "Developed LGE-COE advertising platform and reward structures based on Hedera Hashgraph.",
                    "Implemented ZKP (Zero-Knowledge Proof) based survey systems for privacy protection.",
                    "Built Node.js and gRPC-based API servers."
                ]
            },
            {
                date: "July 2022 – August 2023",
                company: "Medium",
                title: "Manager (Blockchain & Backend)",
                items: [
                    "Analyzed and modified Hyperledger Fabric Core source code; Validated Consensus and Gossip protocols.",
                    "Designed Native Asset systems and cross-chain bridges (Mint & Burn).",
                    "Optimized large-scale transaction processing and developed automation scripts."
                ]
            },
            {
                date: "July 2021 – June 2022",
                company: "MarkAny",
                title: "Assistant Manager (Blockchain & Backend)",
                items: [
                    "Advanced 'AnyBlock' (Hyperledger Fabric network monitoring) and developed Prometheus Exporters.",
                    "Developed e-voting systems for the National Election Commission (NEC) using Fabric.",
                    "Built DID-based simplified identity systems for Gangneung Citizen ID."
                ]
            },
            {
                date: "November 2018 – November 2020",
                company: "Obzen",
                title: "Assistant Manager (Backend)",
                items: [
                    "Executed CRM projects for major clients (Hyundai Capital, Renault Capital, Hana Tour) using the company's Java Spring-based solution.",
                    "Customized and delivered enterprise solutions, managing MCI/EAI channel integrations.",
                    "Designed data marts and handled large-scale data processing for financial clients."
                ]
            }
        ],
        education: [
            {
                school: "Gangneung-Wonju National University",
                date: "March 2015 - February 2019",
                degree: "Bachelor of Computer Science",
                grade: "Final Grade : 4.32/4.5 (Top of Class)"
            }
        ],
        awards: [
            {
                title: "First Prize (Grand Prize)",
                date: "2018",
                organization: "1st Blockchain Academy, Sogang University Intelligent Blockchain Research Center"
            }
        ],
        projects: [
            {
                image: "/images/project.jpg",
                title: "Madezone",
                description: "Study room management platform (DeepLight).\nDeveloped App/Web and NestJS server.\nIntegrated Kakao notification and PortOne payments."
            },
            {
                image: "/images/project.jpg",
                title: "ITDA",
                description: "Acquaintance matching platform (DeepLight).\nTech: NestJS, TypeScript, PostgreSQL, Redis, Docker.\nFeatures: Matching system, Real-time Chat, Payments."
            },
            {
                image: "/images/project.jpg",
                title: "Character Chat",
                description: "AI Real-time Chat Service (DeepLight).\nTech: NestJS, Google Gemini, WebSocket.\nFeatures: AI personas, Real-time messaging."
            },
            {
                image: "/images/project.jpg",
                title: "Monster Hunt GameFi",
                description: "P2E on-chain game using Solidity, Golang, and Redis.\nFeatures UUPS upgradeable contracts and ERC-20 reward tokens."
            },
            {
                image: "/images/project.jpg",
                title: "SmartDocs-AI",
                description: "LLM-based document search engine.\nUtilized LangChain (RAG), FAISS vector DB, and gRPC-connected Kotlin/Python architecture."
            },
            {
                image: "/images/project.jpg",
                title: "Native Asset & Bridge",
                description: "Developed Coin system applied to Hyperledger Fabric.\nImplemented Bridge for token transfer between Tendermint and Fabric."
            },
            {
                image: "/images/project.jpg",
                title: "Election System",
                description: "Hyperledger Fabric-based Election System Development for National Election Commission."
            }
        ],
        about: "I am a Backend and Blockchain Engineer focused on long-term scalability and robust structural design. Currently leading development at DeepLight (Musoft). I have extensive experience building systems using Ethereum, Hyperledger Fabric, and Klaytn, as well as designing scalable backend architectures with Go, Java, Kotlin, Node.js, and Python. I value analyzing the root cause of problems and ensuring smooth collaboration across teams. My goal is to integrate Web2, Web3, and AI technologies to build stable, large-scale systems."
    },
    ko: {
        experience: [
            {
                date: "2025년 7월 – 현재",
                company: "딥라이트 (Musoft)",
                title: "팀장 (Backend & Blockchain)",
                items: [
                    "'Madezone' 스터디룸 관리 플랫폼 개발 주도",
                    "NestJS 및 PostgreSQL 기반 'ITDA' 지인 매칭 플랫폼 개발",
                    "Google Gemini 및 WebSocket을 활용한 AI 캐릭터 채팅 서비스 구축"
                ]
            },
            {
                date: "2024년 9월 – 2025년 6월",
                company: "모던라이언",
                title: "매니저 (Blockchain & Backend)",
                items: [
                    "Polygon, Near 기반의 Web3 티켓팅 플랫폼 개발",
                    "Solidity 기반 Ticket NFT(ERC-721) 및 Chainlink VRF를 활용한 랜덤 추첨 시스템 구현",
                    "Octet Wallet 연동 및 PortOne/Seatio를 활용한 Web2/Web3 데이터 동기화 처리"
                ]
            },
            {
                date: "2023년 9월 – 2024년 9월",
                company: "이노그리드",
                title: "선임 연구원 (Blockchain & Backend)",
                items: [
                    "Hedera Hashgraph 기반의 LGE-COE 광고 플랫폼 및 리워드 구조 개발",
                    "개인정보 보호를 위한 ZKP(영지식 증명) 기반 설문 시스템 구현",
                    "Node.js 및 gRPC 기반의 API 서버 구축"
                ]
            },
            {
                date: "2022년 7월 – 2023년 8월",
                company: "미디움",
                title: "매니저 (Blockchain & Backend)",
                items: [
                    "Hyperledger Fabric Core 소스 분석 및 수정; Consensus/Gossip 프로토콜 검증",
                    "Native Asset 시스템 및 Cross-chain Bridge (Mint & Burn) 설계 및 구현",
                    "대용량 트랜잭션 처리 최적화 및 자동화 스크립트 개발"
                ]
            },
            {
                date: "2021년 7월 – 2022년 6월",
                company: "마크애니",
                title: "대리 (Blockchain & Backend)",
                items: [
                    "Hyperledger Fabric 네트워크 모니터링 'AnyBlock' 고도화 및 Prometheus Exporter 개발",
                    "중앙선거관리위원회(NEC) 블록체인 기반 전자투표 시스템 개발",
                    "강릉시 시민증을 위한 DID 기반 간편인증 시스템 구축"
                ]
            },
            {
                date: "2018년 11월 – 2020년 11월",
                company: "오브젠",
                title: "대리 (Backend)",
                items: [
                    "현대캐피탈, 르노캐피탈, 하나투어 등 주요 고객사 대상 CRM 프로젝트 수행",
                    "자사 Java Spring 기반 솔루션 납품 및 커스텀 개발",
                    "MCI/EAI 채널 인터페이스 연동 및 대용량 데이터 마트 설계"
                ]
            }
        ],
        education: [
            {
                school: "강릉원주대학교",
                date: "2015년 3월 - 2019년 2월",
                degree: "컴퓨터공학 학사",
                grade: "학점 : 4.32/4.5 (수석 졸업)"
            }
        ],
        awards: [
            {
                title: "제 1회 블록체인 학술대회 최우수상",
                date: "2018",
                organization: "서강대 지능형 블록체인 연구센터"
            }
        ],
        projects: [
            {
                image: "/images/project.jpg",
                title: "Madezone (메이드존)",
                description: "스터디룸 관리 플랫폼 (DeepLight).\nReact Native 앱 및 NestJS 서버 개발.\n카카오 알림톡 및 포트원 결제 모듈 연동."
            },
            {
                image: "/images/project.jpg",
                title: "ITDA (잇다)",
                description: "지인 매칭 플랫폼 (DeepLight).\n기술: NestJS, TypeScript, PostgreSQL, Redis, Docker.\n기능: 매칭 시스템, 실시간 채팅, 결제/정산."
            },
            {
                image: "/images/project.jpg",
                title: "AI Character Chat",
                description: "AI 실시간 캐릭터 채팅 서비스 (DeepLight).\n기술: NestJS, Google Gemini, WebSocket.\n기능: AI 페르소나 챗봇, 실시간 메시지 전송."
            },
            {
                image: "/images/project.jpg",
                title: "Monster Hunt GameFi",
                description: "Solidity, Golang, Redis를 활용한 P2E 온체인 게임.\nUUPS 업그레이더블 컨트랙트 및 ERC-20 보상 토큰 구현."
            },
            {
                image: "/images/project.jpg",
                title: "SmartDocs-AI",
                description: "LLM 기반 문서 검색 엔진.\nLangChain(RAG), FAISS 벡터 DB, Kotlin/Python gRPC 아키텍처 활용."
            },
            {
                image: "/images/project.jpg",
                title: "Native Asset & Bridge",
                description: "Hyperledger Fabric용 코인 시스템 개발.\nTendermint와 Fabric 간의 토큰 전송 브릿지 구현."
            },
            {
                image: "/images/project.jpg",
                title: "전자투표 시스템",
                description: "중앙선거관리위원회를 위한 Hyperledger Fabric 기반 전자투표 시스템 개발."
            }
        ],
        about: "장기적인 확장성과 유지보수 가능한 구조적 설계를 중시하는 백엔드 & 블록체인 엔지니어입니다. 현재 딥라이트(Musoft)에서 개발 팀장을 맡고 있습니다. Ethereum, Hyperledger Fabric부터 NestJS, Spring까지 다양한 기술 스택을 보유하고 있으며, Web2, Web3, AI 기술을 융합한 시스템 구축에 주력하고 있습니다."
    }
};

export const skills = [
    "Go (Gin/gRPC)", "Java/Kotlin (Spring)", "Node.js (NestJS)", "Python", "Rust",
    "Solidity (ERC-20/721)", "Hyperledger Fabric", "ZKP & DID",
    "React", "React Native", "Next.js",
    "Docker", "Kubernetes", "AWS", "CI/CD (GitHub Actions)"
];
