# Quarter - 부동산 매물 중개 온라인 플랫폼 서버 (Backend)

> **개요**  
> Quarter 프로젝트는 부동산(Property) 매물 등록 및 조회, 에이전트와 멤버 간 상호 작용을 지원하는 실시간 B2C 및 C2C 중개 플랫폼의 **서버(Backend) 아키텍처**입니다. 사용자에게 맞춤형 매물 데이터와 소셜 기능 파이프라인을 효율적으로 제공하기 위해 구축되었습니다.

## 📌 주요 기술 스택 (Tech Stack)
* **Framework:** Node.js, NestJS
* **Language:** TypeScript
* **API Structure:** GraphQL (Apollo Server - Code First 방식을 활용)
* **Database:** MongoDB, Mongoose
* **Real-time:** WebSockets (Socket.io)
* **Others:** JWT, GraphQL Upload (`graphql-upload`), 모듈 아키텍처

## ⚙️ 아키텍처 설계 및 구성 동기
1. **마이크로 모듈 기반 아키텍처 (NestJS Architecture)**
   - `auth`, `member`, `property`, `like`, `view`, `board-article`, `notification` 등 핵심 도메인별로 모듈을 철저히 분리 구축했습니다. 이를 통해 협업 편의성과 유지/보수 및 테스트 코드 작성 효율을 극대화했습니다.
   
2. **GraphQL의 도입과 데이터 패칭 효율화**
   - 클라이언트에서 복잡한 연관 관계(예: 글 작성자 정보, 매물에 대한 나의 찜하기(like) 여부)를 자유롭게 쿼리하여 Over-fetching과 Under-fetching을 방지했습니다. `@nestjs/graphql` 기반의 Code-First 접근법을 통해 타입 안정성을 유지했습니다.

3. **기능 분리를 위한 Batch 서버 격리 (Microservice 단위 분리)**
   - 메인 API 서버(`quarter-api`)에 부하를 주지 않도록, `quarter-batch` 백그라운드 서버를 별도 구축했습니다. Mongoose 모델들을 독립적으로 주입받아 **사용자 랭킹**, **인기 매물 랭킹 집계(Top Properties)** 등을 주기적으로 비동기 계산하여 데이터베이스를 갱신합니다.

## 🚀 주요 백엔드 기여 항목 (Key Implementations)

### ✅ 복잡한 다중 필터 검색 (Aggregation Pipeline)
- 수만 건의 매물을 사용자 맞춤으로 검색하기 위해, MongoDB의 Mongoose Aggregation(`$match`, `$facet`, `$sort`, `$limit`) 파이프라인 구조를 활용했습니다.
- 가격 범위(`pricesRange`), 면적, 침실 개수, 지역 텍스트 검색부터 작성자 조인(Lookup)까지 **다원화된 쿼리 동적 매핑**(`shapeMatchQuery`)을 통해 성능을 유지하는 검색 인터페이스를 구성했습니다.

### ✅ 스트리밍 기반 다중 이미지 업로드 파이프라인
- REST API 폼 데이터 방식의 한계를 넘어 GraphQL 상단(`createReadStream()`)에서 대용량 이미지 다중 첨부를 지원합니다. 
- 비동기 Promise 배열 병렬 처리(`Promise.all`)를 적용하고 Node.js `fs.createWriteStream` 파이프를 이용해 버퍼 메모리 오버헤드를 줄인 빠른 업로드 로직을 작성했습니다. 

### ✅ 데이터 시각화 보조 및 실시간 통신
- 매물 열람 즉시 상태가 집계되는 **`조회수(Views)` 및 `찜하기(Likes)` 매커니즘**을 세밀하게 분할 구축했습니다 (`ViewService`, `LikeService`).
- 알림 모듈(`notification`)과 `SocketModule`을 연계하여 웹소켓 기반의 실시간 알림 로직을 추가 구성했습니다.

---

## 💻 Installation

```bash
$ npm install
```

## ▶️ Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
