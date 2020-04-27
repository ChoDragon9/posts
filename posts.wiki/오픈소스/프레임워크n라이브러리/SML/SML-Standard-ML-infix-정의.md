### 중위연산자
`infix`를 사용하여 함수를 중위연산자로 정의할 수 있다.

##### 예제코드
```
val add = fn (a, b) => a + b
infix add
val seven = 2 add 5;
```

##### 실행예제
```
val add = fn : int * int -> int
infix add
val seven = 7 : int
```

함수를 선언하기 전에 `infix`를 선언할 수 있다. 하지만 인자가 무엇인지 비교적 구분하기 어렵다.

##### 예제코드
```
infix minus
fun x minus y = x - y
val four = 8 minus 4; (* 4 *)
```

##### 실행예제
```
infix minus
val minus = fn : int * int -> int
val four = 4 : int
```