#### Truthy/Falsy
- Falsy는 '', 0, null, undefined, NaN, false
- Truthy는 Falsy가 아닌것

#### LR/RL Parser
- js는 기본 LR Parser
- `else if`, `Arrow Function`만 RL Parser

#### Iterate/Recursive
- Iterate는 동일한 문을 Record에서 반복할 때
- Recursive는 각각 다른 문을 반복해서 실행할 때

#### Flow Control
- Direct Flow Control
  - [label]:[statement]
    - Iteration과 switch는 Auto Label로 엔진에서 Label를 할당
  - switch([Expression]){}
    - case/default라는 label만 사용한다.
    - default는 상단에 선언해도 마지막에 처리한다.
- Optional Flow Control
  - if[조건][문] => Optional
  - if[조건][문] else [문] => Mantantory
- Iterate Flow Control
  - for([Limited Statement];[Empty Truthy];[Last Excution])
  - while([Limited Statement]): 조건에 있는 변수가 Body에 있지 않으면 오류라고 봐야 함