### 함수 선언
##### 예제코드
```
fun add (a, b) = a + b
val it = add(1, 2);
```

##### 실행결과
```
val add = fn : int * int -> int
val it = 3 : int
```

### 함수내 조건문
긴함수는 가독성을 위해 개행 처리 할 수 있다.

##### 예제코드
```
fun toAlpha (n) =
  if n = 0
    then "A"
  else if n = 1
   then "B"
  else "C"

val a = toAlpha(0)
val b = toAlpha(1)
val c = toAlpha(2)
```

##### 실행결과
```
val toAlpha = fn : int -> string
val a = "A" : string
val b = "B" : string
val c = "C" : string
```

### 재귀
##### 예제코드
```
fun factorial (n) =
  if n = 0
    then 1
  else n * factorial(n - 1)
val result = factorial(3);
```

##### 실행결과
```
val factorial = fn : int -> int
val result = 6 : int
```

### 함수내 변수 접근
함수내에서는 변수를 변경할 수 없다. 그리고 함수 선언 뒤에 선언된 변수가 있더라도 이전에 할당된 변수를 사용한다. 함수를 선언할 때 해당 변수를 복사해두기 때문이다.

##### 예제코드
```
val x = 2
fun answer n = n + x
val x = 1
val result = answer(1)
```

##### 실행결과
```
val x = <hidden-value> : int
val answer = fn : int -> int
val x = 1 : int
val result = 3 : int
```

### 패턴 매칭
if 대신 패턴 매칭을 통해 정의할 수 있다.

##### 예제코드
```
fun fibonacci 0 = 0
  | fibonacci 1 = 1
  | fibonacci n = fibonacci(n - 1) + fibonacci(n - 2)

val result = fibonacci(5)
```

##### 실행결과
```
val fibonacci = fn : int -> int
val result = 5 : int
```

### 이름있는 튜플을 튜플로 변환하기
##### 예제코드
```
fun rgbToTup ({r, g, b}) = (r, g, b)
val rgb = { r=0.1, g=0.2, b=0.3 }
val result = rgbToTup(rgb)
```

##### 실행결과
```
val rgbToTup = fn : {b:'a, g:'b, r:'c} -> 'c * 'b * 'a
val rgb = {b=0.3,g=0.2,r=0.1} : {b:real, g:real, r:real}
val result = (0.1,0.2,0.3) : real * real * real
```