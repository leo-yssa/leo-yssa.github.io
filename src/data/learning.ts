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
                id: 'database',
                title: 'Database',
                topics: [
                    // ... existing topics ...
                    {
                        id: 'db-algorithms',
                        title: 'DBMS Algorithms & Big-O Complexity',
                        description: 'Deep dive into B+ Trees, Hash Indexes, and LSM Trees with CRUD time complexity analysis.',
                        content: `
### 1. B+ Tree (Standard for RDBMS)
Used by **MySQL (InnoDB)**, **Oracle**, **PostgreSQL**.
- **Structure**: All actual data(or pointers) reside in leaf nodes. Internal nodes only hold keys for routing. Leaf nodes are linked (LinkedList) for efficiency.
- **Time Complexity**: **O(log N)** for Search, Insert, Update, Delete.
- **Why O(log N)?**: It is a balanced tree. The height of the tree grows logarithmically with the number of data points ($N$). Accessing any leaf requires traversing from the root down the height of the tree.

#### Differences by DBMS
- **MySQL (InnoDB)**: **Clustered Index**. The Primary Key (PK) B+ Tree *is* the table itself. Leaf nodes contain the full row data.
- **PostgreSQL / Oracle**: **Heap Table + Index**. The table data resides in a Heap structure. The B+ Tree index leaf nodes contain pointers (CTID or RowID) to the heap location.

### 2. Hash Index
Used by **Redis**, Memory Storage engines.
- **Time Complexity**: **O(1)** (Average).
- **Reason**: A hash function computes the exact memory address/bucket from the key. No traversal needed.
- **Limitation**: Cannot support Range Scans (e.g., \`WHERE age > 20\`).

### 3. LSM Tree (Log Structured Merge Tree)
Used by **Cassandra**, **HBase**, **RocksDB** (Write-heavy NoSQL).
- **Write**: **O(1)**. Appends to an in-memory buffer (MemTable). No disk seeking needed immediately.
- **Read**: **O(K * log N)**. Must check MemTable and potentially multiple disk files (SSTables). Slower than B+ Tree for reads.
`
                    },
                    {
                        id: 'db-index-types',
                        title: 'Database Index Types & Best Practices',
                        description: 'Clustered vs Non-Clustered, Composite Index, and performance optimization.',
                        content: `
### 1. Clustered Index
- **Definition**: The physical order of data on disk matches the index order. Only one per table (usually Primary Key).
- **Pros**: Very fast retrieval for **Range Queries (\`BETWEEN\`, \`>\`)** and **Sorting (\`ORDER BY\`)**.
- **Cons**: Insert/Update can be slow if physical reordering (Page Split) is required.

### 2. Non-Clustered Index (Secondary Index)
- **Definition**: A separate structure from table rows. Contains a sorted key and a pointer to the actual data row.
- **Pros**: Multiple indexes per table allowed.
- **Cons**: Requires additional lookup (Index -> Pointer -> Data), slightly slower than Clustered.

### 3. Composite Index (Multi-Column Index)
- **Definition**: An index on two or more columns.
- **Caution**: **Leftmost Prefix Rule**. The order of columns matters. If index is (A, B), query on B alone cannot use the index effectively.

### 4. Best Practices & Cautions
- **Cardinality**: Use indexes on columns with high cardinality (many unique values). (e.g., ID is good, Gender is bad).
- **Write Performance**: Too many indexes slow down \`INSERT\`, \`UPDATE\`, \`DELETE\` operations significantly as all indexes must be maintained.
- **Covering Index**: If an index contains all required columns for a query, the DB can return data directly from the index without looking up the table (Significant performance boost).
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
            },
            {
                id: 'frontend',
                title: 'Frontend Development',
                topics: [
                    {
                        id: 'virtual-dom',
                        title: 'Virtual DOM & Rendering Optimization',
                        description: 'How React works: Diffing algorithm and Memoization.',
                        content: `
### 1. Virtual DOM
- **Concept**: A lightweight copy of the real DOM. React updates the Virtual DOM first, compares it with the previous version (**Diffing**), and only updates the changed parts in the real DOM (**Reconciliation**).
- **Reason**: Direct DOM manipulation is slow (reflow/repaint). Virtual DOM batches updates for performance.

### 2. Optimization Techniques
- **React.memo**: Memoizes a component to prevent re-rendering if props haven't changed.
- **useMemo / useCallback**: Caches heavy calculation results or function definitions to avoid re-creation on every render.
- **Key Prop**: Essential for lists. Helps React identify which items have changed, added, or removed.
`
                    },
                    {
                        id: 'state-management',
                        title: 'State Management (Redux vs Zustand)',
                        description: 'Comparison of Global State libraries and Server State concepts.',
                        content: `
### 1. Client State
- **Context API**: Built-in, good for simple global data (Theme, Auth). frequent updates can cause unnecessary re-renders.
- **Redux**: Predictable state container (Flux pattern). Powerful devtools, but high boilerplate (Actions, Reducers).
- **Zustand**: Minimalist, hook-based, no boilerplate. Growing popularity for its simplicity.

### 2. Server State
- **React Query (TanStack Query)**: Manages async server data (Caching, Deduping, Background updates). Replaces strict "Global State" for API data.
`
                    },
                    {
                        id: 'build-tools',
                        title: 'Modern Build Tools (Webpack vs Vite)',
                        description: 'Bundle-based vs Native ESM-based development environments.',
                        content: `
### 1. Webpack (Bundler)
- **Mechanism**: Bundles all files (JS, CSS, Images) into a single (or few) output file(s) *before* starting the dev server.
- **Pros**: Mature ecosystem, rich plugin support.
- **Cons**: Slow startup time on large projects.

### 2. Vite (Native ESM)
- **Mechanism**: Serves source files over Native ESM. Bundling is done by **esbuild** (Go-based, extremely fast).
- **Pros**: Instant server start, HMR (Hot Module Replacement) stays fast regardless of app size.
- **Cons**: Newer ecosystem compared to Webpack.
`
                    },
                    {
                        id: 'ssr-nextjs',
                        title: 'SSR & Next.js',
                        description: 'CSR vs SSR vs SSG, and React Server Components (RSC).',
                        content: `
### 1. Rendering Patterns
- **CSR (Client-Side Rendering)**: Browser downloads empty HTML + JS. JS builds the UI. Good for interactivity, bad for SEO.
- **SSR (Server-Side Rendering)**: Server generates HTML for every request. Good for SEO, slower TTFB.
- **SSG (Static Site Generation)**: HTML built at compile time. Fastest performance, but data is static.

### 2. React Server Components (RSC)
- Components run *only* on the server. Zero bundle size impact on client.
- Can directly access DB/Filesystem.
- **Hydration**: Client takes over interactivity after initial HTML load.
`
                    }
                ]
            },
            {
                id: 'app-development',
                title: 'App Development',
                topics: [
                    {
                        id: 'cross-platform',
                        title: 'Cross-Platform (Flutter vs React Native)',
                        description: 'Comparison of rendering engines (Skia vs Bridge/JSI) and performance.',
                        content: `
### 1. Flutter
- **Engine**: Uses **Skia** (C++) to draw every pixel on the screen. Identical UI across platforms.
- **Language**: Dart (AOT compiled to native code).
- **Pros**: Consistent UI, high performance (60fps), great documentation.

### 2. React Native
- **Engine**: Uses Native Platform UI components mapped via a **Bridge** (or JSI in new architecture).
- **Language**: JavaScript/TypeScript.
- **Pros**: Access to native UI look & feel, huge ecosystem, code sharing with Web (React).
`
                    },
                    {
                        id: 'app-lifecycle',
                        title: 'App Lifecycle & Memory Management',
                        description: 'Understanding Activity/Fragment lifecycles and background task handling.',
                        content: `
### 1. Lifecycle States
- **Foreground**: App is visible and interactive.
- **Background**: App is hidden (Home button pressed). OS may kill it to reclaim memory.
- **Suspended**: App is in memory but not executing code.

### 2. Memory Leaks
- **Common Causes**: Unregistered listeners, static references to Context (Android), Retain cycles (iOS).
- **Detection**: Android Studio Profiler, Xcode Instruments, LeakCanary.
`
                    },
                    {
                        id: 'offline-first',
                        title: 'Offline-First Architecture',
                        description: 'Local databases (SQLite, Realm) and Data Sync strategies.',
                        content: `
### 1. Local Database
- **SQLite**: Standard relational DB. Good for complex queries. (Libraries: Room, Drift).
- **Realm / Hive**: NoSQL object stores. Faster read/write for object graphs.

### 2. Sync Strategies
- **Optimistic UI**: Update UI immediately, sync with server in background. Rollback on error.
- **Conflict Resolution**: "Last Write Wins" or "Merge" strategies when server data differs from local.
`
                    },
                    {
                        id: 'app-deployment',
                        title: 'Deployment & CI/CD',
                        description: 'Automating release process with Fastlane and Store guidelines.',
                        content: `
### 1. Fastlane
- Automation tool for screenshots, code signing, and releasing to stores.
- **Match**: Syncs certificates/profiles via Git to share across team.

### 2. Store Guidelines
- **iOS (App Store)**: Strict review. No dynamic code loading (hot push limited).
- **Android (Play Store)**: Automated checks + manual review. Phased rollouts supported.
`
                    }
                ]
            },
            {
                id: 'ai',
                title: 'Artificial Intelligence',
                topics: [
                    {
                        id: 'transformers',
                        title: 'Transformer Architecture',
                        description: 'The "Attention Is All You Need" revolution behind GPT and BERT.',
                        content: `
### 1. Attention Mechanism
- **Self-Attention**: Allows the model to weigh the importance of different words in a sentence regardless of their distance.
- Solves the "long-term dependency" problem of RNNs/LSTMs.
- **Parallelization**: Unlike RNNs (sequential), Transformers process entire sequences at once, enabling massive scale training.
`
                    },
                    {
                        id: 'llm-training',
                        title: 'LLM Training Pipeline',
                        description: 'Pre-training, SFT (Supervised Fine-Tuning), and RLHF.',
                        content: `
### 1. Pre-training
- Learning to predict the next token on massive text datasets (Unsupervised).
- Learns grammar, facts, and reasoning abilities.

### 2. Fine-Tuning
- **SFT (Supervised Fine-Tuning)**: Training on high-quality Q&A pairs to follow instructions.
- **RLHF (Reinforcement Learning from Human Feedback)**: Aligning model output with human preferences (Helpful, Honest, Harmless).
`
                    },
                    {
                        id: 'vector-search',
                        title: 'Vector Search & Embeddings',
                        description: 'Mathematical representation of meaning for Semantic Search.',
                        content: `
### 1. Embeddings
- Converting text/image into a high-dimensional vector (list of numbers).
- **Proximity**: Similar concepts are close in vector space (e.g., "King" - "Man" + "Woman" ≈ "Queen").

### 2. Search Algorithms
- **KNN (K-Nearest Neighbors)**: Exact but slow.
- **ANN (Approximate Nearest Neighbors)**: HNSW, IVF. Faster, slightly less accurate. Used in Vector DBs.
`
                    },
                    {
                        id: 'diffusion-models',
                        title: 'Diffusion Models',
                        description: 'How image generation models (Stable Diffusion, Midjourney) work.',
                        content: `
### 1. Forward Process
- Gradually adding Gaussian noise to an image until it becomes pure random noise.

### 2. Reverse Process
- Training a neural network (U-Net) to predict and *remove* the noise step-by-step.
- Starting from random noise, the model "denoises" it into a coherent image based on a text prompt (Conditioning).
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
                    },
                    {
                        id: 'db-algorithms',
                        title: 'DBMS 알고리즘과 CRUD Big-O 분석',
                        description: 'B+ Tree, Hash Index, LSM Tree의 구조와 각 CRUD 동작의 시간 복잡도 상세 분석.',
                        content: `
### 1. B+ Tree (관계형 DB의 표준)
**MySQL (InnoDB)**, **Oracle**, **PostgreSQL**에서 기본 인덱스 구조로 사용.

#### 구조 및 특징
- **Balanced Tree**: 루트에서 모든 리프 노드까지의 거리가 동일함.
- **리프 노드**: 실제 데이터(또는 포인터)는 모두 리프에만 존재하며, 리프 노드끼리는 Linked List로 연결되어 있어 **범위 검색(Range Scan)**에 매우 유리함.

#### CRUD 시간 복잡도: O(log N)
- **이유**: 트리의 높이(Height)만큼만 비교 연산을 수행하면 됨. 데이터가 100만 개($N$)여도 높이는 보통 3~4 수준임 ($log_{FanOut}(N)$).
- **Insert/Delete**: 데이터를 삽입/삭제할 때 노드가 꽉 차면 분할(Split)하거나 병합(Merge)하는 과정이 필요하지만, 이 역시 트리 높이에 비례하므로 **O(log N)** 유지.

#### DBMS별 차이
- **MySQL (InnoDB)**: **Clustered Index**. PK의 B+ Tree 리프 노드에 **실제 행 데이터**가 저장됨. PK로 조회 시 가장 빠름.
- **PostgreSQL / Oracle**: **Heap Table**. 데이터는 별도의 힙 영역에 쌓이고, B+ Tree 인덱스는 데이터의 위치(RowID/CTID)를 가리킴. 2차 탐색(인덱스 -> 힙) 비용이 발생하지만, 2차 인덱스 갱신 비용은 MySQL보다 저렴할 수 있음.

### 2. Hash Index (해시 인덱스)
**Redis**, 일부 In-Memory DB에서 사용.
- **시간 복잡도**: **O(1)** (평균).
- **이유**: 해시 함수 $f(x)$를 통해 데이터가 저장된 메모리 주소를 즉시 계산.
- **단점**: **범위 검색(예: \`> 20\`) 불가**. 오직 **동등 비교(\`=\`)**만 가능.

### 3. LSM Tree (Log Structured Merge Tree)
**Cassandra**, **HBase** 등 쓰기 성능이 중요한 NoSQL에서 사용.
- **쓰기 (Write)**: **O(1)**. 디스크 탐색 없이 메모리(MemTable)에 순차적으로(Append-only) 씀.
- **읽기 (Read)**: **O(K * log N)**. 메모리를 먼저 보고, 없으면 디스크의 여러 파일(SSTable)을 뒤져야 하므로 B+ Tree보다 느릴 수 있음 (Bloom Filter로 보완).
`
                    },
                    {
                        id: 'db-index-types',
                        title: '데이터베이스 인덱스 종류와 주의점',
                        description: '클러스터드 vs 논-클러스터드, 결합 인덱스, 그리고 성능 최적화.',
                        content: `
### 1. Clustered Index (클러스터드 인덱스)
- **정의**: 데이터의 물리적 저장 순서가 인덱스 순서와 동일함. 테이블당 1개만 존재 (주로 PK).
- **장점**: **범위 검색(Range Scan)** 및 **정렬(Order By)**에 매우 빠름.
- **단점**: 데이터 입력/수정 시 물리적 재정렬(Page Split)이 발생하여 성능 저하 가능성.

### 2. Non-Clustered Index (논-클러스터드 / 세컨더리 인덱스)
- **정의**: 데이터와 별도로 존재하는 인덱스 구조. 정렬된 키와 실제 데이터의 위치(포인터)를 가리킴.
- **장점**: 테이블당 여러 개 생성 가능.
- **단점**: 인덱스를 거쳐 데이터를 찾아야 하므로(Look up) 클러스터드보다 약간 느림.

### 3. Composite Index (결합 인덱스)
- **정의**: 두 개 이상의 컬럼을 묶어 만든 인덱스.
- **주의**: **Leftmost Prefix Rule**. 컬럼 순서가 중요함. 인덱스가 (A, B)일 때, B만으로 조회하면 인덱스를 타지 않음.

### 4. 주의사항 및 팁
- **카디널리티(Cardinality)**: 중복도가 낮고 유니크한 값이 많은 컬럼(주민번호, ID)에 걸어야 효율적 (성별같이 중복 많은 컬럼은 비효율).
- **쓰기 성능**: 인덱스가 많으면 \`INSERT\`, \`UPDATE\`, \`DELETE\` 시 모든 인덱스를 갱신해야 하므로 느려짐.
- **커버링 인덱스(Covering Index)**: 쿼리에 필요한 모든 컬럼이 인덱스에 포함되어 있다면, 테이블 조회 없이 인덱스만으로 결과를 반환하여 성능 급상승.
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
### 1. Sync vs Async / Blocking vs Non - blocking
                    - ** Synchronous(동기) **: 요청자가 결과를 기다림.
- ** Asynchronous(비동기) **: 요청자가 작업을 시키고 바로 리턴, 나중에 완료 알림 받음(Callback / Future).
- ** Blocking **: I / O 작업이 끝날 때까지 스레드가 대기함.
- ** Non - blocking **: 스레드가 대기하지 않고 즉시 리턴, I / O 완료는 이벤트로 처리.

### 2. Spring MVC(Classic) vs Node.js
#### Spring MVC(Blocking I / O)
                    - ** 모델 **: Thread - per - request(요청당 스레드).
- ** 장점 **: 디버깅 용이, 안정성, 레거시 호환성.
- ** 단점 **: 동시 접속이 많으면 스레드 생성 비용(Context Switching) 증가.
- ** 사용처 **: CPU 연산이 많은 작업, 전통적인 엔터프라이즈 앱.

#### Node.js / Spring WebFlux(Non - blocking I / O)
                    - ** 모델 **: Single Thread Event Loop(Node.js) / Event - driven.
- ** 장점 **: 적은 수의 스레드로 대량의 동시 접속 처리 가능.
- ** 단점 **: 콜백 지옥(Async / Await로 완화), CPU 집약적 작업 시 루프 차단됨.
- ** 사용처 **: I / O가 많은 앱(채팅, 스트리밍, 게이트웨이).
`
                    },
                    {
                        id: 'grpc-vs-rest',
                        title: 'gRPC vs REST API',
                        description: 'gRPC를 사용하는 이유, Protocol Buffers와 JSON 비교, 시스템 간 통신 효율성.',
                        content: `
### 1. 비교

                    | 특징 | REST API | gRPC |
| : --- | : --- | : --- |
| ** 프로토콜 ** | HTTP / 1.1(텍스트 기반) | HTTP / 2(바이너리 기반) |
| ** 데이터 포맷 ** | JSON(사람이 읽기 편함, 용량 큼) | Protocol Buffers(바이너리, 작고 빠름, 타입 엄격) |
| ** 통신 방식 ** | Unary(전통적 요청 / 응답) | Unary, Server / Client Streaming, 양방향 Streaming |
| ** 브라우저 지원 ** | 기본 지원 | gRPC - Web 프록시 필요 |

### 2. 왜 gRPC인가 ?
- ** 성능 **: Protobuf는 JSON 대비 직렬화 / 역직렬화 속도가 3 - 10배 빠르고 데이터 크기가 작음.
- ** 타입 안정성 **: .proto 파일로 인터페이스를 정의하므로 계약(Contract)이 엄격함.
- ** Polyglot **: Go, Java, Python 등 다양한 언어의 클라이언트 / 서버 코드를 자동 생성.

### 3. 사용 사례
                    - ** 마이크로서비스 간 통신 ** (내부 통신 속도 중요).
- 모바일 클라이언트(네트워크 대역폭 절약).
`
                    },
                    {
                        id: 'msa-patterns',
                        title: 'MSA 패턴',
                        description: '서비스 분리 전략, 분산 트랜잭션(Saga), 그리고 서킷 브레이커.',
                        content: `
### 1. 분리 전략(Decomposition)
                    - ** 비즈니스 능력 기반 **: 주문 서비스, 재고 서비스 등.
- ** DDD 하위 도메인 기반 **: 핵심(Core), 지원(Supporting), 일반(Generic) 도메인.

### 2. 분산 트랜잭션(Saga Pattern)
MSA에서는 전통적인 ACID 트랜잭션(2PC)이 어렵기 때문에 Saga 패턴을 사용.
- ** Choreography(안무) **: 서비스끼리 이벤트를 주고받으며 다음 작업 수행(중앙 제어 없음).
- ** Orchestration(지휘) **: 중앙 오케스트레이터가 각 서비스에 명령을 내림.

### 3. 장애 격리(Circuit Breaker)
외부 서비스 장애가 전체 시스템으로 전파되는 것을 방지.
- ** Closed **: 정상 상태.
- ** Open **: 에러 임계치 초과 시 회로 차단(요청 즉시 실패 처리).
- ** Half - Open **: 일정 시간 후 일부 요청만 보내보며 복구 확인.
`
                    },
                    {
                        id: 'high-traffic',
                        title: '대용량 트래픽 처리',
                        description: 'Redis를 활용한 캐싱 전략과 Kafka 기반의 이벤트 구동 아키텍처.',
                        content: `
### 1. 캐싱 전략(Redis)
                    - ** Look Aside(Lazy Loading) **: 앱이 캐시 확인 -> 없으면 DB 조회 -> 캐시에 저장.
- ** Write Back **: 캐시에 먼저 쓰고 -> 비동기로 DB에 반영(성능 최상, 데이터 유실 위험).
- ** Redis 자료구조 **:
    - ** String **: 단순 키 - 값(세션, 인증 토큰).
    - ** Sorted Set **: 실시간 랭킹 / 순위표.
    - ** Pub / Sub **: 실시간 메시징.

### 2. 메시지 큐(Kafka vs RabbitMQ)
                    - ** Kafka **: 로그 기반, 대용량 처리(Throughput) 중심, 데이터가 디스크에 남음. ** 이벤트 스트리밍 **, ** 로그 수집 ** 에 적합.
- ** RabbitMQ **: 전통적 브로커, 복잡한 라우팅(Exchange) 가능. ** 작업 큐(Task Queue) ** 에 적합.
`
                    }
                ]
            },
            {
                id: 'blockchain',
                title: '블록체인',
                topics: [
                    {
                        id: 'public-vs-private',
                        title: 'Public vs Private 블록체인',
                        description: 'Ethereum과 Hyperledger Fabric의 아키텍처 및 합의 알고리즘 비교.',
                        content: `
### 1. 비교

                    | 특징 | Public(Ethereum) | Private / Consortium(Hyperledger Fabric) |
| : --- | : --- | : --- |
| ** 접근성 ** | 누구나 참여 가능(Permissionless) | 허가된 참여자만 가능(MSP 인증) |
| ** 합의 알고리즘 ** | PoS(지분 증명) | Pluggable(Raft, Kafka - CFT) |
| ** 프라이버시 ** | 모든 거래 내역 공개 | Channel(채널)을 통해 특정 그룹끼리만 데이터 공유 |
| ** 성능 ** | 낮음(~15 - 20 TPS), 확정성(Finality) 부족 | 높음(3000 + TPS), 즉각적인 확정성 |
| ** 비용 ** | 가스비(Gas Fee) | 인프라 구축 및 유지 비용 |

### 2. 아키텍처 차이
                    - ** Ethereum **: EVM(World State), 스마트 컨트랙트(Solidity), 계정 기반 모델.
- ** Fabric **: Peers(Endorser, Committer), Orderer(합의), Chaincode(Go / Java / Node), Ledger(World State + Blockchain).
`
                    },
                    {
                        id: 'smart-contract-security',
                        title: '스마트 컨트랙트 보안',
                        description: 'Solidity 개발 시 발생하는 주요 취약점(Reentrancy 등)과 보안 패턴.',
                        content: `
### 1. 재진입 공격(Reentrancy Attack)
                    - ** 취약점 **: 공격자의 컨트랙트가 원래 함수 실행이 끝나기 전에 다시 해당 함수를 호출하여 자금을 반복 인출.
- ** 해결 **: ** Checks - Effects - Interactions ** 패턴 준수(상태 변경을 송금 전에 수행).\`ReentrancyGuard\` 사용.

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
            },
            {
                id: 'frontend',
                title: '프론트엔드',
                topics: [
                    {
                        id: 'virtual-dom',
                        title: 'Virtual DOM & 렌더링 최적화',
                        description: 'React의 동작 원리와 메모이제이션을 통한 성능 개선.',
                        content: `
### 1. Virtual DOM
- **개념**: 실제 DOM의 가벼운 사본. React는 Virtual DOM을 먼저 업데이트하고, 이전 버전과 비교(**Diffing**)한 뒤 변경된 부분만 실제 DOM에 반영(**Reconciliation**).
- **이유**: DOM 조작은 비용이 많이 듬(Reflow/Repaint). 변경 사항을 모아서 한 번에 처리하여 성능 향상.

### 2. 최적화 기법
- **React.memo**: Props가 변경되지 않으면 컴포넌트 리렌더링 방지.
- **useMemo / useCallback**: 무거운 연산 결과나 함수 정의를 캐싱하여 불필요한 재생성 방지.
- **Key Prop**: 리스트 렌더링 시 변경/추가/삭제된 항목을 식별하기 위해 필수.
`
                    },
                    {
                        id: 'state-management',
                        title: '상태 관리 (Redux vs Zustand)',
                        description: '전역 상태 라이브러리 비교와 서버 상태(Server State) 개념.',
                        content: `
### 1. 클라이언트 상태 (Client State)
- **Context API**: 내장 기능, 사용 간편. 잦은 업데이트 시 불필요한 리렌더링 발생 가능.
- **Redux**: 예측 가능한 상태 컨테이너(Flux 패턴). 강력한 DevTools, but 보일러플레이트가 많음.
- **Zustand**: 훅 기반의 미니멀한 라이브러리. 사용이 쉽고 렌더링 최적화가 자동.

### 2. 서버 상태 (Server State)
- **React Query (TanStack Query)**: 비동기 데이터 관리(캐싱, 중복 제거, 백그라운드 갱신). API 데이터 처리를 전역 상태에서 분리.
`
                    },
                    {
                        id: 'build-tools',
                        title: '모던 빌드 도구 (Webpack vs Vite)',
                        description: '번들러 기반 vs 네이티브 ESM 기반 개발 환경 비교.',
                        content: `
### 1. Webpack (번들러)
- **방식**: 모든 파일(JS, CSS, 이미지)을 하나의 결과물로 번들링한 *후* 서버 구동.
- **장점**: 방대한 생태계, 안정성, 풍부한 플러그인.
- **단점**: 프로젝트가 커질수록 초기 구동 속도가 느려짐.

### 2. Vite (Native ESM)
- **방식**: 소스 파일을 Native ESM으로 서빙. 라이브러리 번들링은 **esbuild**(Go 기반)로 초고속 처리.
- **장점**: 즉각적인 서버 구동, 앱 크기와 상관없이 빠른 HMR.
- **단점**: Webpack에 비해 생태계가 상대적으로 작음(빠르게 성장 중).
`
                    },
                    {
                        id: 'ssr-nextjs',
                        title: 'SSR & Next.js',
                        description: 'CSR vs SSR vs SSG, 그리고 React Server Components (RSC).',
                        content: `
### 1. 렌더링 패턴
- **CSR (Client-Side Rendering)**: 빈 HTML + JS 다운로드. 상호작용 좋음, SEO 불리.
- **SSR (Server-Side Rendering)**: 요청마다 서버에서 HTML 생성. SEO 좋음, 초기 로딩(TTFB) 느릴 수 있음.
- **SSG (Static Site Generation)**: 빌드 시점에 HTML 생성. 성능 최상, 정적 데이터에 적합.

### 2. React Server Components (RSC)
- 컴포넌트가 **서버에서만** 실행됨. 클라이언트 번들 사이즈 0.
- DB나 파일시스템 직접 접근 가능.
- **Hydration**: 초기 HTML 로드 후 클라이언트가 상호작용 권한을 넘겨받음.
`
                    }
                ]
            },
            {
                id: 'app',
                title: '앱',
                topics: [
                    {
                        id: 'cross-platform',
                        title: '크로스 플랫폼 (Flutter vs React Native)',
                        description: '렌더링 엔진 차이(Skia vs Bridge/JSI)와 성능 비교.',
                        content: `
### 1. Flutter
- **엔진**: C++로 작성된 **Skia** 엔진이 화면의 모든 픽셀을 직접 그림. 플랫폼 간 완벽히 동일한 UI.
- **언어**: Dart (네이티브 코드로 AOT 컴파일).
- **장점**: 일관된 UI, 고성능(60fps), 훌륭한 문서.

### 2. React Native
- **엔진**: 네이티브 플랫폼의 UI 컴포넌트를 **Bridge**(또는 JSI)를 통해 호출하여 사용.
- **언어**: JavaScript/TypeScript.
- **장점**: 네이티브 고유의 Look & Feel, 방대한 JS 생태계, 웹(React)과 코드 공유 용이.
`
                    },
                    {
                        id: 'app-lifecycle',
                        title: '앱 수명주기 & 메모리 관리',
                        description: 'Activity/Fragment 수명주기와 백그라운드 태스크 처리.',
                        content: `
### 1. 수명주기 상태
- **Foreground**: 앱이 화면에 보이고 상호작용 가능.
- **Background**: 앱이 숨겨짐(홈 버튼). OS가 메모리 부족 시 종료시킬 수 있음.
- **Suspended**: 메모리에 있지만 코드는 실행되지 않는 상태.

### 2. 메모리 누수 (Memory Leaks)
- **주요 원인**: 해제되지 않은 리스너, Context에 대한 정적 참조(Android), 순환 참조(iOS).
- **탐지**: Android Studio Profiler, Xcode Instruments, LeakCanary.
`
                    },
                    {
                        id: 'offline-first',
                        title: '오프라인 아키텍처',
                        description: '로컬 데이터베이스(SQLite, Realm)와 데이터 동기화 전략.',
                        content: `
### 1. 로컬 데이터베이스
- **SQLite**: 표준 관계형 DB. 복잡한 쿼리에 강점. (라이브러리: Room, Drift).
- **Realm / Hive**: NoSQL 객체 저장소. 객체 그래프 처리가 빠르고 직관적.

### 2. 동기화 전략
- **Optimistic UI**: UI를 먼저 업데이트하고 백그라운드에서 서버와 동기화. 실패 시 롤백.
- **충돌 해결**: 서버 데이터와 로컬 데이터가 다를 때 "Last Write Wins" 또는 "Merge" 전략 사용.
`
                    },
                    {
                        id: 'app-deployment',
                        title: '배포 & CI/CD',
                        description: 'Fastlane을 이용한 배포 자동화와 스토어 가이드라인.',
                        content: `
### 1. Fastlane
- 스크린샷 캡처, 코드 사이닝, 스토어 업로드를 자동화하는 도구.
- **Match**: 인증서/프로비저닝 프로파일을 Git으로 관리하여 팀 간 공유.

### 2. 스토어 가이드라인
- **iOS (App Store)**: 심사가 엄격함. 동적 코드 로딩 금지 (Hot Push 제한적).
- **Android (Play Store)**: 자동화 검사 + 수동 리뷰. 단계적 배포(Phased Rollout) 지원.
`
                    }
                ]
            },
            {
                id: 'ai',
                title: '인공지능',
                topics: [
                    {
                        id: 'transformers',
                        title: 'Transformer 아키텍처',
                        description: 'GPT와 BERT의 기반이 된 "Attention Is All You Need" 혁명.',
                        content: `
### 1. 어텐션 메커니즘 (Attention Mechanism)
- **Self-Attention**: 문장 내 단어들 간의 관계(중요도)를 거리와 상관없이 파악.
- RNN/LSTM의 고질적인 "장기 의존성(Long-term dependency)" 문제 해결.
- **병렬 처리**: 순차적으로 처리하는 RNN과 달리 문장 전체를 한 번에 처리하여 대규모 학습 가능.
`
                    },
                    {
                        id: 'llm-training',
                        title: 'LLM 학습 파이프라인',
                        description: '사전 학습(Pre-training), SFT, 그리고 RLHF.',
                        content: `
### 1. 사전 학습 (Pre-training)
- 대규모 텍스트 데이터에서 다음 단어를 예측하도록 학습 (비지도 학습).
- 문법, 지식, 추론 능력을 습득.

### 2. 미세 조정 (Fine-Tuning)
- **SFT (Supervised Fine-Tuning)**: 지시사항을 따르도록 양질의 Q&A 데이터로 추가 학습.
- **RLHF (Reinforcement Learning from Human Feedback)**: 인간의 피드백(선호도)을 반영하여 모델의 출력을 교정 (유해성 감소, 도움되는 답변 유도).
`
                    },
                    {
                        id: 'vector-search',
                        title: '벡터 검색 & 임베딩',
                        description: '의미 기반 검색(Semantic Search)을 위한 수학적 표현.',
                        content: `
### 1. 임베딩 (Embeddings)
- 텍스트/이미지를 고차원 벡터(숫자 리스트)로 변환.
- **근접성**: 의미가 비슷한 개념은 벡터 공간에서 서로 가까이 위치함 (예: "왕" - "남자" + "여자" ≈ "여왕").

### 2. 검색 알고리즘
- **KNN (K-Nearest Neighbors)**: 정확하지만 데이터가 많으면 느림.
- **ANN (Approximate Nearest Neighbors)**: HNSW, IVF 등. 속도가 빠르고 정확도도 준수함. Vector DB에서 사용.
`
                    },
                    {
                        id: 'diffusion-models',
                        title: 'Diffusion 모델',
                        description: '이미지 생성 모델(Stable Diffusion, Midjourney)의 원리.',
                        content: `
### 1. Forward Process (확산 과정)
- 이미지에 점진적으로 노이즈(가우시안 노이즈)를 추가하여 완전한 노이즈로 만듦.

### 2. Reverse Process (역확산 과정)
- 신경망(U-Net)을 학습시켜 노이즈를 단계적으로 *제거*하는 방법을 익힘.
- 랜덤 노이즈에서 시작하여 텍스트 프롬프트(Conditioning)에 따라 의미 있는 이미지로 복원.
`
                    }
                ]
            }
        ]
    }
};
