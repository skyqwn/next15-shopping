# CICARDI - 온라인 패션 스토어 플랫폼

![CICARDI 로고](https://www.cicardi.store/cicardi-meta-image.png)

**[사이트 주소](https://www.cicardi.store)**

## 프로젝트 소개

CICARDI는 모던한 디자인과 사용자 친화적인 인터페이스를 갖춘 온라인 패션 스토어 플랫폼입니다. 다양한 패션 상품을 쉽게 검색하고 구매할 수 있는 기능을 제공하며, 사용자 경험을 최우선으로 고려하여 개발되었습니다. 최신 웹 기술과 아키텍처 패턴을 적용해 유지보수성과 확장성을 확보했습니다.

## 주요 기능

- **상품 검색 및 필터링**: 브랜드, 카테고리, 가격대 등 다양한 필터 옵션 제공
- **사용자 인증**: 로그인, 회원가입 및 소셜 로그인 지원
- **결제 시스템**: 토스페이먼츠를 사용한 간편하고 안전한 결제 프로세스
- **반응형 디자인**: 모든 디바이스에 최적화된 UI
- **최근 본 상품**: 레디스를 이용한 사이드바를 통한 최근 조회 상품 확인
- **주문 관리**: 주문 상태 확인 및 이력 관리
- **다크 모드**: 로그인한 사용자 환경 설정에 따른 테마 변경
- **어드민 페이지**: 어드민만 접속 가능한 상품등록,삭제,편집 주문관리를 할수 있는 페이지

## 기술 스택

### 프론트엔드

- **Next.js 15 (App Router)**: 서버 컴포넌트, 서스펜스를 활용한 현대적인 UI 개발
- **TypeScript**: 타입 안전성과 개발 생산성 향상
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크로 반응형 디자인 구현
- **Shadcn/UI**: 접근성 높은 컴포넌트 라이브러리
- **Framer Motion**: 애니메이션 효과
- **TanStack Query**: 서버 상태 관리 및 데이터 페칭
- **Zustand**: 클라이언트 상태 관리

### 백엔드

- **NestJS**: 확장 가능하고 유지보수가 용이한 서버 아키텍처
- **Effect.ts**: 함수형 오류 처리 및 비동기 작업 관리
- **PostgreSQL with NeonDB**: 클라우드 네이티브 SQL 데이터베이스
- **Drizzle ORM**: 타입 안전한 데이터베이스 쿼리 빌더
- **JWT**: 사용자 인증 및 권한 관리
- **Sharp & Plaiceholder**: 이미지 처리 및 최적화

### 인프라 & 배포

- **AWS EC2**: 애플리케이션 호스팅
- **Docker**: 컨테이너화된 배포 환경
- **GitHub Actions**: CI/CD 파이프라인 자동화
- **AWS S3**: 이미지 및 정적 자산 저장소
- **AWS Certificate Manager (ACM)**: HTTPS를 위한 SSL/TLS 인증서 프로비저닝 및 관리
- **Elastic Load Balancer (ELB)**: HTTPS 트래픽 수신 및 애플리케이션 부하 분산

## 아키텍처

본 프로젝트 백엔드에선 **DDD 아키텍처** 원칙을 따르며, 명확한 관심사 분리와 모듈화된 구조로 유지보수성과 확장성을 높였습니다.

### 프론트엔드 아키텍처

- **컴포넌트 계층화**: UI, 기능, 레이아웃 컴포넌트 분리
- **서버 컴포넌트/클라이언트 컴포넌트 분리**: 최적의 렌더링 전략 적용
- **데이터 페칭 추상화**: 서버 엔드포인트 호출을 위한 훅 패턴
- **이미지 처리**: 이미지 업로드, 미리보기 생성, 삭제 기능을 모듈화한 `useImagePicker` 훅
  - `react-hook-form`과 통합하여 폼 상태 관리
  - 다중 파일 업로드(최대 5개) 및 프로필 단일 이미지 업로드 지원
  - 업로드 성공 시 반환된 URL을 폼 필드에 반영, 실패 시 에러 처리

### 백엔드 아키텍처

- **도메인 중심 설계**: 비즈니스 로직을 도메인 모델에 캡슐화
- **계층형 구조**:
  - **Presentation Layer**: 컨트롤러 및 API 엔드포인트
  - **Application Layer**: 유스케이스 및 서비스 조정 (Facade 패턴)
  - **Domain Layer**: 비즈니스 로직 및 도메인 모델
  - **Infrastructure Layer**: 데이터베이스, 외부 서비스 통합

## 캐싱 전략

### Redis 기반 캐싱 서비스

- **사용자 정보 캐싱**: 1시간 TTL(Time To Live)로 사용자 데이터 캐싱
- **제품 정보 캐싱**: 1시간 TTL로 자주 조회되는 제품 정보 캐싱
- **최근 조회 제품**: 최대 5개 저장, 3일 TTL로 사용자별 최근 본 상품 관리
- **리프레시 토큰 저장 및 관리**: 인증 토큰의 안전한 저장 및 갱신
- **데이터 무효화 전략**: 데이터 수정 시 Redis 캐시를 자동 갱신하여 최신 상태 유지

Redis를 활용한 캐싱은 데이터베이스 부하를 줄이고, 빠른 응답 속도를 보장합니다.

## 데이터 페칭 전략

### 하이브리드 데이터 페칭 접근법

Next.js의 서버 컴포넌트와 TanStack Query를 결합하여 효율적이고 유연한 데이터 페칭 전략을 구현했습니다.

- **서버 사이드 프리페칭**: `ServerFetchBoundary` 컴포넌트를 통해 데이터를 선행 로딩하고 클라이언트에 하이드레이션
- **스트리밍 SSR**: 서스펜스와 스트리밍을 통합하여 점진적 페이지 로딩 개선
- **자동 캐싱 및 재검증**: TanStack Query의 스마트 캐싱 메커니즘으로 데이터 최신성 유지

## 주요 구현 사항

### 성능 최적화

- **이미지 최적화**: WebP 포맷 및 이미지 크기 조정으로 로딩 시간 단축
- **코드 분할**: 라우트 기반 코드 분할로 초기 로딩 시간 개선
- **서버 사이드 렌더링**: 주요 페이지의 초기 로드 성능 강화
- **점진적 하이드레이션**: 인터랙티브 요소의 우선순위화

### 사용자 경험

- **스켈레톤 로딩 상태**: 데이터 로딩 중 사용자 피드백 제공
- **페이지 간 트랜지션**: 부드러운 페이지 전환 효과
- **오프라인 지원**: 서비스 워커를 통한 기본적인 오프라인 기능
- **무한 스크롤**: 상품 목록의 부드러운 페이징 처리

### 데이터베이스 설계

- **정규화된 스키마**: 데이터 일관성과 효율적인 쿼리 실행
- **트랜잭션 관리**: ACID 속성을 보장하는 데이터 무결성

## 성과와 학습

- **Next.js 15의 App Router**: 서버 컴포넌트와 스트리밍을 통한 현대적인 웹 개발 경험
- **클린 아키텍처 적용**: 도메인 중심 설계와 명확한 관심사 분리
- **타입 안전성**: TypeScript와 Drizzle ORM을 통한 엔드투엔드 타입 안전성
- **함수형 프로그래밍**: Effect.ts를 활용한 에러 처리와 비동기 작업 관리
- **CI/CD 자동화**: GitHub Actions를 통한 테스트 및 배포 자동화
- **성능 최적화**: 이미지 최적화, 코드 분할, SSR을 통한 웹 성능 향상

## 미래 개선 계획

- **국제화 지원**: 다국어 인터페이스 및 지역화된 가격 포맷
- **마이크로서비스 아키텍처**: 백엔드 서비스의 모듈화 및 확장성 강화
- **분석 대시보드**: 사용자 행동 분석 및 상품 인사이트 제공
- **AI 기반 추천 시스템**: 개인화된 상품 추천 알고리즘 고도화
