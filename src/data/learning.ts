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
                    },
                    {
                        id: 'db-sharding',
                        title: 'Database Sharding',
                        description: 'Horizontal scaling technique: Pros, Cons, and Sharding Strategies.',
                        content: `
### 1. Concept
- **Definition**: Splitting a large dataset into smaller chunks (Shards) and distributing them across multiple servers.
- **Vertical Scaling (Scale Up)**: Upgrading CPU/RAM of a single server. Limited by hardware costs.
- **Horizontal Scaling (Scale Out)**: Adding more servers. Sharding enables this for databases.

### 2. Pros & Cons
- **Pros**:
    - **Unlimited Scalability**: Can handle petabytes of data by adding more nodes.
    - **Performance**: Queries are distributed, reducing load on individual servers.
- **Cons (Challenges)**:
    - **Complexity**: Application logic must determine which shard to query.
    - **No Cross-Shard Joins**: Joining tables across different shards is extremely expensive or impossible.
    - **Rebalancing**: Adding/Removing nodes requires migrating data, which is risky and complex.

### 3. Sharding Strategies (Key Selection)
- **Hash Sharding**: \`ShardID = hash(Key) % N\`. Even distribution, but adding nodes requires re-hashing everything (Consistent Hashing helps).
- **Range Sharding**: \`Shard 1: ID 1~1000\`, \`Shard 2: ID 1001~2000\`. Good for range queries, but can create **Hotspots** (e.g., recent data all going to one shard).
- **Directory Sharding**: A lookup table maps keys to shards. Flexible but the lookup table becomes a single point of failure.

### 4. Sharding vs Partitioning
- **Partitioning**: Breaking a table into smaller chunks within a **single database instance** (e.g., MySQL Partitioning).
    - **Goal**: Manageability and query performance (Pruning).
    - **Scope**: Single Server.
- **Sharding**: Partitioning across **multiple database instances**.
    - **Goal**: Horizontal Scaling (Storage & Compute).
    - **Scope**: Multi-Server (Cluster).
`
                    },
                    {
                        id: 'db-partitioning',
                        title: 'Database Partitioning',
                        description: 'Splitting tables within a single instance: Types and Pruning optimization.',
                        content: `
### 1. Concept
- **Definition**: Breaking down a large table into smaller, manageable pieces (Partitions) within a **single database instance**.
- **Goal**: Improve manageability (e.g., dropping old data) and query performance (Partition Pruning).

### 2. Partitioning Types
- **Range Partitioning**: Based on a range of values (e.g., Dates: Jan, Feb, Mar). Best for time-series data.
- **List Partitioning**: Based on a specific list of values (e.g., Country: 'KR', 'US', 'JP').
- **Hash Partitioning**: Based on a hash of a key. Ensures even distribution but no logical grouping.
- **Composite Partitioning**: Combining methods (e.g., Range first, then Hash).

### 3. Pros & Cons
- **Pros**:
    - **Partition Pruning**: The optimizer skips scanning partitions that don't match the query \`WHERE\` clause.
    - **Manageability**: Can drop an entire partition instantly (much faster than \`DELETE FROM table WHERE date < ...\`).
- **Cons**:
    - **Key Limitation**: Partition key must be part of the Primary Key / Unique Keys.
    - **Complexity**: Global indexes vs Local indexes management.
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
                    },
                    {
                        id: 'pos-migration',
                        title: 'Architecture Migration (2-Tier to 3-Tier)',
                        description: 'Transitioning a Swing desktop app to a modern Spring Boot REST API.',
                        content: `
### 1. The Challenge (2-Tier Architecture)
- **Legacy Structure**: The original Java Swing POS system connected directly to the MySQL database (Thick Client).
- **Issues**:
  - **Security**: Database credentials had to be embedded in the desktop client.
  - **Maintainability**: Any business logic change required updating the client application everywhere.
  - **Scalability**: Connection pooling and handling concurrent requests directly from numerous clients is inefficient.

### 2. The Solution (3-Tier Architecture)
- **Modern Structure**: Client (Swing or Web) -> API Server (Spring Boot) -> Database (MySQL).
- **Benefits**:
  - The DB is hidden behind the API firewall.
  - Business logic is centralized in the API, allowing clients to be updated independently.
`
                    },
                    {
                        id: 'pos-spring-data',
                        title: 'Spring Data JPA & JDBC Hybrid',
                        description: 'Using both ORM and native JDBC in a single Spring Boot application.',
                        content: `
### 1. JPA (Java Persistence API)
- Leveraged via \`spring-boot-starter-data-jpa\` for standard CRUD operations and object-relational mapping (ORM).
- Excellent for rapid development, managing entity relationships, and minimizing boilerplate SQL.

### 2. JDBC Template
- Leveraged via \`spring-boot-starter-jdbc\` alongside JPA.
- Useful for complex native queries, bulk inserts/updates (which JPA handles poorly), or migrating legacy raw JDBC code incrementally without rewriting everything to JPA entities immediately.
`
                    },
                    {
                        id: 'pos-security',
                        title: 'Lightweight Spring Security Crypto',
                        description: 'Using Spring Crypto without the full Security Filter Chain.',
                        content: `
### 1. Secure Password Hashing
- Included \`spring-security-crypto\` dependency instead of the full \`spring-boot-starter-security\`.
- This provides access to \`BCryptPasswordEncoder\` for securely hashing user passwords before storing them in the DB.

### 2. Why Not Full Security?
- In simpler custom authentication flows (like a basic \`/api/auth/login\` endpoint issuing a custom token), enabling the full auto-configured Security Filter Chain can add unnecessary complexity and strict defaults that must be overridden.
- Using just the crypto module keeps the application lightweight while maintaining essential security practices.
`
                    },
                    {
                        id: 'eai-mci',
                        title: 'EAI & MCI Integration Patterns',
                        description: 'Architecting system integration for large-scale enterprise environments.',
                        content: `
### 1. EAI (Enterprise Application Integration)
EAI is the middleware technology used to integrate independent applications within an organization. It allows data flow between siloed systems (e.g., CRM, ERP, Legacy DB) without modifying them.
- **Hub-and-Spoke**: A central hub manages all integrations, reducing the "spaghetti" complexity of point-to-point connections.
- **Message Broker**: Uses asynchronous messaging (e.g., MQ) to ensure reliable delivery even if a system is temporarily offline.

### 2. MCI (Multi-Channel Integration)
MCI is the layer that manages communication between internal backend systems and various external channels (Mobile, Web, ARS, Open API).
- **Single Point of Contact**: Provides a unified interface for all channels, simplifying authentication and protocol conversion.
- **Protocol Conversion**: Converts different data formats (XML, JSON, Fixed-length) between the backend and diverse clients.

### 3. Key Benefits in Finance
In large-scale financial projects (like CRM/Campaign systems), EAI/MCI ensure:
- **Loose Coupling**: Changes in one system don't break others.
- **Scalability**: High-traffic channel requests are throttled or queued before hitting core legacy systems.
- **Reliability**: Transactional integrity across distributed systems can be monitored centrally.
`
                    },
                    {
                        id: 'jvm-performance-tuning',
                        title: 'JVM Performance & Memory Management',
                        description: 'Optimizing Java applications for high-throughput and low-latency environments.',
                        content: `
### 1. JVM Memory Model
Understanding the Heap (Young/Old Generation) and Metaspace is crucial for large-scale systems.
- **Tuning Flags**: Setting \`-Xms\` and \`-Xmx\` to the same value to avoid heap resizing overhead.
- **Direct Memory**: Using \`-XX:MaxDirectMemorySize\` for high-performance I/O (like Netty or Kafka clients) to bypass heap GC.

### 2. Garbage Collection (GC) Strategies
- **G1 GC**: The standard for most modern large-scale applications; balances throughput and pause times.
- **ZGC / Shenandoah**: Ultra-low latency collectors for applications requiring sub-millisecond pauses.

### 3. Monitoring & Diagnostics
- **JFR (JDK Flight Recorder)**: Low-overhead profiling to solve production issues.
- **Thread Dumps & Heap Dumps**: Essential for diagnosing deadlocks and memory leaks in distributed environments.
`
                    },
                    {
                        id: 'resiliency-patterns',
                        title: 'Microservices Resiliency (Circuit Breaker)',
                        description: 'Ensuring system stability in highly distributed environments like eBay.',
                        content: `
### 1. The Cascading Failure Problem
In a microservices architecture, if one service (e.g., Payment) becomes slow, it can tie up threads in calling services (e.g., Order), eventually bringing down the entire system.

### 2. Circuit Breaker Pattern
- **Closed**: Requests flow normally.
- **Open**: When failure threshold is reached, requests fail fast immediately to protect the system.
- **Half-Open**: Periodically allows a few requests to check if the downstream service has recovered.

### 3. Implementation (Resilience4j / Spring Cloud)
- **Fallback**: Providing a default or cached response when the circuit is open.
- **Bulkhead**: Isolating resources (thread pools) so that a failure in one area doesn't exhaust the entire server's resources.
`
                    },
                    {
                        id: 'keycloak-iam',
                        title: 'Keycloak Identity & Access Management',
                        description: 'Choosing Keycloak for centralized authentication and its architectural benefits.',
                        content: `
### 1. Why Keycloak?
Managing authentication and authorization manually is error-prone and complex. Keycloak is an open-source solution that provides:
- **SSO (Single Sign-On)**: Users authenticate once and access multiple independent applications.
- **Identity Brokering**: Easy integration with social logins (Google, Kakao) or enterprise identity providers (LDAP, Active Directory).
- **Standard Protocol Support**: Native implementation of OIDC (OpenID Connect), OAuth 2.0, and SAML 2.0.
- **Security by Default**: Built-in 2FA/MFA, password policies, and brute-force protection.
- **Offloading Responsibility**: The application logic stays focused on business features while Keycloak handles security complexity.

### 2. Architecture: Resource Server & Client
In a modern microservices or decoupled architecture:
- **Identity Provider (Keycloak)**: Handles the UI for login, issues \`access_token\` and \`refresh_token\`, and provides a JWKS endpoint with public keys.
- **Resource Server (NestJS/Spring)**: Does not store passwords. It validates the incoming JWT using the public key from Keycloak.
- **Client (Web/App)**: Redirects users to Keycloak for authentication and attaches the token to API requests.

### 3. JWT Validation & Security
Instead of calling Keycloak on every request (Introspection), Resource Servers can validate tokens offline using **JWKS (JSON Web Key Set)**. This reduces latency and ensures the server only processes requests with a valid signature from the trusted issuer.
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
                    },
                    {
                        id: 'proxy-patterns',
                        title: 'Proxy Patterns Comparison',
                        description: 'Comparison of Transparent, UUPS, and Beacon proxy patterns for smart contract upgradeability.',
                        content: `
### 1. Transparent Proxy Pattern
The Transparent Proxy pattern separates admin logic and user logic by checking the caller's address. If the caller is the proxy admin, the proxy resolves admin functions (like \`upgradeTo\`). If the caller is any other address, the proxy delegates the call to the implementation contract.

**Pros:**
- **Standardized:** It has been the most common proxy pattern for a long time.
- **Fail-safe:** The proxy contract itself contains the upgrade logic, meaning even if a buggy implementation is deployed, the admin can still upgrade it.

**Cons:**
- **High Deployment Cost:** The proxy contract itself is relatively large and expensive to deploy.
- **High Execution Cost:** Every user interaction incurs an additional \`SLOAD\` operation to check the admin address, increasing gas costs.
- **ProxyAdmin Contract:** Requires a separate \`ProxyAdmin\` contract to manage all transparent proxies securely.

### 2. UUPS (Universal Upgradeable Proxy Standard) Pattern
Proposed in EIP-1822, UUPS places the upgrade logic inside the **Implementation** contract instead of the proxy itself. The Proxy is solely responsible for routing delegate-calls.

**Pros:**
- **Cheaper Deployment:** The proxy is a minimal EIP-1967 proxy, making deployment significantly cheaper.
- **Lower Execution Cost:** Since the proxy doesn't need to check whether the caller is an admin on every call, the gas overhead per transaction is significantly reduced.
- **Flexibility:** Developers can customize the upgrade mechanism within the implementation's \`_authorizeUpgrade\` function.

**Cons:**
- **Risk of Bricking:** If an implementation is deployed without the upgrade logic or with a bug in \`_authorizeUpgrade\`, the proxy can be permanently "bricked".
- **Implementation Complexity:** Developers must inherit \`UUPSUpgradeable\` and override \`_authorizeUpgrade\`.

### 3. Beacon Proxy Pattern
Introduces a third component: the **Beacon** contract. The Beacon holds the address of the current implementation. Proxies query the Beacon on every call.

**Pros:**
- **Mass Upgrades:** When the administrator updates the implementation address inside the Beacon, **all** connected Beacon Proxies are simultaneously upgraded.
- **Scalability:** Highly efficient when an application needs to deploy numerous identical proxies.

**Cons:**
- **Slightly Higher Execution Cost:** The proxy must make an external call to the Beacon to fetch the implementation address, increasing gas cost.
- **Complex Architecture:** Requires deploying and managing three layers: Proxy, Beacon, and Implementation.

### Summary and Recommendations

| Feature | Transparent | UUPS | Beacon |
| :--- | :--- | :--- | :--- |
| **Upgrade Logic Location** | Proxy | Implementation | Beacon |
| **Upgrade Scope** | Single Proxy | Single Proxy | Multiple Proxies at once |
| **Deployment Gas Cost** | High | Low | Medium (Requires Beacon) |
| **Execution Overhead** | High | Low | Highest (Extra Call) |
| **Risk of Bricking Upgrade** | Low | High | Low |

1. **Use UUPS** when you need a single proxy instance that requires the cheapest gas execution and deployment costs.
2. **Use Beacon** when you need to deploy many proxy instances of the exact same contract and want the ability to upgrade all of them with a single transaction.
3. **Use Transparent Proxy** if your team strictly requires the upgrade logic to be isolated from the logic contract to prevent bricking.
`
                    },
                    {
                        id: 'vrf-reveal',
                        title: 'Chainlink VRF & NFT Reveal Pattern',
                        description: 'Using Verifiable Random Functions for fair RNG and offset-based NFT reveals.',
                        content: `
### 1. The Problem with On-Chain RNG
Using on-chain data like \`block.timestamp\` or \`block.difficulty\` for randomness is insecure because miners can manipulate these values to influence the outcome.

### 2. Chainlink VRF
Chainlink **Verifiable Random Function (VRF)** provides a provably fair and verifiable random number generator.
- **Request & Receive**: The smart contract requests randomness from Chainlink. In the next few blocks, Chainlink off-chain nodes generate the number with a cryptographic proof and call back the contract via \`fulfillRandomWords\`.
- **Use Cases**: Lottery, gaming, and fair NFT generation.

### 3. NFT Reveal Pattern (Offset-based)
Instead of assigning a random URI to each minted NFT individually (which is gas expensive), a global **starting index (offset)** is randomly generated *after* the sale ends.
- **Mechanism**: The \`tokenURI\` function calculates the actual metadata ID using a modulo operation: \`(tokenId + offset) % maxSupply\`.
- **Fairness**: Snipping is prevented because nobody knows which \`tokenId\` will correspond to the rarest metadata until the \`offset\` is set via VRF.
`
                    },
                    {
                        id: 'merkle-allowlist',
                        title: 'Merkle Tree Allowlist (Airdrop)',
                        description: 'A scalable, gas-efficient way to verify a large set of addresses for presales.',
                        content: `
### 1. The Problem with Mapping
Storing thousands of allowlisted addresses in a Solidity \`mapping(address => bool)\` is extremely expensive due to high storage gas costs.

### 2. The Merkle Tree Solution
A **Merkle Tree** allows you to verify that an address exists in a large dataset by only storing a single 32-byte hash (the **Merkle Root**) on-chain.
- **Off-chain**: The tree is constructed using all allowlisted addresses. Only the Root Hash is saved to the smart contract.
- **On-chain Verification**: Users provide a **Merkle Proof** when minting. The contract hashes the user's address with the proof to see if it matches the Root Hash.

### 3. Pros and Cons
- **Pros**: Gas costs for verification are mostly constant, regardless of how many addresses are on the list (from 10 to 1,000,000+).
- **Cons**: Users must query a backend or IPFS to get their unique Merkle Proof before calling the mint function.
`
                    },
                    {
                        id: 'hts-hedera',
                        title: 'Hedera Token Service (HTS) Integration',
                        description: 'Using Hedera precompiled contracts for native token operations on EVM.',
                        content: `
### 1. Concept
Hedera Hashgraph provides the **Hedera Token Service (HTS)**, which allows for the creation and management of native tokens (Fungible and Non-Fungible) with high performance and low fees. When using Solidity on Hedera, you interact with HTS through **Precompiled Contracts**.

### 2. Standard ERC-721 vs. HTS
- **Standard ERC-721**: Minting logic is handled within the smart contract state. Each mint increases the contract's storage usage.
- **HTS (Native)**: The smart contract calls a system-level precompile (\`HederaTokenService.sol\`). The actual token state is managed by the Hedera network layer, not the EVM storage, making it significantly faster and cheaper.

### 3. Key Patterns
- **Token Keys**: HTS uses specific keys (Admin, Supply, Freeze, Wipe) to manage permissions. These can be assigned to a smart contract ID for decentralized control.
- **Auto-Renew**: Native support for token expiration and auto-renewal using a designated account/contract.
- **Precompile Integration**:
\`\`\`solidity
(int responseCode, address createdToken) = HederaTokenService.createNonFungibleToken(token);
require(responseCode == HederaResponseCodes.SUCCESS, "Failed to create NFT");
\`\`\`
`
                    },
                    {
                        id: 'zk-nullifier',
                        title: 'ZK-Nullifier Privacy Pattern',
                        description: 'Implementing "Spent" state verification without revealing identity using Nullifiers and commitments.',
                        content: `
### 1. Problem: Privacy in Public Ledgers
In a standard blockchain transaction, if you prove you own a certain "ticket", that proof itself often reveals which ticket you own, breaking anonymity.

### 2. Commitment & Nullifier Scheme
This pattern, popularized by **Tornado Cash**, allows for "Zero-Knowledge" spending:
- **Commitment**: A secret (random number + nullifier) hashed and stored in a Merkle Tree.
- **Nullifier**: A unique derived value that is revealed when the commitment is "spent". 
- **ZK-Proof**: Proves that "I know a secret whose commitment is in the tree, and this nullifier corresponds to that secret," without revealing which commitment it is.

### 3. Merkle Tree with History
The contract maintains a Merkle Tree of all commitments. To prevent double-spending, the contract stores a mapping of used nullifiers. Once a nullifier is revealed and verified, it is marked as used, and the corresponding "secret" cannot be used again, even though the observer doesn't know which one it was.
`
                    },
                    {
                        id: 'tx-management',
                        title: 'Transaction & Gas Management (RBF)',
                        description: 'Handling pending transactions and gas price spikes in backend services.',
                        content: `
### 1. Replace-By-Fee (RBF)
When a transaction is stuck in the mempool due to low gas fees, you can send a new transaction with the **same nonce** but higher gas fees (at least 10% higher is the standard requirement). The network will prioritize the higher fee version, effectively "canceling" or "speeding up" the original.

### 2. Nonce Management
Backend services must track nonces carefully.
- **Local Tracking**: Assigning nonces in memory to allow concurrent transaction sending without waiting for inclusion.
- **Recovery**: Querying \`getTransactionCount\` (pending) from the node if the local state goes out of sync.

### 3. Implementation Pattern (Ethers.js)
\`\`\`typescript
export function increaseGas(percent: number, transaction: TransactionRequest): TransactionRequest {
  const mul = (v: bigint | undefined) =>
    v === undefined ? undefined : (v * BigInt(100 + percent)) / BigInt(100);
  return {
    ...transaction,
    maxPriorityFeePerGas: mul(transaction.maxPriorityFeePerGas),
    maxFeePerGas: mul(transaction.maxFeePerGas),
  };
}
\`\`\`
`
                    }
                ]
            },
            {
                id: 'frontend',
                title: 'Frontend Development',
                topics: [
                    {
                        id: 'java-swing',
                        title: 'Java Swing',
                        description: 'Java GUI toolkit for building desktop applications.',
                        content: `
### 1. Concept
                    - ** Java Swing **: A part of Java Foundation Classes(JFC), used to create window - based applications.It is built on top of AWT(Abstract Window Toolkit) API and entirely written in Java.
- ** Lightweight **: Unlike AWT components, Swing components are platform - independent and lightweight.

### 2. Key Features
                    - ** Pluggable Look and Feel(PLAF) **: Allows the application to look like a native Windows, Mac, or Linux app, or use a custom skin(e.g., Metal, Nimbus) dynamically.
- ** MVC Architecture **: Separates the data(Model), the UI(View), and the interaction(Controller) for better manageability.
- ** Event - Driven Programming**: Utilizes the \`Listener\` pattern (like \`ActionListener\`) to handle user interactions such as button clicks and key presses.

### 3. Core Components & Layouts
- **Containers**: \`JFrame\` (main window), \`JPanel\` (sub-container to group components).
- **Controls**: \`JButton\`, \`JLabel\`, \`JTextField\`, \`JTable\`.
- **Layout Managers**: Dictate how components are arranged inside a container. Examples include \`BorderLayout\` (N/S/E/W/Center), \`FlowLayout\` (left to right), and \`GridLayout\` (matrix).
`
                    },
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
                        id: 'local-ai-execution',
                        title: 'Local AI Execution (Ollama, LM Studio)',
                        description: 'Running LLMs on your own hardware using ease-of-use tools.',
                        content: `
### 1. Why Local AI?
- **Privacy**: Data never leaves your machine. Essential for sensitive documents.
- **Cost**: No API fees. One-time hardware cost (GPU/RAM) vs recurring token costs.
- **Offline**: Works without internet connection.

### 2. Tools
- **Ollama**: CLI-based. Easiest way to run open-source models (Llama 3, Mistral, Gemma) on Mac/Linux/Windows.
    - \`brew install ollama\` -> \`ollama run llama3\`.
- **LM Studio**: GUI-based. Great for discovering and testing different quantized models (GGUF format) from Hugging Face.
- **Hugging Face Transformers**: For developers. Load models directly in Python code for fine-tuning or integration.

### 3. Requirements
- **VRAM (Video RAM)**: The most critical factor. 7B models need ~4-6GB VRAM (Quantized). 70B models need ~24-48GB.
- **RAM**: System RAM is used if VRAM is insufficient (slower fallback). Apple Silicon (M1/M2/M3) Unified Memory is highly proficient for this.
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
            },
            {
                id: 'algorithm',
                title: 'Algorithm',
                topics: [
                    {
                        id: 'huffman-coding',
                        title: 'Huffman Coding & Data Compression',
                        description: 'Understanding lossless data compression through a custom Huffman encoder/decoder implementation.',
                        content: `
### 1. Concept
**Huffman Coding**: A lossless data compression algorithm. The basic idea is to assign variable-length codes to input characters, with lengths based on the frequencies of corresponding characters. The most frequent character gets the smallest code and the least frequent character gets the largest code.

### 2. Implementation Details (Custom Format)
In this toy project implementation, a **canonical Huffman** coding approach is used with a fixed **big-endian** \`.enc\` file format.

#### File Header Format
1. \`bytes[4]\`: Magic Number (\`"HUF1"\`)
2. \`uint8\`: Version (\`1\`)
3. \`uint64\`: \`original_size\` (Total uncompressed bytes)
4. \`uint16\`: \`sym_count\` (Number of entries in the code table, 0-256)
5. **Code Table Entries** (\`sym_count\` repetitions):
   - \`uint8\`: \`symbol\` (0-255)
   - \`uint8\`: \`code_len\` (1-64 bit length)
6. **Bitstream**: Packed bits starting from MSB (0x80).

### 3. Canonical Huffman Rules
To avoid storing the actual bit sequences in the file header, the decoder reconstructs the tree using the following canonical rules:
1. Sort entries by \`(code_len, symbol)\` in ascending order.
2. Starting from the shortest length, assign codes from \`0\`, left-shifting as the length increases.
3. The decoder uses this exact deterministic rule to rebuild the code table.

### 4. Limitations
- Code lengths are artificially restricted to a maximum of 64 bits. Highly skewed distributions that require longer paths will fail.
- Even for files containing only a single repeated byte, a 1-bit code is assigned to avoid an empty tree.
- No integrity checks (like CRC) are currently implemented, so corrupted files will result in decoding errors.
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
                    },
                    {
                        id: 'db-sharding',
                        title: 'DB 샤딩(Sharding)',
                        description: '수평적 확장의 개념, 장단점, 그리고 샤딩 전략.',
                        content: `
### 1. 개념
- **정의**: 대용량 데이터를 작은 단위(Shard)로 나누어 여러 서버에 분산 저장하는 기술.
- **수직적 확장(Scale Up)**: 단일 서버의 CPU/RAM 업그레이드. 하드웨어의 물리적 한계 존재.
- **수평적 확장(Scale Out)**: 서버를 여러 대로 늘림. 데이터베이스는 샤딩을 통해 수평 확장을 구현.

### 2. 장단점 (Pros & Cons)
- **장점 (Pros)**:
    - **무제한 확장성**: 노드를 계속 추가하여 페타바이트급 데이터 처리 가능.
    - **성능 향상**: 쿼리가 여러 서버로 분산되므로 단일 노드의 부하 감소.
- **단점 (Cons)**:
    - **복잡성**: 애플리케이션 레벨에서 어떤 샤드에 데이터를 저장/조회할지 결정해야 함.
    - **조인(Join) 불가**: 서로 다른 샤드에 있는 테이블 간 Join은 매우 비싸거나 불가능.
    - **데이터 재할당(Rebalancing)**: 노드 추가/삭제 시 데이터 마이그레이션이 필요하며, 운영 중 수행하기 매우 까다로움.

### 3. 샤딩 전략 (Sharding Strategies)
- **Hash Sharding**: \`ShardID = hash(Key) % N\`. 데이터가 균등하게 분산되지만, 노드 수가 바뀌면 전체 데이터 재배치가 필요함 (Consistent Hashing으로 완화).
- **Range Sharding**: \`Shard 1: ID 1~1000\`, \`Shard 2: ID 1001~2000\`. 범위 조회에 유리하지만, 특정 샤드에 데이터가 몰리는 **Hotspot** 발생 가능.
- **Directory Sharding**: 별도의 조회 테이블(Lookup Table)이 키-샤드 매핑 정보를 관리. 유연하지만 조회 테이블이 단일 장애 지점(SPOF)이 될 수 있음.

### 4. 샤딩 vs 파티셔닝
- **파티셔닝 (Partitioning)**: 큰 테이블을 **단일 데이터베이스 인스턴스** 내에서 작은 단위로 나누는 것 (예: MySQL Partitioning).
    - **목적**: 데이터 관리 용이성 및 쿼리 성능 최적화 (Pruning).
    - **범위**: 단일 서버.
- **샤딩 (Sharding)**: 데이터를 **여러 데이터베이스 인스턴스**로 나누는 것.
    - **목적**: 수평적 확장 (저장 공간 및 연산 능력 증대).
    - **범위**: 멀티 서버 (클러스터).
`
                    },
                    {
                        id: 'db-partitioning',
                        title: 'DB 파티셔닝(Partitioning)',
                        description: '단일 인스턴스 내 테이블 분할 기법: 종류와 Pruning 최적화.',
                        content: `
### 1. 개념
- **정의**: 큰 테이블을 작은 단위(Partition)로 나누어 **단일 데이터베이스 인스턴스** 내에서 관리하는 기법.
- **목적**: 데이터 관리 용이성(오래된 데이터 삭제 등) 및 쿼리 성능 최적화(Partition Pruning).

### 2. 파티셔닝 종류
- **Range Partitioning**: 값의 범위를 기준 (예: 날짜별 Jan, Feb, Mar). 시계열 데이터에 최적.
- **List Partitioning**: 특정 값 목록을 기준 (예: 국가 코드 'KR', 'US', 'JP').
- **Hash Partitioning**: 해시 함수를 통해 데이터 분산. 균등하게 저장되지만 논리적 그룹화는 안 됨.
- **Composite Partitioning**: 여러 기법을 결합 (예: 날짜로 먼저 나누고, 그 안에서 해시로 나눔).

### 3. 장단점
- **장점**:
    - **Partition Pruning**: 옵티마이저가 \`WHERE\` 조건에 맞지 않는 파티션은 아예 스캔하지 않음 (성능 향상).
    - **관리 용이성**: 파티션 단위로 데이터를 즉시 삭제(\`DROP PARTITION\`) 가능 (\`DELETE\`보다 훨씬 빠름).
- **단점**:
    - **키 제약**: 파티션 키는 반드시 Primary Key / Unique Key의 일부여야 함.
    - **복잡성**: Global Index와 Local Index 관리 이슈.
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
- **Look Aside(Lazy Loading)**: 앱이 캐시 확인 -> 없으면 DB 조회 -> 캐시에 저장.
- **Write Back**: 캐시에 먼저 쓰고 -> 비동기로 DB에 반영(성능 최상, 데이터 유실 위험).
- **Redis 자료구조**:
    - **String**: 단순 키 - 값(세션, 인증 토큰).
    - **Sorted Set**: 실시간 랭킹 / 순위표.
    - **Pub / Sub**: 실시간 메시징.

### 2. 메시지 큐(Kafka vs RabbitMQ)
- **Kafka**: 로그 기반, 대용량 처리(Throughput) 중심, 데이터가 디스크에 남음. **이벤트 스트리밍**, **로그 수집**에 적합.
- **RabbitMQ**: 전통적 브로커, 복잡한 라우팅(Exchange) 가능. **작업 큐(Task Queue)**에 적합.
`
                    },
                    {
                        id: 'pos-migration',
                        title: '아키텍처 마이그레이션 (2-Tier -> 3-Tier)',
                        description: 'Swing 데스크톱 앱에서 구조를 분리해 Spring Boot REST API로 전환하는 과정.',
                        content: `
### 1. 기존의 문제점 (2-Tier 구조)
- **레거시 구조**: 과거의 Java Swing POS 앱이 직접 MySQL 데이터베이스에 연결하는 형태(Thick Client)였습니다.
- **문제점**:
  - **보안**: 데이터베이스 접속 정보(IP, ID, PW)가 클라이언트 앱 내부에 하드코딩되어 노출 위험.
  - **유지보수**: 비즈니스 로직(예: 결제 로직 변경) 수정 시 모든 클라이언트 앱을 재배포해야 함.
  - **확장성**: 여러 기기에서 직접 DB 커넥션을 맺으면 커넥션 풀 관리가 비효율적임.

### 2. 해결책 (3-Tier 구조)
- **모던 아키텍처**: 클라이언트 -> API 서버 (Spring Boot) -> 데이터베이스 (MySQL).
- **장점**:
  - DB를 API 레이어 뒤로 숨겨 직접적인 접근을 차단함.
  - 비즈니스 로직을 API 서버에 집중시켜, 로직 변경 시 서버만 업데이트하면 됨.
`
                    },
                    {
                        id: 'pos-spring-data',
                        title: 'Spring Data JPA & JDBC 하이브리드',
                        description: '하나의 Spring Boot 앱에서 ORM(JPA)과 네이티브 JDBC를 혼용하는 전략.',
                        content: `
### 1. JPA (Java Persistence API)
- \`spring-boot-starter-data-jpa\`를 통해 표준 CRUD 작업과 ORM을 처리합니다.
- 복잡한 객체 관계형 매핑 관리에 유리하며 초기 개발 속도를 비약적으로 높여줍니다.

### 2. JDBC Template
- \`spring-boot-starter-jdbc\`를 동시 포함하여 특정 상황에 대응합니다.
- 복잡한 네이티브 쿼리가 필요하거나, JPA가 취약한 대량의 Bulk Insert/Update 성능 최적화가 필요할 때 사용합니다.
- 기존 레거시의 날것(Raw) JDBC 코드를 JPA 엔티티로 완벽히 재설계하기 전에 점진적으로 마이그레이션하는 데도 유용합니다.
`
                    },
                    {
                        id: 'pos-security',
                        title: '경량화된 Spring Security Crypto',
                        description: '무거운 Security 필터 체인 없이 비밀번호 암호화(Crypto)만 활용하기.',
                        content: `
### 1. 안전한 비밀번호 암호화
- 덩치가 큰 \`spring-boot-starter-security\` 전체 대신 \`spring-security-crypto\` 모듈만 의존성에 추가합니다.
- \`BCryptPasswordEncoder\` 등 강력한 단방향 해시 함수를 이용해 유저 비밀번호를 안전하게 DB에 저장할 수 있습니다.

### 2. 왜 전체 Security를 쓰지 않았나?
- 커스텀 토큰을 발급하는 간단한 로그인 API(\`/api/auth/login\`)의 경우, 자동 구성되는 강력한 Security 필터 체인을 모두 끄거나 재정의하는 설정 오버헤드가 발생합니다.
- 불필요하게 무거워지는 것을 방지하고, 핵심적인 비밀번호 암호화 기능만 취하며 가볍고 통제하기 쉬운 서버를 유지하기 위함입니다.
`
                    },
                    {
                        id: 'eai-mci',
                        title: 'EAI & MCI 연동 패턴',
                        description: '엔터프라이즈 환경에서의 시스템 통합 아키텍처 이해.',
                        content: `
### 1. EAI (Enterprise Application Integration)
EAI는 기업 내의 서로 다른 애플리케이션(CRM, ERP, 레거시 DB 등)을 유기적으로 연결하여 데이터를 통합 관리하는 미들웨어 기술입니다. 
- **Hub-and-Spoke**: 중앙 허브를 통해 모든 시스템을 연결함으로써, 점대점(Point-to-Point) 방식의 복잡한 '스파게티 소스' 구조를 방지합니다.
- **데이터 통합**: 각 시스템의 수정 없이 데이터 포맷을 변환하고 흐름을 제어하여 비즈니스 프로세스를 효율화합니다.

### 2. MCI (Multi-Channel Integration)
MCI는 내부 시스템과 다양한 외부 채널(모바일, 웹, 콜센터, 제휴사 API 등) 사이의 접점을 통합 관리하는 계층입니다.
- **채널 통합**: 다양한 인터페이스 요청을 단일 지점에서 처리하여 인증, 로깅, 전문 변환을 표준화합니다.
- **전문 변환 (Protocol Conversion)**: 외부의 다양한 포맷(JSON, XML 등)과 내부 레거시 특유의 고정 길이(Fixed-length) 전문 등을 상호 변환합니다.

### 3. 금융권 프로젝트에서의 중요성
현대캐피탈, 르노캐피탈과 같은 대규모 금융 프로젝트에서는 EAI/MCI를 통해 다음과 같은 효과를 얻습니다.
- **시스템 간 결합도 완화 (Loose Coupling)**: 특정 시스템이 변경되어도 연동된 다른 시스템에 미치는 영향을 최소화합니다.
- **안정성 및 모니터링**: 대량의 요청이 발생할 때 큐잉(Queuing) 처리를 통해 시스템 부하를 조절하고, 전구간 트랜잭션을 추적할 수 있습니다.
`
                    },
                    {
                        id: 'jvm-performance-tuning',
                        title: 'JVM 성능 최적화 및 메모리 관리',
                        description: '고처리량(High-throughput) 환경을 위한 Java 애플리케이션 최적화.',
                        content: `
### 1. JVM 메모리 모델과 튜닝
대규모 서비스에서는 Heap(Young/Old Gen)과 Metaspace에 대한 정확한 이해가 필수적입니다.
- **메모리 할당**: \`-Xms\`와 \`-Xmx\`를 동일하게 설정하여 힙 리사이징에 따른 오버헤드를 방지합니다.
- **Direct Memory**: \`-XX:MaxDirectMemorySize\` 설정을 통해 Netty나 Kafka 클라이언트와 같은 고성능 I/O 작업 시 힙 영역을 거치지 않는 메모리 사용을 최적화합니다.

### 2. 가비지 컬렉터(GC) 선택 전략
- **G1 GC**: 대부분의 현대적인 대규모 앱에서 표준으로 사용되며, 처리량과 일시 정지 시간의 균형을 맞춥니다.
- **ZGC / Shenandoah**: 초저지연이 필요한 경우 사용하며, 힙 크기와 상관없이 밀리초 단위의 정지 시간을 보장합니다.

### 3. 진단 및 모니터링
- **JFR (JDK Flight Recorder)**: 운영 환경에서 낮은 오버헤드로 성능 데이터를 수집하여 문제를 추적합니다.
- **Thread/Heap Dump 분석**: 분산 환경에서 발생하는 데드락이나 메모리 누수를 진단하는 필수 역량입니다.
`
                    },
                    {
                        id: 'resiliency-patterns',
                        title: '마이크로서비스 회복 탄력성 (Circuit Breaker)',
                        description: 'eBay와 같은 거대 분산 시스템에서 시스템 전체 붕괴를 막는 핵심 패턴.',
                        content: `
### 1. 연쇄 장애 (Cascading Failure)의 위험
마이크로서비스 구조에서 특정 서비스(예: 결제)가 느려지면, 이를 호출하는 서비스(예: 주문)의 스레드가 점유되어 결국 시스템 전체가 마비될 수 있습니다.

### 2. 서킷 브레이커 (Circuit Breaker) 패턴
- **Closed (닫힘)**: 정상적인 요청 처리.
- **Open (열림)**: 장애 임계치 도달 시 요청을 즉시 차단하여 시스템을 보호하고 빠른 실패(Fail-fast)를 유도합니다.
- **Half-Open (반열림)**: 하위 서비스의 정상화 여부를 주기적으로 확인하여 자동 복구합니다.

### 3. 구현 및 전략 (Resilience4j 등)
- **Fallback**: 서킷이 열렸을 때 기본값이나 캐시된 데이터를 응답하여 사용자 경험을 유지합니다.
- **Bulkhead**: 리소스(스레드 풀 등)를 격리하여 한 곳의 장애가 서버 전체의 자원을 고갈시키지 않도록 방어합니다.
`
                    },
                    {
                        id: 'keycloak-iam',
                        title: 'Keycloak을 이용한 인증 및 인가 관리',
                        description: '중앙 집중식 인증 서버로 Keycloak을 선택하는 이유와 아키텍처적 이점.',
                        content: `
### 1. 왜 Keycloak인가?
직접 인증/인가 로직(회원가입, 로그인, 비밀번호 찾기 등)을 구현하는 것은 보안 위험이 크고 복잡합니다. Keycloak은 다음과 같은 강력한 이점을 제공합니다:
- **중앙 집중식 관리 (SSO)**: 한 번의 로그인으로 연동된 모든 앱에 접근할 수 있는 Single Sign-On을 지원합니다.
- **소셜 로그인 & 연동 (Identity Brokering)**: 카카오, 구글 등 소셜 계정이나 기업용 LDAP/AD와 손쉽게 연동할 수 있습니다.
- **표준 프로토콜 준수**: OIDC(OpenID Connect), OAuth 2.0, SAML 2.0 등 업계 표준 프로토콜을 완벽하게 지원합니다.
- **검증된 보안**: MFA(2단계 인증), 비밀번호 정책, 무차별 대입 공격(Brute-force) 방지 기능이 내장되어 있습니다.
- **개발 생산성**: 서비스 서버(NestJS 등)는 복잡한 인증 로직 대신 비즈니스 로직에만 집중할 수 있습니다.

### 2. 리소스 서버와 클라이언트 아키텍처
Keycloak을 도입하면 다음과 같은 구조로 역할이 분리됩니다:
- **인증 서버 (Keycloak)**: 로그인 UI 제공, 토큰(Access/Refresh) 발급, 서명 검증을 위한 공개키(JWKS) 제공.
- **리소스 서버 (NestJS 앱)**: 유저의 비밀번호를 알 필요가 없습니다. 전달받은 JWT가 Keycloak이 발급한 정상적인 토큰인지만 공개키로 검증합니다.
- **클라이언트 (Web/App)**: 유저를 Keycloak 페이지로 리다이렉트하여 인증을 유도하고, 발급받은 토큰을 API 요청 헤더에 담아 보냅니다.

### 3. JWKS를 이용한 효율적인 검증
서버가 매 요청마다 Keycloak에 "이 토큰이 맞나?"라고 물어볼 필요가 없습니다. Keycloak의 **JWKS** 엔드포인트에서 공개키를 한 번 가져와 로컬에서 직접 서명을 검증하므로, 네트워크 지연 없이 빠르고 안전한 인증 처리가 가능합니다.
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
                    },
                    {
                        id: 'proxy-patterns',
                        title: '프록시 패턴 비교 (Proxy Patterns)',
                        description: 'Transparent Proxy, UUPS, Beacon Proxy 패턴의 아키텍처 및 장단점 비교.',
                        content: `
### 1. Transparent Proxy Pattern
관리자 로직과 사용자 로직을 호출자의 주소로 구분하는 패턴입니다. 호출자가 프록시 관리자인 경우 관리자 함수(예: \`upgradeTo\`)를 실행하고, 그 외의 경우 구현 컨트랙트로 호출을 위임(delegatecall)합니다.
- **장점**: 오랫동안 사용된 표준 패턴이며, 구조적으로 안전함(Fail-safe). 프록시 자체에 업그레이드 로직이 있어 구현 컨트랙트에 버그가 발생해도 관리자가 업그레이드 가능.
- **단점**: 프록시 배포 가스비와 매 트랜잭션마다 수행되는 관리자 주소 확인 연산(\`SLOAD\`)으로 인해 실행 가스비가 높음. 부가적인 \`ProxyAdmin\` 컨트랙트 관리가 필요함.

### 2. UUPS (Universal Upgradeable Proxy Standard) Pattern
EIP-1822 표준 제안. 업그레이드 로직을 프록시가 아닌 **구현 컨트랙트(Implementation)** 내부에 배치합니다. 프록시는 단순히 delegatecall 라우팅만 수행합니다.
- **장점**: 프록시 컨트랙트가 가벼워 배포 비용이 저렴하며, 매번 관리자를 확인하지 않아 트랜잭션당 가스비 오버헤드가 낮음. 개발자가 업그레이드 제어 로직을 유연하게 커스텀 가능.
- **단점**: 업그레이드 로직 작성에 오류가 있거나 로직이 빠진 구현 컨트랙트가 배포될 경우 프록시가 영구적으로 업그레이드 불가능한 상태("Bricking")가 될 위험이 큼.

### 3. Beacon Proxy Pattern
프록시와 구현 컨트랙트 사이에 **Beacon** 컨트랙트를 도입합니다. 프록시들은 직접 구현체의 주소를 저장하지 않고 매 트랜잭션마다 Beacon에 구현체 주소를 질의합니다.
- **장점**: 중앙의 Beacon 컨트랙트 내부 주소만 변경하면, 연결된 **수많은 프록시(수천 개의 지갑 등)가 한 번의 트랜잭션으로 동시 업그레이드** 됨. 뛰어난 확장성.
- **단점**: 매번 Beacon을 외부 호출(External Call)하여 주소를 조회하므로 UUPS보다 실행 가스비가 소폭 증가함. Proxy-Beacon-Implementation의 3계층으로 구조가 복잡함.

### 요약 및 권장 사항

| 구분 | Transparent | UUPS | Beacon |
| :--- | :--- | :--- | :--- |
| **업그레이드 로직 위치** | Proxy | Implementation | Beacon |
| **업그레이드 범위** | 단일 Proxy | 단일 Proxy | 다수 Proxy 동시 |
| **배포 가스비** | 높음 | 낮음 | 중간 (Beacon 필요) |
| **실행 가스비** | 높음 | 낮음 | 가장 높음 (추가 호출) |
| **Bricking 위험** | 낮음 | 높음 | 낮음 |

1. **UUPS 권장**: 가장 저렴한 배포 및 실행 가스비로 단일 프록시를 운영할 때 (현재 OpenZeppelin 표준 권고).
2. **Beacon 권장**: 동일한 스마트 컨트랙트를 여러 개(Mass) 배포하고, 단일 트랜잭션으로 동시에 업그레이드해야 하는 서비스 아키텍처일 때.
3. **Transparent 권장**: 가스 비용을 감수하더라도, 개발자 실수로 인한 스마트 컨트랙트 영구 결함(Bricking)을 원천적으로 막아야 하는 강력한 격리가 필요할 때.
`
                    },
                    {
                        id: 'vrf-reveal',
                        title: 'Chainlink VRF & NFT Reveal 패턴',
                        description: '검증 가능한 난수 생성기(VRF)를 활용해 공정하게 NFT 메타데이터를 리빌하는 방법.',
                        content: `
### 1. 온체인 난수 생성의 문제점
\`block.timestamp\`나 \`block.difficulty\` 같은 온체인 데이터를 난수로 사용하면, 채굴자(또는 검증자)가 자신에게 유리한 방향으로 블록 해시를 조작할 위험이 있습니다.

### 2. Chainlink VRF (Verifiable Random Function)
Chainlink VRF는 증명 가능하고 조작 불가능한 온체인 난수를 제공합니다.
- **Request & Receive 구조**: 스마트 컨트랙트가 난수를 요청하면, 오프체인 오라클 노드가 암호학적 증명과 함께 난수를 생성하여 \`fulfillRandomWords\` 콜백 함수로 결과 값을 전달해 줍니다.
- **활용**: 복권(Lottery), 확률형 게임, 공정한 NFT 민팅.

### 3. 오프셋 기반 NFT Reveal 패턴
모든 NFT를 개별적으로 랜덤한 URI와 매핑하는 대신(가스비 낭비), 판매가 종료된 후 **단 하나의 글로벌 오프셋(Offset)** 값을 VRF로 결정하여 전체 메타데이터를 밀어내는(Shift) 방식입니다.
- **원리**: \`tokenURI\` 호출 시 개별 토큰 ID에 오프셋을 더하고 모듈러(%) 연산을 수행해 메타데이터 ID를 도출합니다. 예: \`(tokenId + offset) % maxSupply\`.
- **장점**: 어떤 \`tokenId\`가 레어리티가 높은 메타데이터와 매칭될지 아무도 알 수 없어 예측 민팅(Snipping)을 방지할 수 있으며, 가스비가 매우 효율적입니다.
`
                    },
                    {
                        id: 'merkle-allowlist',
                        title: '머클 트리 (Merkle Tree) Allowlist',
                        description: '대규모 화이트리스트나 에어드랍을 가스비 걱정 없이 구현하는 확장성 높은 패턴.',
                        content: `
### 1. Mapping의 한계
수만 명의 화이트리스트 주소를 솔리디티의 \`mapping(address => bool)\`에 직접 저장(Store)하는 것은 막대한 가스비용(Deploy & Execution)을 초래합니다.

### 2. 머클 트리(Merkle Tree) 해결책
**머클 트리** 구조를 사용하면 아무리 많은 주소 목록이라도 32바이트 길이의 단일 해시 값(**머클 루트, Merkle Root**) 하나만 온체인에 저장하여 검증할 수 있습니다.
- **오프체인 작업**: 백엔드에서 화이트리스트 주소들을 모아 리프 노드(Leaf Node)로 삼고 트리를 구성해 머클 루트 값을 컨트랙트에 세팅합니다.
- **온체인 검증**: 유저가 민팅할 때 자신만의 **머클 프루프(Merkle Proof)** 배열을 함께 제출합니다. 컨트랙트는 유저의 주소와 프루프 값을 해싱하여 저장된 Root 해시와 일치하는지 단 몇 번의 연산만으로 검증합니다.

### 3. 장단점
- **장점**: 대상자가 파편화되어 수백만 명으로 늘어나도 컨트랙트 검증 비용은 거의 변함없어 매우 경제적입니다.
- **단점**: 유저(클라이언트)가 트랜잭션을 발생시키기 전에 자신의 주소에 맞는 증명(Proof) 데이터를 백엔드 API 등을 통해 미리 가져와야 합니다.
`
                    },
                    {
                        id: 'hts-hedera',
                        title: 'Hedera Token Service (HTS) 연동',
                        description: '헤데라 네트워크의 네이티브 토큰 기능을 EVM 상의 사전 컴파일 컨트랙트로 호출하는 방법.',
                        content: `
### 1. 개념
헤데라 해시그래프(Hedera Hashgraph)는 **HTS(Hedera Token Service)**를 통해 네트워크 레벨에서 네이티브 토큰(Fungible/Non-Fungible)을 생성하고 관리할 수 있도록 지원합니다. 솔리디티 컨트랙트에서는 **사전 컴파일된 컨트랙트(Precompiled Contract)**를 호출하여 이 기능을 사용합니다.

### 2. 표준 ERC-721 vs. HTS 방식 비교
- **표준 ERC-721**: 민팅 로직과 모든 상태가 스마트 컨트랙트 내부에 저장됩니다. 발행량이 늘어날수록 컨트랙트의 스토리지 비용이 증가합니다.
- **HTS (Native)**: 스마트 컨트랙트는 시스템 레벨의 \`HederaTokenService.sol\`을 호출하기만 합니다. 실제 토큰의 상태 관리는 헤데라 네트워크 레이어에서 처리되므로 EVM 스토리지를 사용하지 않아 속도가 매우 빠르고 수수료가 저렴합니다.

### 3. 주요 패턴 및 특징
- **Token Keys**: HTS는 관리자(Admin), 발행(Supply), 동결(Freeze), 삭제(Wipe) 등 권한별로 별도의 키를 가집니다. 이를 스마트 컨트랙트 ID로 지정하여 탈중앙화된 제어가 가능합니다.
- **Auto-Renew**: 토큰의 만료 및 자동 갱신을 네트워크 레벨에서 지원하며, 특정 계정이나 컨트랙트를 통해 비용을 자동 지불하도록 설정할 수 있습니다.
- **사전 컴파일 호출 예시**:
\`\`\`solidity
(int responseCode, address createdToken) = HederaTokenService.createNonFungibleToken(token);
require(responseCode == HederaResponseCodes.SUCCESS, "NFT 생성 실패");
\`\`\`
`
                    },
                    {
                        id: 'zk-nullifier',
                        title: 'ZK-Nullifier 프라이버시 패턴',
                        description: 'Nullifier와 Commitment 구조를 활용해 익명성을 유지하며 사용 여부를 검증하는 기법.',
                        content: `
### 1. 문제: 퍼블릭 블록체인의 프라이버시
표준적인 블록체인 트랜잭션에서는 특정 "권리(티켓 등)"를 소유하고 있음을 증명할 때, 그 증명 과정에서 내가 어떤 티켓을 가지고 있는지 노출되어 익명성이 깨지는 경우가 많습니다.

### 2. Commitment & Nullifier 방식
**토네이도 캐시(Tornado Cash)** 등에서 대중화된 이 패턴은 "영지식 사용(Zero-Knowledge Spending)"을 가능하게 합니다.
- **Commitment**: 비밀값(난수 + Nullifier)을 해싱하여 머클 트리에 저장한 데이터입니다.
- **Nullifier (무효화 값)**: 해당 Commitment가 사용될 때 공개되는 고유값입니다. 비밀값으로부터 유도되지만, 공개되기 전까지는 어떤 Commitment와 연결되는지 알 수 없습니다.
- **영지식 증명(ZK-Proof)**: "나는 머클 트리에 포함된 특정 Commitment의 비밀값을 알고 있으며, 지금 제출하는 Nullifier는 그 비밀값에 대응한다"는 사실을, **실제 어떤 Commitment인지 밝히지 않고** 증명합니다.

### 3. 이력이 포함된 머클 트리 (Merkle Tree with History)
컨트랙트는 Commitment들이 저장된 머클 트리를 관리합니다. 이중 지불(Double Spending)을 방지하기 위해 사용된 Nullifier 목록을 매핑으로 저장하며, 검증된 Nullifier가 제출되면 해당 '비밀'은 다시 사용할 수 없게 처리됩니다. 이를 통해 관찰자는 누가 사용했는지는 모르지만, 이미 사용된 권리인지는 확실히 알 수 있습니다.
`
                    },
                    {
                        id: 'tx-management',
                        title: '트랜잭션 및 가스 관리 (RBF)',
                        description: '백엔드 서비스에서 펜딩(Pending) 트랜잭션 처리와 가스비 급등에 대응하는 방법.',
                        content: `
### 1. RBF (Replace-By-Fee)
가스비가 낮아 트랜잭션이 멤풀(Mempool)에 갇혀 있을 때, **동일한 Nonce**를 사용하면서 더 높은 가스비(통상 최소 10% 이상 인상)를 책정해 새로운 트랜잭션을 보내는 기법입니다. 네트워크는 수수료가 높은 새 트랜잭션을 우선 처리하며, 기존 트랜잭션은 자연스럽게 취소(덮어쓰기)됩니다.

### 2. Nonce 관리 전략
백엔드 서비스에서는 연속적인 트랜잭션 발생 시 Nonce 관리가 매우 중요합니다.
- **로컬 트래킹**: 인메모리에서 Nonce를 관리하여 블록에 포함될 때까지 기다리지 않고 즉시 다음 트랜잭션을 보낼 수 있도록 합니다.
- **동기화 및 복구**: 로컬 상태가 어긋날 경우 노드에 \`getTransactionCount\` (Pending 포함)를 쿼리하여 Nonce를 다시 맞춥니다.

### 3. 구현 패턴 (Ethers.js 예시)
\`\`\`typescript
export function increaseGas(percent: number, transaction: TransactionRequest): TransactionRequest {
  const mul = (v: bigint | undefined) =>
    v === undefined ? undefined : (v * BigInt(100 + percent)) / BigInt(100);
  return {
    ...transaction,
    maxPriorityFeePerGas: mul(transaction.maxPriorityFeePerGas),
    maxFeePerGas: mul(transaction.maxFeePerGas),
  };
}
\`\`\`
`
                    }
                ]
            },
            {
                id: 'frontend',
                title: '프론트엔드',
                topics: [
                    {
                        id: 'java-swing',
                        title: 'Java Swing (자바 스윙)',
                        description: '데스크톱 애플리케이션 개발을 위한 Java GUI 툴킷.',
                        content: `
### 1. 개념
                - ** Java Swing **: Java Foundation Classes(JFC)의 일부로, 데스크톱 윈도우 애플리케이션을 만들기 위한 GUI 툴킷입니다.AWT(Abstract Window Toolkit)를 기반으로 작성되었습니다.
- ** 경량 컴포넌트(Lightweight) **: OS의 네이티브 UI 자원을 직접 사용하지 않고(최상위 컨테이너 제외) Java 코드로 직접 화면을 그리기 때문에, 플랫폼(OS)에 독립적입니다.

### 2. 주요 특징
                - ** Pluggable Look and Feel(PLAF) **: 소스 코드 수정 없이 윈도우, 맥, 리눅스 스타일이나 고유 스킨(Metal, Nimbus 등)으로 테마를 동적으로 변경할 수 있습니다.
- ** MVC(Model - View - Controller) 패턴 **: 내부적으로 데이터(Model)와 화면(View), 제어(Controller)를 분리하여 설계되었습니다.
- ** 이벤트 기반 프로그래밍(Event - Driven) **: 사용자의 클릭, 키보드 입력 등을 \`ActionListener\`와 같은 리스너(Listener) 패턴을 통해 비동기적으로 처리합니다.

### 3. 주요 요소 및 레이아웃
- **컨테이너**: \`JFrame\` (기본 창), \`JPanel\` (컴포넌트들을 묶는 도화지 역할).
- **기본 컴포넌트**: \`JButton\`, \`JLabel\`, \`JTextField\`, \`JTable\` 등 J로 시작하는 클래스들.
- **배치 관리자 (Layout Manager)**: 컴포넌트들의 위치와 크기를 결정합니다. \`BorderLayout\` (동서남북/중앙), \`FlowLayout\` (순서대로 나열), \`GridLayout\` (격자 형태) 등이 있습니다.
`
                    },
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
                        id: 'local-ai-execution',
                        title: '로컬 AI 실행 (Local LLM)',
                        description: 'Ollama, LM Studio 등을 활용해 내 컴퓨터에서 LLM을 구동하는 방법.',
                        content: `
### 1. 로컬 AI의 장점
- **프라이버시**: 데이터가 내 컴퓨터 밖으로 나가지 않음. 민감한 문서 처리에 필수적.
- **비용 절감**: API 사용료가 없음. 초기 하드웨어 투자(GPU/RAM) 외에 추가 비용 0.
- **오프라인 동작**: 인터넷 연결 없이도 언제 어디서나 사용 가능.

### 2. 주요 도구
- **Ollama**: CLI 기반. Mac/Linux/Windows에서 오픈소스 모델(Llama 3, Mistral, Gemma)을 가장 쉽게 실행하는 방법.
    - \`brew install ollama\` -> \`ollama run llama3\`.
- **LM Studio**: GUI 기반. Hugging Face의 다양한 양자화(Quantized) 모델(GGUF 포맷)을 테스트하기 좋음.
- **Hugging Face Transformers**: 개발자용. 파이썬 코드로 직접 모델을 로드하여 파인튜닝하거나 앱에 통합.

### 3. 하드웨어 요구사항
- **VRAM (비디오 메모리)**: 가장 중요한 요소. 7B 모델은 약 4~6GB(양자화 기준), 70B 모델은 24~48GB 필요.
- **RAM**: VRAM 부족 시 시스템 RAM을 사용하지만 속도가 느림. Apple Silicon(M1/M2/M3)의 통합 메모리(Unified Memory) 구조가 유리함.
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
            },
            {
                id: 'algorithm',
                title: '알고리즘',
                topics: [
                    {
                        id: 'huffman-coding',
                        title: '허프만 코딩 (Huffman Coding)',
                        description: '직접 구현한 허프만 인코더/디코더를 통해 알아보는 무손실 데이터 압축 기법.',
                        content: `
### 1. 개념
**허프만 코딩(Huffman Coding)**: 문자의 출현 빈도에 따라 가변 길이의 코드를 부여하는 무손실 데이터 압축 알고리즘입니다. 자주 등장하는 문자에는 짧은 비트를, 드물게 등장하는 문자에는 긴 비트를 할당하여 전체 파일 크기를 줄입니다.

### 2. 구현 상세 (커스텀 포맷)
해당 토이 프로젝트에서는 **Canonical Huffman(정규 허프만)** 트리를 사용하고, **빅엔디안(Big-endian)** 기반의 자체 \`.enc\` 포맷을 정의했습니다.

#### 파일 헤더 구조
1. \`bytes[4]\`: 매직 넘버 (\`"HUF1"\`)
2. \`uint8\`: 버전 (\`1\`)
3. \`uint64\`: \`original_size\` (원본 파일의 바이트 수)
4. \`uint16\`: \`sym_count\` (코드표에 등록된 심볼 수, 0-256)
5. **코드표 엔트리** (\`sym_count\`만큼 반복):
   - \`uint8\`: \`symbol\` (원래 바이트 값, 0-255)
   - \`uint8\`: \`code_len\` (할당된 코드의 비트 길이, 1-64)
6. **비트스트림(Bitstream)**: 패킹된 압축 데이터 (MSB부터 채움).

### 3. Canonical Huffman 규칙
압축 파일 용량을 줄이기 위해 헤더에 실제 비트 코드를 저장하지 않고, 기호와 길이만 저장한 뒤 아래 규칙으로 코드를 복원합니다:
1. \`(code_len, symbol)\` 기준으로 오름차순 정렬합니다.
2. 가장 짧은 길이의 코드에 \`0\`을 부여하고, 길이가 늘어날 때마다 길이에 맞춰 비트를 왼쪽으로 시프트(left-shift)하며 코드를 연속으로 할당합니다.
3. 디코더도 동일한 규칙을 따르기 때문에 코드표를 100% 동일하게 재구성할 수 있습니다.

### 4. 주의사항 및 한계점
- 허프만 트리의 최대 깊이(코드 길이)를 64비트로 제한했습니다. 극단적으로 불균형한 분포에서는 압축에 실패할 수 있습니다.
- 동일한 문자로만 이루어진 파일이라도 동작하도록 최소 1비트의 코드를 강제로 부여합니다.
- 복원 시 무결성 검증(CRC 등) 로직이 없어, 파일이 손상되면 오작동할 수 있습니다.
`
                    }
                ]
            }
        ]
    }
};
