export interface LearningTopic {
    id: string;
    title: string;
    description: string;
    content: string; // Markdown or HTML content
}

export interface LearningCategory {
    id: string;
    title: string;
    topics: LearningTopic[];
}

export interface LearningContent {
    categories: LearningCategory[];
}

export const learningContent: { [key: string]: LearningContent } = {
    en: {
        categories: [
            {
                id: 'database',
                title: 'Database',
                topics: [
                    {
                        id: 'transaction',
                        title: 'Transaction & Java Implementation',
                        description: 'Theory of Transactions, ACID properties, and practical application in Java using @Transactional.',
                        content: `
### 1. Transaction Theory
**Transaction**: A logical unit of work that performs a series of operations on a database. It must be treated as a single indivisible unit.

#### ACID Properties
- **Atomicity**: All operations in a transaction succeed or all fail. (All or Nothing)
- **Consistency**: The database must remain in a consistent state before and after the transaction.
- **Isolation**: Multiple transactions occurring simultaneously must not interfere with each other.
- **Durability**: Once a transaction is committed, the changes are permanent.

### 2. Isolation Levels
- **READ UNCOMMITTED**: Dirty reads allowed.
- **READ COMMITTED**: Prevents dirty reads (Default in Oracle, SQL Server, PostgreSQL).
- **REPEATABLE READ**: Prevents non-repeatable reads (Default in MySQL/InnoDB).
- **SERIALIZABLE**: Strict isolation, highest consistency but lowest concurrency.

### 3. Practical Implementation in Java (Spring Boot)
In Spring, transactions are managed declaratively using \`@Transactional\`.

\`\`\`java
@Service
public class OrderService {

    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public void placeOrder(OrderDTO orderDto) {
        // 1. Save Order
        orderRepository.save(orderDto.toEntity());
        
        // 2. Adjust Inventory (If this fails, Order is rolled back)
        inventoryService.decreaseStock(orderDto.getProductId(), orderDto.getQuantity());
        
        // 3. Process Payment
        paymentService.process(orderDto.getPaymentDetails());
    }
}
\`\`\`

#### Key Attributes
- **Propagation**: Determines how the transaction relates to existing transactions (e.g., \`REQUIRED\`, \`REQUIRES_NEW\`).
- **Isolation**: Sets the isolation level.
- **RollbackFor**: Specifies which exceptions trigger a rollback (default is RuntimeException).
`
                    },
                    {
                        id: 'rdb-comparison',
                        title: 'Postgres vs MySQL vs Oracle',
                        description: 'Comparison of major RDBs focusing on architecture, SQL syntax, and use cases.',
                        content: `
### 1. Common Features
- All are Relational Database Management Systems (RDBMS).
- Use SQL (Structured Query Language) for data manipulation.
- Support ACID properties for transactions.
- Use Table-based data storage (Rows & Columns).

### 2. Key Differences

| Feature | MySQL | PostgreSQL | Oracle |
| :--- | :--- | :--- | :--- |
| **Architecture** | Storage engine based (InnoDB, MyISAM). | Object-Relational (ORDBMS). Process-based. | Multi-model, robust, complex architecture. |
| **SQL Syntax** | Non-standard extensions (e.g., \`LIMIT\`). | Highly standards-compliant. | PL/SQL (Powerful procedural extension). |
| **Concurrency** | MVCC (InnoDB). Good read performance. | MVCC. Excellent for complex queries & writes. | Row-level locking, high concurrency. |
| **JSON Support** | Basic JSON support. | Advanced JSONB (Binary JSON) support. | Robust JSON support. |
| **License** | GPL / Commercial (Oracle). | Open Source (PostgreSQL License). | Commercial (Proprietary). |

### 3. SQL Syntax Differences (Limit Example)

**MySQL & PostgreSQL:**
\`\`\`sql
SELECT * FROM users LIMIT 10 OFFSET 5;
\`\`\`

**Oracle (Pre-12c):**
\`\`\`sql
SELECT * FROM (
    SELECT t.*, ROWNUM r FROM users t
) WHERE r BETWEEN 6 AND 15;
\`\`\`
*(Note: Oracle 12c+ supports \`FETCH FIRST\` syntax)*
`
                    },
                    {
                        id: 'nosql-vs-rdb',
                        title: 'NoSQL vs RDB',
                        description: 'Understanding the differences between Relational and Non-Relational databases.',
                        content: `
### 1. RDB (Relational Database)
- **Structure**: Structured data in tables with predefined schema.
- **Scaling**: Vertical scaling (Scale-up) typically.
- **Consistency**: High consistency (ACID) is a priority.
- **Use Cases**: Financial systems, ERP, complex relationships.
- **Examples**: MySQL, PostgreSQL, Oracle, MSSQL.

### 2. NoSQL (Not Only SQL)
- **Structure**: Flexible schema (Document, Key-Value, Graph, Column-family).
- **Scaling**: Horizontal scaling (Scale-out) is easier.
- **Consistency**: Often favors Availability/Partition Tolerance (CAP Theorem - BASE properties).
- **Use Cases**: Big data, real-time analytics, content management, social networks.

### 3. CAP Theorem
In a distributed system, you can only satisfy two out of three:
- **Consistency**: All nodes see the same data at the same time.
- **Availability**: Every request receives a response (success/failure).
- **Partition Tolerance**: System continues to operate despite network failures.

**RDB**: Typically CA (Consistency + Availability) - *Single node concept*
**NoSQL**: Typically AP (Availability + Partition Tolerance) or CP (Consistency + Partition Tolerance)
`
                    },
                    {
                        id: 'vector-db',
                        title: 'Vector Database',
                        description: 'Introduction to Vector DBs, Embeddings, and RAG.',
                        content: `
### 1. Theory
**Vector Database**: A specialized database designed to store, manage, and index **vector embeddings**.

**Vector Embedding**: A numerical representation (array of floats) of data (text, image, audio) that captures semantic meaning. Items with similar meanings have vectors that are close in the high-dimensional space.

### 2. How it Works
- **Embedding Model**: Raw data is passed through an AI model (e.g., OpenAI text-embedding-3, BERT) to generate vectors.
- **Indexing**: Vectors are indexed using algorithms like **HNSW** (Hierarchical Navigable Small World) or **IVF** (Inverted File Index) for fast approximate nearest neighbor search.
- **Similarity Search**: Finds vectors closest to the query vector using metrics like **Cosine Similarity**, **Euclidean Distance**, or **Dot Product**.

### 3. Use Cases
- **Semantic Search**: "Find documents about cute animals" matches "puppies and kittens" even without keyword overlap.
- **Recommendation Systems**: "Users who liked this also liked..."
- **RAG (Retrieval-Augmented Generation)**: Providing relevant context to LLMs like GPT to improve accuracy and reduce hallucinations.

### 4. Practical Example (Pinecone/Weaviate)
\`\`\`python
# Pseudocode for Semantic Search
query = "How to implement Transaction?"
query_vector = embedding_model.encode(query)

# Search in Vector DB
results = vector_db.query(
    vector=query_vector,
    top_k=5,
    include_metadata=True
)

for result in results:
    print(result.metadata['text'])
\`\`\`
`
                    }
                ]
            },
            {
                id: 'backend',
                title: 'Backend Architecture',
                topics: [
                    {
                        id: 'sync-vs-async',
                        title: 'Sync vs Async & Blocking vs Non-blocking',
                        description: 'Architectural comparison between Spring MVC (Thread-per-request) and Node.js (Event Loop).',
                        content: `
### 1. Sync vs Async / Blocking vs Non-blocking
- **Synchronous**: Requestor waits for the result.
- **Asynchronous**: Requestor continues work and gets notified later (Callback/Future).
- **Blocking**: Thread is held until I/O completes.
- **Non-blocking**: Thread returns immediately and handles I/O completion via events.

### 2. Spring MVC (Classic) vs Node.js
#### Spring MVC (Blocking I/O)
- **Model**: Thread-per-request.
- **Pros**: Easy to debug, stable, rich ecosystem.
- **Cons**: High concurrency requires many threads (Context switching overhead).
- **Use Case**: CPU-intensive tasks, traditional enterprise apps.

#### Node.js / Spring WebFlux (Non-blocking I/O)
- **Model**: Single Thread Event Loop (Node.js) / Event-driven.
- **Pros**: Handles high concurrency with few threads.
- **Cons**: Callback hell (mitigated by Async/Await), CPU-intensive tasks block the loop.
- **Use Case**: I/O-bound apps (Chat, Streaming, Gateway).
`
                    },
                    {
                        id: 'grpc-vs-rest',
                        title: 'gRPC vs REST API',
                        description: 'Why use gRPC? Protocol Buffers vs JSON and HTTP/2 benefits.',
                        content: `
### 1. Comparison

| Feature | REST API | gRPC |
| :--- | :--- | :--- |
| **Protocol** | HTTP/1.1 (Text-based) | HTTP/2 (Binary-based) |
| **Data Format** | JSON (Human readable, larger size) | Protocol Buffers (Binary, compact, strongly typed) |
| **Communication** | Unary (Request/Response) | Unary, Server/Client Streaming, Bidirectional Streaming |
| **Browser Support** | Native support | Requires gRPC-Web proxy |

### 2. Why gRPC?
- **Performance**: Protobuf is 3-10x smaller and faster to serialize/deserialize than JSON.
- **Strong Typing**: .proto files define the contract strictly, reducing integration errors.
- **Polyglot**: Generate client/server code for Go, Java, Python, etc., automatically.

### 3. Use Case
- Internal **Microservices communication** (Low latency is critical).
- Mobile clients (Bandwidth saving).
`
                    },
                    {
                        id: 'msa-patterns',
                        title: 'MSA Patterns',
                        description: 'Decomposition, Saga Pattern for distributed transactions, and Circuit Breakers.',
                        content: `
### 1. Decomposition Strategies
- **By Business Capability**: e.g., Order Service, Inventory Service.
- **By Subdomain (DDD)**: Core, Supporting, Generic subdomains.

### 2. Distributed Transactions (Saga Pattern)
In MSA, traditional ACID transactions (2PC) are often too slow or brittle.
- **Choreography**: Events trigger actions in other services directly (Decentralized).
- **Orchestration**: A central coordinator (Orchestrator) tells participants what to do.

### 3. Resilience (Circuit Breaker)
Prevents cascading failures when a downstream service is down.
- **Closed**: Normal operation.
- **Open**: Fails fast without calling the downstream service (after error threshold).
- **Half-Open**: Allows a few requests to test if the service has recovered.
`
                    },
                    {
                        id: 'high-traffic',
                        title: 'Handling High Traffic',
                        description: 'Caching strategies with Redis and Event-Driven Architecture with Kafka.',
                        content: `
### 1. Caching Strategies (Redis)
- **Look Aside (Lazy Loading)**: App checks Cache -> Miss -> DB -> Update Cache.
- **Write Back**: Write to Cache -> Async flush to DB (High performance, risk of data loss).
- **Redis Structures**:
    - **String**: Simple Key-Value (Session, Auth tokens).
    - **Sorted Set**: Real-time Leaderboards.
    - **Pub/Sub**: Real-time messaging.

### 2. Message Queues (Kafka vs RabbitMQ)
- **Kafka**: Log-based, high throughput, persistent, consumer pulls data. Good for **Event Streaming** and **Log Aggregation**.
- **RabbitMQ**: Traditional Broker, complex routing (Exchanges), push-based. Good for **Task Queues**.
`
                    }
                ]
            },
            {
                id: 'blockchain',
                title: 'Blockchain',
                topics: [
                    {
                        id: 'public-vs-private',
                        title: 'Public vs Private Blockchain',
                        description: 'Architecture comparison: Ethereum vs Hyperledger Fabric.',
                        content: `
### 1. Comparison

| Feature | Public (Ethereum) | Private/Consortium (Hyperledger Fabric) |
| :--- | :--- | :--- |
| **Access** | Permissionless (Anyone can join) | Permissioned (MSP - Membership Service Provider) |
| **Consensus** | PoS (Proof of Stake) | Pluggable (Raft, Kafka - Crash Fault Tolerance) |
| **Privacy** | Transactions are public | Channels (Private data collections) separate visibility |
| **Performance** | Low (~15-20 TPS), Finality issues | High (3000+ TPS), Immediate finality |
| **Cost** | Gas Fees | Infrastructure maintenance costs |

### 2. Architecture Differences
- **Ethereum**: EVM (World State), Smart Contracts (Solidity), Account-based model.
- **Fabric**: Peers (Endorser, Committer), Orderer (Consensus), Chaincode (Go/Java/Node), Ledger (World State + Blockchain).
`
                    },
                    {
                        id: 'smart-contract-security',
                        title: 'Smart Contract Security',
                        description: 'Common vulnerabilities in Solidity and best practices.',
                        content: `
### 1. Reentrancy Attack
- **Vulnerability**: Attacker's contract calls back into the victim contract before the first invocation is finished (e.g., withdrawing funds repeatedly).
- **Fix**: **Checks-Effects-Interactions** pattern. Update state *before* sending Ether. Use \`ReentrancyGuard\`.

### 2. Overflow/Underflow
- **Vulnerability**: Exceeding max value of uint256 wraps around to 0.
- **Fix**: Use Solidity 0.8+ (Built-in checks) or OpenZeppelin's \`SafeMath\`.

### 3. Access Control
- ensuring only \`owner\` or authorized roles can call critical functions (Using modifiers like \`onlyOwner\`).
`
                    },
                    {
                        id: 'zkp',
                        title: 'Zero-Knowledge Proof (ZKP)',
                        description: 'Proving possession of knowledge without revealing the information itself.',
                        content: `
### 1. Concept
**ZKP**: A method where a Prover convinces a Verifier that they know a value $x$, without revealing $x$.
- **Completeness**: If statement is true, honest verifier is convinced.
- **Soundness**: Cheating prover cannot convince verifier.
- **Zero-Knowledge**: Verifier learns nothing else.

### 2. Use Cases
- **Privacy Transactions**: Zcash, Tornado Cash (Mixers).
- **Scalability**: zk-Rollups (Compressing many transactions into one proof on Layer 2).
- **Identity**: Proving "I am over 18" without revealing birth date.
`
                    },
                    {
                        id: 'did',
                        title: 'Decentralized Identity (DID)',
                        description: 'Self-Sovereign Identity (SSI), Verifiable Credentials (VC), and VP.',
                        content: `
### 1. Core Components (W3C Standard)
- **DID (Decentralized Identifier)**: A globally unique identifier (e.g., \`did:sov:1234...\`) that resolves to a DID Document.
- **DID Document**: Contains public keys and service endpoints.
- **VC (Verifiable Credential)**: Digital credential issued by an Issuer (e.g., Driver's License). Includes Issuer's signature.
- **VP (Verifiable Presentation)**: A collection of VCs (or parts of them) presented by the Holder to a Verifier.

### 2. Flow
1. **Issuer** issues VC to **Holder** (User).
2. **Holder** stores VC in Wallet.
3. **Verifier** requests proof.
4. **Holder** creates VP and sends to **Verifier**.
5. **Verifier** checks signature against Issuer's DID on Blockchain.
`
                    }
                ]
            }
        ]
    },
    ko: {
        categories: [
            {
                id: 'database',
                title: '데이터베이스',
                topics: [
                    {
                        id: 'transaction',
                        title: '트랜잭션 (Transaction) & Java 구현',
                        description: '트랜잭션의 이론, ACID 특징, 그리고 Java(@Transactional)에서의 실무 적용 방법.',
                        content: `
### 1. 트랜잭션 이론
**트랜잭션(Transaction)**: 데이터베이스의 상태를 변화시키기 위해 수행하는 작업의 논리적 단위입니다.

#### ACID 특성
- **Atomicity (원자성)**: 트랜잭션 내의 모든 연산은 모두 성공하거나 모두 실패해야 합니다. (All or Nothing)
- **Consistency (일관성)**: 트랜잭션 수행 전후에 데이터베이스는 일관된 상태를 유지해야 합니다.
- **Isolation (격리성)**: 동시에 실행되는 여러 트랜잭션은 서로 간섭할 수 없습니다.
- **Durability (지속성)**: 성공적으로 완료된 트랜잭션의 결과는 영구적으로 반영되어야 합니다.

### 2. 격리 수준 (Isolation Levels)
- **READ UNCOMMITTED**: 커밋되지 않은 데이터도 읽기 가능 (Dirty Read 발생).
- **READ COMMITTED**: 커밋된 데이터만 읽기 가능 (Oracle, SQL Server, PostgreSQL 기본값).
- **REPEATABLE READ**: 같은 트랜잭션 내에서 조회한 데이터는 항상 동일함 (MySQL/InnoDB 기본값).
- **SERIALIZABLE**: 가장 엄격한 격리, 성능 저하 가능성 높음.

### 3. Java (Spring Boot) 실무 적용
Spring에서는 \`@Transactional\` 어노테이션을 통해 선언적으로 트랜잭션을 관리합니다.

\`\`\`java
@Service
public class OrderService {

    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public void placeOrder(OrderDTO orderDto) {
        // 1. 주문 정보 저장
        orderRepository.save(orderDto.toEntity());
        
        // 2. 재고 차감 (실패 시 주문 정보 롤백)
        inventoryService.decreaseStock(orderDto.getProductId(), orderDto.getQuantity());
        
        // 3. 결제 처리
        paymentService.process(orderDto.getPaymentDetails());
    }
}
\`\`\`

#### 주요 속성
- **Propagation (전파 속성)**: 기존 트랜잭션 유무에 따라 어떻게 동작할지 결정 (예: \`REQUIRED\`, \`REQUIRES_NEW\`).
- **Isolation (격리 수준)**: 트랜잭션의 격리 수준 설정.
- **RollbackFor**: 롤백을 유발할 예외 지정 (기본값은 RuntimeException).
`
                    },
                    {
                        id: 'rdb-comparison',
                        title: 'Postgres vs MySQL vs Oracle',
                        description: '주요 관계형 데이터베이스의 공통점과 차이점, 아키텍처 및 SQL 비교.',
                        content: `
### 1. 공통점
- 관계형 데이터베이스 관리 시스템 (RDBMS) 입니다.
- SQL (Structured Query Language)을 사용하여 데이터를 조작합니다.
- 트랜잭션의 ACID 특성을 지원합니다.
- 테이블(Table) 기반의 데이터 저장 구조를 가집니다 (행과 열).

### 2. 주요 차이점

| 특징 | MySQL | PostgreSQL | Oracle |
| :--- | :--- | :--- | :--- |
| **아키텍처** | 스토리지 엔진 기반 (InnoDB, MyISAM 등). | 객체-관계형 (ORDBMS). 프로세스 기반. | 멀티 모델, 강력하고 복잡한 엔터프라이즈 아키텍처. |
| **SQL 문법** | 비표준 확장 (예: \`LIMIT\`) 사용. | SQL 표준 준수율이 매우 높음. | PL/SQL (강력한 절차적 확장 언어). |
| **동시성 제어** | MVCC (InnoDB). 읽기 성능 우수. | MVCC. 복잡한 쿼리 및 쓰기 처리에 강점. | Row-level locking, 매우 높은 동시성 처리. |
| **JSON 지원** | 기본적인 JSON 지원. | 강력한 JSONB (Binary JSON) 지원 및 인덱싱. | 강력한 JSON 지원. |
| **라이선스** | GPL / 상용 (Oracle 소유). | 오픈 소스 (PostgreSQL 라이선스). | 상용 (독점 라이선스). |

### 3. SQL 문법 차이 (Limit 예시)

**MySQL & PostgreSQL:**
\`\`\`sql
SELECT * FROM users LIMIT 10 OFFSET 5;
\`\`\`

**Oracle (12c 이전):**
\`\`\`sql
SELECT * FROM (
    SELECT t.*, ROWNUM r FROM users t
) WHERE r BETWEEN 6 AND 15;
\`\`\`
*(참고: Oracle 12c+ 부터는 \`FETCH FIRST\` 문법 지원)*
`
                    },
                    {
                        id: 'nosql-vs-rdb',
                        title: 'NoSQL vs RDB',
                        description: '관계형 데이터베이스(RDB)와 비관계형 데이터베이스(NoSQL)의 비교.',
                        content: `
### 1. RDB (Relational Database)
- **구조**: 정해진 스키마에 따라 테이블 형태로 데이터 저장.
- **확장성**: 주로 수직적 확장 (Scale-up, 고성능 서버로 교체).
- **일관성**: 데이터의 정합성과 일관성 (ACID) 최우선.
- **사용 사례**: 금융 시스템, ERP, 복잡한 관계가 있는 데이터.
- **종류**: MySQL, PostgreSQL, Oracle, MSSQL.

### 2. NoSQL (Not Only SQL)
- **구조**: 유연한 스키마 (Document, Key-Value, Graph, Column-family).
- **확장성**: 수평적 확장 (Scale-out, 서버 증설)이 용이함.
- **일관성**: 일관성을 일부 희생하더라도 가용성과 분산 허용을 중시 (CAP 이론 - BASE).
- **사용 사례**: 빅데이터, 실시간 분석, 콘텐츠 관리, SNS.

### 3. CAP 이론
분산 시스템에서는 다음 세 가지 중 두 가지만 만족할 수 있다는 이론:
- **Consistency (일관성)**: 모든 노드가 동시에 같은 데이터를 보여줌.
- **Availability (가용성)**: 모든 요청에 대해 성공/실패 응답을 받음.
- **Partition Tolerance (분산 허용)**: 네트워크 단절에도 시스템이 동작함.

**RDB**: 주로 CA (일관성 + 가용성) - *단일 노드 기준*
**NoSQL**: 주로 AP (가용성 + 분산 허용) 또는 CP (일관성 + 분산 허용)
`
                    },
                    {
                        id: 'vector-db',
                        title: 'Vector Database',
                        description: '벡터 데이터베이스의 개념, 임베딩, 그리고 RAG.',
                        content: `
### 1. 이론
**Vector Database**: 데이터를 **벡터 임베딩(Vector Embedding)** 형태로 저장하고, 관리하며, 인덱싱하는 데 특화된 데이터베이스입니다.

**Vector Embedding**: 텍스트, 이미지, 오디오 등의 데이터를 AI 모델을 통해 숫자의 배열(벡터)로 변환한 것입니다. 의미가 비슷한 데이터끼리는 벡터 공간에서 가까이 위치하게 됩니다.

### 2. 동작 원리
- **임베딩 모델**: OpenAI, BERT 등의 모델을 사용하여 원본 데이터를 벡터로 변환 (Embedding).
- **인덱싱**: 빠른 검색을 위해 **HNSW**, **IVF** 등의 알고리즘으로 벡터를 인덱싱합니다.
- **유사도 검색 (Similarity Search)**: 쿼리 벡터와 가장 가까운 벡터들을 찾습니다. (**코사인 유사도**, **유클리드 거리** 등 사용).

### 3. 활용 사례
- **의미 기반 검색 (Semantic Search)**: 키워드가 일치하지 않아도 의미가 통하면 검색됨 (예: "귀여운 동물" 검색 시 "강아지와 고양이" 문서 반환).
- **추천 시스템**: "이 상품을 본 사용자가 좋아할 만한 다른 상품..."
- **RAG (검색 증강 생성)**: LLM(GPT 등)이 답변을 생성할 때, Vector DB에서 관련된 지식을 먼저 검색하여 프롬프트에 제공함으로써 정확도를 높이고 환각(Hallucination)을 줄임.

### 4. 실문 예시 (Pinecone/Weaviate)
\`\`\`python
# 의미 기반 검색 의사코드
query = "트랜잭션 구현 방법은?"
query_vector = embedding_model.encode(query)

# Vector DB에서 유사한 문서 5개 검색
results = vector_db.query(
    vector=query_vector,
    top_k=5,
    include_metadata=True
)

for result in results:
    print(result.metadata['text'])
\`\`\`
`
                    }
                ]
            },
            {
                id: 'backend',
                title: '백엔드 아키텍처',
                topics: [
                    {
                        id: 'sync-vs-async',
                        title: 'Sync vs Async & Blocking vs Non-blocking',
                        description: 'Spring MVC (Thread-per-request)와 Node.js (Event Loop)의 아키텍처 비교.',
                        content: `
### 1. Sync vs Async / Blocking vs Non-blocking
- **Synchronous (동기)**: 요청자가 결과를 기다림.
- **Asynchronous (비동기)**: 요청자가 작업을 시키고 바로 리턴, 나중에 완료 알림 받음 (Callback/Future).
- **Blocking**: I/O 작업이 끝날 때까지 스레드가 대기함.
- **Non-blocking**: 스레드가 대기하지 않고 즉시 리턴, I/O 완료는 이벤트로 처리.

### 2. Spring MVC (Classic) vs Node.js
#### Spring MVC (Blocking I/O)
- **모델**: Thread-per-request (요청당 스레드).
- **장점**: 디버깅 용이, 안정성, 레거시 호환성.
- **단점**: 동시 접속이 많으면 스레드 생성 비용(Context Switching) 증가.
- **사용처**: CPU 연산이 많은 작업, 전통적인 엔터프라이즈 앱.

#### Node.js / Spring WebFlux (Non-blocking I/O)
- **모델**: Single Thread Event Loop (Node.js) / Event-driven.
- **장점**: 적은 수의 스레드로 대량의 동시 접속 처리 가능.
- **단점**: 콜백 지옥(Async/Await로 완화), CPU 집약적 작업 시 루프 차단됨.
- **사용처**: I/O가 많은 앱 (채팅, 스트리밍, 게이트웨이).
`
                    },
                    {
                        id: 'grpc-vs-rest',
                        title: 'gRPC vs REST API',
                        description: 'gRPC를 사용하는 이유, Protocol Buffers와 JSON 비교, 시스템 간 통신 효율성.',
                        content: `
### 1. 비교

| 특징 | REST API | gRPC |
| :--- | :--- | :--- |
| **프로토콜** | HTTP/1.1 (텍스트 기반) | HTTP/2 (바이너리 기반) |
| **데이터 포맷** | JSON (사람이 읽기 편함, 용량 큼) | Protocol Buffers (바이너리, 작고 빠름, 타입 엄격) |
| **통신 방식** | Unary (전통적 요청/응답) | Unary, Server/Client Streaming, 양방향 Streaming |
| **브라우저 지원** | 기본 지원 | gRPC-Web 프록시 필요 |

### 2. 왜 gRPC인가?
- **성능**: Protobuf는 JSON 대비 직렬화/역직렬화 속도가 3-10배 빠르고 데이터 크기가 작음.
- **타입 안정성**: .proto 파일로 인터페이스를 정의하므로 계약(Contract)이 엄격함.
- **Polyglot**: Go, Java, Python 등 다양한 언어의 클라이언트/서버 코드를 자동 생성.

### 3. 사용 사례
- **마이크로서비스 간 통신** (내부 통신 속도 중요).
- 모바일 클라이언트 (네트워크 대역폭 절약).
`
                    },
                    {
                        id: 'msa-patterns',
                        title: 'MSA 패턴',
                        description: '서비스 분리 전략, 분산 트랜잭션(Saga), 그리고 서킷 브레이커.',
                        content: `
### 1. 분리 전략 (Decomposition)
- **비즈니스 능력 기반**: 주문 서비스, 재고 서비스 등.
- **DDD 하위 도메인 기반**: 핵심(Core), 지원(Supporting), 일반(Generic) 도메인.

### 2. 분산 트랜잭션 (Saga Pattern)
MSA에서는 전통적인 ACID 트랜잭션(2PC)이 어렵기 때문에 Saga 패턴을 사용.
- **Choreography (안무)**: 서비스끼리 이벤트를 주고받으며 다음 작업 수행 (중앙 제어 없음).
- **Orchestration (지휘)**: 중앙 오케스트레이터가 각 서비스에 명령을 내림.

### 3. 장애 격리 (Circuit Breaker)
외부 서비스 장애가 전체 시스템으로 전파되는 것을 방지.
- **Closed**: 정상 상태.
- **Open**: 에러 임계치 초과 시 회로 차단 (요청 즉시 실패 처리).
- **Half-Open**: 일정 시간 후 일부 요청만 보내보며 복구 확인.
`
                    },
                    {
                        id: 'high-traffic',
                        title: '대용량 트래픽 처리',
                        description: 'Redis를 활용한 캐싱 전략과 Kafka 기반의 이벤트 구동 아키텍처.',
                        content: `
### 1. 캐싱 전략 (Redis)
- **Look Aside (Lazy Loading)**: 앱이 캐시 확인 -> 없으면 DB 조회 -> 캐시에 저장.
- **Write Back**: 캐시에 먼저 쓰고 -> 비동기로 DB에 반영 (성능 최상, 데이터 유실 위험).
- **Redis 자료구조**:
    - **String**: 단순 키-값 (세션, 인증 토큰).
    - **Sorted Set**: 실시간 랭킹/순위표.
    - **Pub/Sub**: 실시간 메시징.

### 2. 메시지 큐 (Kafka vs RabbitMQ)
- **Kafka**: 로그 기반, 대용량 처리(Throughput) 중심, 데이터가 디스크에 남음. **이벤트 스트리밍**, **로그 수집**에 적합.
- **RabbitMQ**: 전통적 브로커, 복잡한 라우팅(Exchange) 가능. **작업 큐(Task Queue)**에 적합.
`
                    }
                ]
            },
            {
                id: 'blockchain',
                title: '블록체인 (Blockchain)',
                topics: [
                    {
                        id: 'public-vs-private',
                        title: 'Public vs Private 블록체인',
                        description: 'Ethereum과 Hyperledger Fabric의 아키텍처 및 합의 알고리즘 비교.',
                        content: `
### 1. 비교

| 특징 | Public (Ethereum) | Private/Consortium (Hyperledger Fabric) |
| :--- | :--- | :--- |
| **접근성** | 누구나 참여 가능 (Permissionless) | 허가된 참여자만 가능 (MSP 인증) |
| **합의 알고리즘** | PoS (지분 증명) | Pluggable (Raft, Kafka - CFT) |
| **프라이버시** | 모든 거래 내역 공개 | Channel (채널)을 통해 특정 그룹끼리만 데이터 공유 |
| **성능** | 낮음 (~15-20 TPS), 확정성(Finality) 부족 | 높음 (3000+ TPS), 즉각적인 확정성 |
| **비용** | 가스비 (Gas Fee) | 인프라 구축 및 유지 비용 |

### 2. 아키텍처 차이
- **Ethereum**: EVM (World State), 스마트 컨트랙트 (Solidity), 계정 기반 모델.
- **Fabric**: Peers (Endorser, Committer), Orderer (합의), Chaincode (Go/Java/Node), Ledger (World State + Blockchain).
`
                    },
                    {
                        id: 'smart-contract-security',
                        title: '스마트 컨트랙트 보안',
                        description: 'Solidity 개발 시 발생하는 주요 취약점(Reentrancy 등)과 보안 패턴.',
                        content: `
### 1. 재진입 공격 (Reentrancy Attack)
- **취약점**: 공격자의 컨트랙트가 원래 함수 실행이 끝나기 전에 다시 해당 함수를 호출하여 자금을 반복 인출.
- **해결**: **Checks-Effects-Interactions** 패턴 준수 (상태 변경을 송금 전에 수행). \`ReentrancyGuard\` 사용.

### 2. 오버플로우/언더플로우 (Overflow/Underflow)
- **취약점**: 변수 타입의 최대값을 넘어가면 0으로 돌아가는 현상.
- **해결**: Solidity 0.8+ 버전 사용 (자체 체크 내장) 또는 OpenZeppelin \`SafeMath\` 라이브러리 사용.

### 3. 접근 제어 (Access Control)
- \`owner\`나 특정 권한을 가진 계정만 중요 함수를 실행할 수 있도록 제어 (\`onlyOwner\` modifier 사용).
`
                    },
                    {
                        id: 'zkp',
                        title: '영지식 증명 (ZKP)',
                        description: '정보를 공개하지 않고 정보를 알고 있음을 증명하는 기술.',
                        content: `
### 1. 개념
**ZKP (Zero-Knowledge Proof)**: 증명자(Prover)가 검증자(Verifier)에게 자신이 비밀 값 $x$를 알고 있다는 사실을, $x$ 자체를 노출하지 않고 확신시키는 방법.
- **완전성 (Completeness)**: 참이면 검증자를 납득시킬 수 있음.
- **건전성 (Soundness)**: 거짓이면 검증자를 속일 수 없음.
- **영지식성 (Zero-Knowledge)**: 검증자는 참/거짓 외에 아무 정보도 얻지 못함.

### 2. 활용 사례
- **익명 거래**: Zcash, Tornado Cash (믹서).
- **확장성**: zk-Rollups (Layer 2에서 수많은 트랜잭션을 하나의 증명으로 압축해 Layer 1에 기록).
- **신원 증명**: 생년월일을 공개하지 않고 "성인임"만 증명.
`
                    },
                    {
                        id: 'did',
                        title: '분산 신원 증명 (DID)',
                        description: '자기 주권 신원(SSI), Verifiable Credential(VC)의 개념.',
                        content: `
### 1. 핵심 구성 요소 (W3C 표준)
- **DID (Decentralized Identifier)**: 전 세계적으로 유일한 식별자 (예: \`did:sov:1234...\`). DID Document로 연결됨.
- **DID Document**: 공개키와 서비스 엔드포인트 등을 담고 있음.
- **VC (Verifiable Credential)**: 발행자(Issuer)가 발급한 디지털 증명서 (예: 운전면허증). 발행자의 서명이 포함됨.
- **VP (Verifiable Presentation)**: 사용자가 검증자에게 제출하기 위해 VC들을 조합하여 만든 프레젠테이션.

### 2. 흐름
1. **Issuer** (발행자)가 **Holder** (사용자)에게 VC 발급.
2. **Holder**는 VC를 모바일 지갑 등에 보관.
3. **Verifier** (검증자)가 증명을 요청.
4. **Holder**는 VP를 생성하여 **Verifier**에게 제출.
5. **Verifier**는 블록체인상의 DID를 통해 Issuer의 서명을 검증.
`
                    }
                ]
            }
        ]
    }
};
