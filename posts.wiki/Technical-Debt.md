- [기술적부채란](https://brunch.co.kr/@pubjinson/23)
- [기술적부채 해결은 보이스카웃 규칙으로](https://www.slideshare.net/mobile/jinhyuckkim7/ss-79626046)
- [Code Climate 분석 포인트 10가지](https://codeclimate.com/blog/10-point-technical-debt-assessment/)
  - [DRY 원칙](프로그래밍의-정석#22-drydont-repeat-yourself) 위배면 기술적 부채
- [오버 엔지니어링](https://zetawiki.com/wiki/오버엔지니어링)
  - 요구사항보다 높은 스펙일 때
  - [KISS 원칙](2-원칙-프로그래밍의-가이드라인#21-kisskeep-it-simple-stupid--keep-it-short-and-simple) 위배

#### Code Climate 기술적 부채 분석 포인트 10가지
##### 원본
1. Argument count - Methods or functions defined with a high number of arguments
2. Complex boolean logic - Boolean logic that may be hard to understand
3. File length - Excessive lines of code within a single file
4. Identical blocks of code - Duplicate code which is syntactically identical (but may be formatted differently)
5. Method count - Classes defined with a high number of functions or methods
6. Method length - Excessive lines of code within a single function or method
7. Nested control flow - Deeply nested control structures like if or case
8. Return statements - Functions or methods with a high number of return statements
9. Similar blocks of code - Duplicate code which is not identical but shares the same structure (e.g. variable names may differ)
10. Method complexity - Functions or methods that may be hard to understand

##### 번역
1. 인자 갯수 - 많은 수의 인자로 정의된 메소드 또는 함수
2. 복잡한 불리언 로직 - 이해하기 힘든 불리언 로직
3. 파일 길이 - 한파일에 과도한 라인의 코드
4. 동일한 코드 블록 - 구문 적으로 동일한 중복 코드 (그러나 형식이 다를 수 있음)
5. 메소드 수 - 많은 수의 함수 또는 메소드로 정의 된 클래스
6. 메서드 길이 - 단일 함수 또는 메서드 내에서 코드가 지나치게 많음
7. 중첩 제어 흐름 - if 또는 case와 같이 중첩 된 제어 구조
8. return 문 - 많은 수의 return 문을 사용하는 함수 또는 메서드
9. 유사한 코드 블록 - 동일하지는 않지만 동일한 구조를 공유하는 중복 코드 (예 : 변수 이름이 다를 수 있음)
10. 메소드 복잡성 - 이해하기 어려울 수있는 함수 또는 메소드