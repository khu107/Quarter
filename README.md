# 🏢 Quarter : 부동산 매물 중개 온라인 플랫폼

> **"사용자 맞춤형 매물 데이터와 실시간 소통을 지원하는 B2C/C2C 중개 플랫폼 서버"** <br/>
> 단일 API 서버의 한계를 넘어, **마이크로 모듈 구조**와 **배치(Batch) 서버 격리**를 통해 확장성 있는 백엔드 아키텍처를 고민하며 개발한 1인 풀스택 프로젝트입니다.

<br/>

## 📚 Table of Contents
- [Architecture & ERD](#-architecture--erd)
- [Tech Stack](#-tech-stack)
- [Key Features & Troubleshooting](#-key-features--troubleshooting)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)

<br/>

## 🏗 Architecture & ERD

### System Architecture
(여기에 서버 아키텍처 다이어그램 이미지가 있다면 추가하세요)
- **모듈 분리:** `auth`, `member`, `property`, `like`, `board-article` 등 도메인별로 NestJS 모듈을 철저히 분리하여 유지보수성 극대화
- **배치(Batch) 서버 격리:** 메인 API 서버(`quarter-api`)의 부하 방지를 위해, 인기 매물 랭킹 등을 주기적으로 집계하는 `quarter-batch` 백그라운드 서버 분리 운영

### Database ERD
![Quarter ERD](이미지_경로를_입력하세요.png)
- **설계 포인트:** MongoDB의 Object ID를 활용한 효율적인 참조(Reference) 관계 모델링을 통해 유저, 매물, 소셜(팔로우/좋아요) 간의 데이터 무결성 확보

<br/>

## 🛠 Tech Stack

### Backend
- **Framework:** NestJS (Node.js)
- **Language:** TypeScript
- **API:** GraphQL (Apollo Server, Code-First)
- **Database:** MongoDB, Mongoose
- **Real-time:** Socket.io (WebSockets)

### Infrastructure & Tools (사용한 툴에 맞게 수정하세요)
- **Deployment:** AWS EC2 / Vercel
- **CI/CD:** GitHub Actions
- **Package Manager:** npm / yarn

<br/>

## 🔥 Key Features & Troubleshooting

### 1. 다중 필터 검색 시스템 (Mongoose Aggregation Pipeline)
- **도전:** 수만 건의 매물을 가격, 면적, 옵션 등 다양한 조건으로 검색할 때 발생하는 쿼리 성능 저하 문제
- **해결:** MongoDB의 `$match`, `$facet`, `$sort` 등을 활용한 파이프라인 구조와 **동적 쿼리 매핑(`shapeMatchQuery`)**을 구현하여 사용자 맞춤형 다중 필터 검색 최적화

### 2. 메모리 효율을 고려한 이미지 업로드 스트리밍
- **도전:** REST API 폼 데이터 방식의 한계 및 대용량 다중 이미지 업로드 시 발생하는 서버 버퍼 메모리 오버헤드
- **해결:** GraphQL의 `createReadStream()`과 Node.js의 `fs.createWriteStream`을 파이프 연결하여 스트리밍 기반 업로드 파이프라인 구축. `Promise.all`을 적용해 병렬 처리 속도 향상.

### 3. GraphQL을 통한 데이터 패칭 효율화
- **도전:** 복잡한 연관 관계(작성자 정보, 찜하기 여부 등)로 인한 Over-fetching 및 Under-fetching 문제
- **해결:** 클라이언트가 필요한 데이터만 요청할 수 있는 GraphQL 환경 구축. `@nestjs/graphql` 기반의 Code-First 접근법으로 서버와 클라이언트 간의 타입 안정성 유지.

### 4. 웹소켓 기반 실시간 상호작용
- **기능:** 매물 조회수(`Views`) 및 찜하기(`Likes`) 즉시 반영. SocketModule과 알림(Notification) 모듈을 연계하여 유저 간 상호작용 시 실시간 알림 제공.

<br/>

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 이상 권장)
- MongoDB 실행 환경

### Installation
```bash
# 레포지토리 클론
$ git clone [https://github.com/khu107/Quarter.git](https://github.com/khu107/Quarter.git)

# 패키지 설치
$ cd Quarter
$ npm install
