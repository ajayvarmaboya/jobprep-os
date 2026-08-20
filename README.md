# JobPrep OS — Production-Quality Job Preparation Management Platform

[![Stack: Java 17 + Spring Boot 3](https://img.shields.io/badge/Backend-Java_17_%2B_Spring_Boot_3-007396?style=for-the-badge&logo=java)](https://spring.io/projects/spring-boot)
[![Stack: React 18 + Tailwind CSS](https://img.shields.io/badge/Frontend-React_18_%2B_Tailwind_CSS-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Database: PostgreSQL / RDS](https://img.shields.io/badge/Database-PostgreSQL_%2F_RDS-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org)
[![Cloud: AWS Ecosystem](https://img.shields.io/badge/AWS-S3_%7C_Cognito_%7C_Bedrock_%7C_Lambda-FF9900?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com)

**JobPrep OS** is an enterprise-grade, cloud-native Job Preparation Management Platform designed to help software engineering candidates systematically track, measure, analyze, and optimize their interview preparation across Core CS, Data Structures & Algorithms (DSA), System Design, Full-Stack Development, and Job Applications.

---

## 🎯 Architectural Highlights & System Design Concepts

Built specifically to showcase **SDE-1 / Software Engineering depth** for top product-based companies:

1. **Clean Layered Architecture (Backend):** Built with Spring Boot 3 (`@RestController` $\rightarrow$ `@Service` $\rightarrow$ `@Repository` $\rightarrow$ `@Entity`), enforcing strict separation of concerns and Lombok DTO mapping.
2. **Relational Data Modeling & Indexing (PostgreSQL):** Utilizes composite B-Tree indexes on `(user_id, pattern)` and `(user_id, status)` to run analytical aggregations (DSA pattern solve rates, weak area detection, application conversion rates) in sub-10ms using native SQL `GROUP BY`.
3. **AWS S3 Object Storage & Presigned URLs:** Solves database table bloat by generating short-lived 15-minute S3 presigned upload URLs for user resumes and documents.
4. **AWS Cognito Identity & JWT Security Filters:** Implements OAuth2/OIDC standards with Spring Security bearer token validation for strict multi-tenant user isolation.
5. **Amazon Bedrock AI Coach:** Generative AI integration that synthesizes user preparation metrics into actionable, personalized focus recommendations.

---

## 🏗️ System Architecture

```
[ React 18 SPA (Vite + Tailwind CSS + Recharts) ]
                        │
                        │ HTTPS / REST (Cognito Bearer JWT)
                        ▼
       [ AWS CloudFront + Amazon S3 Static Hosting ]
                        │
                        ▼
       [ Application Load Balancer / API Gateway ]
                        │
                        ▼
       [ Spring Boot REST API Service (AWS ECS Fargate / App Runner) ]
        ├── Spring Data JPA / Hibernate + HikariCP Pool
        ├── Controllers -> Services -> Repositories
        └── AWS SDK v2 Integration
              │                 │                 │
              ▼                 ▼                 ▼
       [ AWS RDS PostgreSQL ] [ Amazon S3 ]  [ Amazon Bedrock ]
       (Relational DB)       (Docs/Resumes)   (AI Prep Coach)
```

---

## 🚀 Key Modules & Capabilities

* **Dashboard ("How am I doing today?"):** Live preparation stats, active streak tracking, Day A / Day B curriculum viewer from the 60-Day Masterplan, quick log drawers.
* **Daily Preparation Logger:** Granular study-hour tracking across 6 subjects (Java, DSA, Spring Boot, AWS, AI/ML, Projects), day status toggles, and daily reflections.
* **Learning Progress Engine:** Hierarchical topic trees across 8 technology stacks with state transitions (`NOT_STARTED` $\rightarrow$ `IN_PROGRESS` $\rightarrow$ `COMPLETED` $\rightarrow$ `NEEDS_REVISION`).
* **DSA Tracker & Analytics:** Categorization of solved problems by pattern, difficulty, and hint usage with automatic **Weak Pattern Identification**.
* **Job Application Pipeline:** Dual-view (Kanban Board & Data Table) pipeline manager calculating Application-to-Interview and Interview-to-Offer conversion rates.
* **Analytics & AI Coach:** Interactive Recharts visual graphs coupled with Amazon Bedrock generative AI preparation advice.

---

## 🛠️ Getting Started Locally

### Prerequisites
* **Java 17+** (OpenJDK / Oracle JDK)
* **Node.js 18+** & **npm**
* Maven 3.8+ (optional, Maven Wrapper included)

### 1. Run Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
* Backend runs at `http://localhost:8080`
* H2 Database Console available at `http://localhost:8080/h2-console`

### 2. Run Frontend (React SPA)
```bash
cd frontend
npm install
npm run dev
```
* Frontend runs at `http://localhost:3000` (proxied automatically to port 8080)

---

## 📊 Database Schema (PostgreSQL DDL)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cognito_sub VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(100),
    target_role VARCHAR(100) DEFAULT 'Software Development Engineer',
    prep_start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    current_streak INT DEFAULT 0
);

CREATE TABLE daily_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    day_number INT NOT NULL CHECK (day_number BETWEEN 1 AND 60),
    completion_status VARCHAR(20) NOT NULL,
    total_study_hours NUMERIC(4,2) DEFAULT 0.0,
    CONSTRAINT idx_user_daily_date UNIQUE(user_id, log_date)
);

CREATE TABLE dsa_problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    problem_title VARCHAR(255) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    pattern VARCHAR(100) NOT NULL,
    time_taken_minutes INT DEFAULT 0
);
CREATE INDEX idx_dsa_user_pattern ON dsa_problems(user_id, pattern);
```

---

## 📝 License
This project is open-source under the [MIT License](LICENSE).
