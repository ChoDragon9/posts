Stage-X는 ecmascript(ecma 262) 스펙을 정의하는 TC39에서 스펙에 대한 레벨을 분류한 것이다.

Stage는 총 5개의 레벨이 있으며 3 이전의 버전을 삭제될 가능성이 있기 때문에 조심히 사용해야 한다.

### Stage Level
- Stage 0 : 단순히 아이디어
- Stage 1 : 스펙추가에 착수할 가치가 있는 것
- Stage 2 : 초기 스펙
- Stage 3 : 스펙 정의 완료 및 초기 브라우저 구현
- Stage 4 : 다음 해의 릴리즈 추가됨

상위 레벨의 Stage를 사용할 경우 하위 레벨의 plugin도 포함된다.

예를 들어 Stage 2에 syntax-dynamic-import가 존재할 경우 Stage 1, 0을 설치해도 사용할 수 있는 것이다.