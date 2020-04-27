> 기본철학과 용어에 대한 이해와 사용법이 중요함

- [기본기](기본기)
- [도서](도서)
- [문제해결, 용어정의](문제해결)
- [플랫폼 트러블슈팅](플랫폼-트러블슈팅)
- [오픈소스](오픈소스)
- [스터디](스터디)
- [TC39](TC39)
- [포스트](포스트)
- [프로젝트 회고](프로젝트-회고)
- 도메인
  - [챗봇](챗봇)
- [참고사이트](참고사이트)

***

#### 신호등 모델
- 녹색: 정상 궤도를 따른다. 경로를 많이 수정하지 않아도 기대치를 충족할 가능성이 크다.
- 노란색: 약속한 날짜와 기타 기대치를 맞추려면 즉각적이고도 상당한 경로 수정이 필요하다.
- 빨간색: 궤도를 벗어났다. 일정을 놓쳤거나, 극단적인 조치를 취하지 않으면 곧 놓친다. 최소한 계획 재수립이 필요하다.

***

#### IDE
- Intellij 단축키
  - 코드 정리 : option + command + L
  - multi cursor : shift + option(alt) + click
  - 테스크 자동 실행 : control + R
  - 코드 구조 표현 : command + 7
  - 최근 사용 파일 : command + E
- 웹스톰 멀티 선택
  - Keymap => Add or Remove Caret
- Live Template: 반복되는 타이핑을 탬플릿화
- 대소문자 변경: Command + Shift + U
- 동일한 문자 다중 선택: Control + G
- [Intellij 확장자 안열릴 때](%5Bintellij%5D-확장자-안열릴-때.md)
- TypeScript의 types 추적안될 때
  - WebStorm > Preferences > Languages & Frameworks > TypeScript > [x] TypeScript Language Service
- 2019.3 버전부터 Nullish Coalescing operator 사용가능
- yarn : Languages and Frameworks | Node.js and NPM 에서 yarn 설정 가능

#### 소소한팁
- `upsert`: Update와 Insert
- `npm ci`: `npm install` 과 비슷
- PR Template: 저장소에 `pull_request_template.md` 파일 포함
- 정적 페이지 개발(SPA x) : Webpack 사용. entry에 각 페이지의 js를 정의.
- [WebDriver screenshot](WebDriver-screenshot.md)
- [package-lock.json](package-lock.json.md)
- href = Hypertext Reference
- eslint-disable-line
- Pull Request에서 develop과 conflict 발생시 feature 브랜치와 머지를 하지 않는 것이 좋음 : feature에 머지시 conflict의 정상동작을 보장 할 수 없음.
- placeholder content
- ADID
  - 개인을 식별하지 않고 맞춤형 광고 서비스를 제공할 수 있도록 부여하는 '광고 식별자'
  - Android : GAID(Google Advertising ID), IOS : IDFA(IDentifier For Advertisers)
- XAMPP 파일 서버 설정을 위한 php.ini 수정
  - upload_max_filesize=2M => upload_max_filesize=4096M
