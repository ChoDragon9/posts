### 고차 함수
값 처럼 사용할 수 있는 함수를 고차 함수라고 한다. 익명함수를 정의하여 변수에 할당할 수 있다. 익명함수는 `fn`을 사용한다.

##### 예제코드
```
val is_large = (fn x => x > 37)
val add = fn (a, b) => a + b

val check = is_large(38)
val added = add(2, 3)
```

##### 실행예제
```
val is_large = fn : int -> bool
val add = fn : int * int -> int
val check = true : bool
val added = 5 : int
```

고차 함수를 사용 가능하기 때문에 클로저를 정의할 수 있다.

##### 예제코드
```
val cache_num = fn (x) => fn (y) => x * y
val numFn = cache_num(1)
val result = numFn(2)
```

##### 실행결과
```
val cache_num = fn : int -> int -> int
val numFn = fn : int -> int
val result = 2 : int
```

### List.map
##### 예제코드
```
fun toAlpha 0 = "A"
  | toAlpha 1 = "B"
  | toAlpha 2 = "C"
  | toAlpha n = "Z"
val numbers = [0, 1, 2, 3, 4]
val result = List.map(toAlpha)(numbers)
```

##### 실행결과
```
val toAlpha = fn : int -> string
val numbers = [0,1,2,3,4] : int list
val result = ["A","B","C","Z","Z"] : string list
```

### List.filter
##### 예제코드
```
val isLarge = fn n => n > 2
val numbers = [0, 1, 2, 3, 4]
val result = List.filter(isLarge)(numbers)
```

##### 실행결과
```
val isLarge = fn : int -> bool
val numbers = [0,1,2,3,4] : int list
val result = [3,4] : int list
```

### 커스텀 `map` 함수 정의
- map 함수는 함수와 리스트를 인자로 받는다.
- 리스트 인자가 비어있으면 빈 리스트를 반환한다.
- 리스트가 비어있지 않으면 리스트에서 앞에 있는 값(x)과 나머지 리스트(xs)를 꺼낸다.
  - x를 인자로 받은 함수(f)에 인자로 사용한다.
  - map 함수에 f, xs를 재귀적으로 호출한다.
   - map(f)(xs) 실행 결과의 리스트 앞에 f(x)의 값이 추가된다.

##### 예제코드
```
fun map f [] = []
  | map f (x :: xs) = f(x) :: map(f)(xs)
fun toAlpha 0 = "A"
  | toAlpha 1 = "B"
  | toAlpha 2 = "C"
  | toAlpha n = "Z"
val numbers = [0, 1, 2, 3, 4]
val result = map(toAlpha)(numbers)
```

##### 실행결과
```
val map = fn : ('a -> 'b) -> 'a list -> 'b list
val toAlpha = fn : int -> string
val numbers = [0,1,2,3,4] : int list
val result = ["A","B","C","Z","Z"] : string list
```