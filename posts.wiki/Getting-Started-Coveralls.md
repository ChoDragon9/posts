### Getting Started
#### Coveralls 설정
1. https://coveralls.io/에서 GitHub 계정 연동
2. https://coveralls.io/repos/new에서 커버리지 리포트를 받을 저장소 활성화

#### 테스크 명령어 설정
1. `node-coveralls` 설치, `npm i node-coveralls -D`
2. 테스트 명령어에 coveralls 연동
```json
// package.json
"scripts": {
  "test": "jest --coverage --coverageReporters=text-lcov | coveralls"
}
```
   - [라이브러리별 설정 방법](https://github.com/nickmerwin/node-coveralls#usage)

#### Travis CI 연동
`node-coveralls`에서 사용할 환경 변수를 Travis CI에 설정합니다.
1. `COVERALLS_SERVICE_NAME` 환경변수 추가, 값은 `travis-ci`로 설정
2. `COVERALLS_REPO_TOKEN` 환경변수 추가
    - coveralls에서 활성화한 저장소의 Repo Token을 값으로 설정

#### 리포트 받기
1. 빌드 명령어에 커버리지 명령어 포함
```diff
"scripts": {
-  "build": "webpack"
+  "build": "webpack && npm run test"
}
```
2. Travis CI에서 빌드 명령어 실행
3. 빌드 완료 시 빌드 결과가 Coveralls에 전달됨
4. coveralls.io 접속 시 Coverage 결과를 볼 수 있음