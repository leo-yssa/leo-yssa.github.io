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
            }
        ]
    }
};
