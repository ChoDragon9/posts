## 한글 이슈
- 한글 조합 키 이벤트: https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent

### 한글 조합전 TextArea 높이 조정
- v-model 대신 input 이벤에서 event.target.value 사용


## 기능
- [Textarea 자동 높이 조절](Textarea-자동-높이-조절)
- 개행문자 개행 처리
  - `p {white-space: pre-wrap;}`
  - `p {white-space: pre-line;}` : 맨 앞 공백 제거 필요시

## IE
### 카카오 주소검색 기능을 DOM 레이어로 만들었는 데, 검색 이후 input 동작안함
- 원인: 메모리 해지로 인한 블록킹
- 폼 사용 시, 메모리 해지 발생 시키지 않도록 수정

### TextArea의 scrollHeight 초기값이 두줄로 나옴
- 요구사항: TextArea를 초기에 한줄로 표시하고, 컨텐츠에 따라 가변 처리
- 원인: rows가 기본값이 2임
- 해결방안: rows를 초기에 1로 조정

### TextArea의 Wrapper height와 Textarea의 rows가 일치하지 않으면 텍스트만 넘침
- 원인: rows가 클 때, 넘침
- 해결방안: rows 와 height를 일치시킴

### IE 대응 시, Cache-Control 설정
IE는 GET Method의 REST API를 캐싱한다. 그래서 Response Header에 `Cache-Control: no-cache`가 필요하다.

### [nuxt v2.12.2] flat 함수 미동작함
- flatMap 또는 spread 문법으로 대체

### toString.call({}), toString.call([]) 에러
```js
// Not Cool
const obj = {}
const arr = []
toString.call(obj)
toString.call(arr)

// Cool
const obj = {}
const arr = []
({}).toString.call(obj)
([]).toString.call(arr)
```

## Safari
### 사파리 Date
```
// 크롬에서는 되지만, 사파리에서 안됨
new Date('2020-01-01 00:00:00')

// 사파리에서 이렇게 해야 동작됨
new Date('2020-01-01T00:00:00')
```

## IOS
- [IOS Event Delegation](http://gravitydept.com/blog/js-click-event-bubbling-on-ios)
- [iOS 10 / Safari / Select Element 삭제 버그](https://stackoverflow.com/questions/39557023/ios-10-safari-issue-with-select-element-no-more-in-dom)