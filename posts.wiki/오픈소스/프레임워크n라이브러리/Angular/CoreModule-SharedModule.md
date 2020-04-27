# CoreModule
- 전역에서 사용할 요소
- 싱글톤으로 사용해야 되는 요소

## 예
- 인증
- footer/header 요소
- http 요청 서비스
- 가드

# SharedModule
- 전역에서 사용되지 않고, 다른 모듈에서 재사용되는 요소
- 피쳐 모듈에서 정의해 사용할 요소
- 독립적으로 동작하는 요소

## 예
- 로딩 아이콘
- 버튼
- 디렉티브
- 파이프
- 모델


# 결론
- 사용 방법에 따른 구분을 해야 함
- 전역이면 Core, 독립적이면 Shared

# 참조: Google Developer Export For Angular
https://medium.com/@tomastrajan/6-best-practices-pro-tips-for-angular-cli-better-developer-experience-7b328bc9db81