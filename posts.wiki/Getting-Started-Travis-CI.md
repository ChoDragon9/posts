### Getting Started
1. Travis-ci.com에 접속 후 GitHub 계정으로 회원가입한다.
2. 계정 권한을 설정한다.
3. Travis CI에서 원하는 저장소를 활성화한다.
4. `.travis.yml` 파일을 만들어 프로젝트 환경을 설정한다.
```yml
language: node_js
node_js:
  - "7"
```
   - Travis CI가 무엇을 할지 정의하는 파일이다.
   - yml 확장자
     - YAML을 기술하는 파일 확장자로, 문서 마크업이 아닌 데이터 중심으로 기술하는 마크업이다.
     - 사람이 쉽게 읽을 수 있는 데이터 직렬화 양식이다.
5. Travis CI에서 감지 후 빌드를 할 수 있게, GitHub에 commit&push를 한다.
6. build status를 확인하여 진행한다.

#### [자바스크립트 빌드 환경 설정](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)
- Default Install : `npm install`
- Default script : `npm test`

빌드 명령어 기본값을 `npm test`이다. 만약에 다른 명령어를 사용하려면 수정이 필요한다.
```yml
language: node_js
node_js:
  - "9"
script:
  - npm run build
os: osx
```