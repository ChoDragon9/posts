### 소개
> Standard ML(SML; "Standard Meta Language")

Standard ML는 모듈식, 함수형 프로그래밍 언어이다. 컴파일 타임에 타입 체크와 타입 추론을 한다. 타입에 대한 설명은 아래에서 자세히 다룬다.

#### 모듈식 프로그래밍
모듈식 프로그래밍은 프로그램 기능을 독립적이고 상호 교환 가능한 모듈로 분리하는 것을 강조하는 소프트웨어 설계 기법이다. 각 모듈에는 원하는 기능의 한 측면만 실행하는 데 필요한 모든 것이 포함된다.

### 개발 환경 설치
#### Step 1. 인스톨러 패키지 다운로드
1. [Standard ML of New Jersey](http://www.smlnj.org/)에 접속한다.
2. Downloads 링크를 클릭한다.
3. Software Links 링크를 클릭한다.
4. PC의 OS에 맞게 패키지를 설치한다.

#### Step 2. Mac OS 환경변수 추가
패키지가 설치되면 `/usr/local/smlnj`로 설치된다. 해당 폴더에 있는 `bin` 폴더를 환경변수에 추가한다.

##### 1. 터미널에서 환경변수를 추가한다.

```bash
$ vi ~/.bash_profile
```

##### 2. 환경변수 추가 후 `sml` 명령어로 확인한다.

```bash
$ sml
Standard ML of New Jersey (64-bit) v110.96 [built: Fri Dec 13 14:59:34 2019]
-
```

##### 3. Control-D 단축키로 종료한다.

```bash
$ sml
Standard ML of New Jersey (64-bit) v110.96 [built: Fri Dec 13 14:59:34 2019]
- ^D
$
```

### 개발 환경 사용 방법
#### 코드 작성 후 실행
코드 작성 후 세미 콜론을 작성하면 실행된다. 아래는 `1 + 2;`를 입력한 결과이다.

##### 예제코드
```bash
- 1 + 2;
```
##### 실행결과
```bash
val it = 3 : int
```

#### 다중 라인 작성 후 실행
한 줄 작성한 뒤 `Enter`를 하면 `=`으로 표기된다. 마찬가지로 코드 입력 후 세미콜론으로 실행할 수 있다.

> SML의 변수 선언은 `val`로 한다.

##### 예제코드
```
- val x = 1
= val y = 2;
```

##### 실행결과
```
val x = 1 : int
val y = 2 : int
```

#### 파일 실행
파일은 `use "<Path>"` 형태로 사용된다. 현재 폴더를 기준으로 파일 경로를 찾는다.

##### sum.sml 파일
```
val x = 1 + 2
```

##### sum.sml 실행
```
- use "./sum.sml";
[opening ./sum.sml]
val x = 3 : int
val it = () : unit
```

### 문법
#### 주석
SML은 주석의 시작은 `(*`로 하고, 끝은 `*)` 이렇게 한다.

#### 숫자
##### 예제코드
```
- val rent = 1200
= val phone_no = 5551337
= val pi = 3.14159
= val negative_number = ~15 (* 음수는 ~를 붙여 사용한다. *);
```

##### 실행결과
```
val rent = 1200 : int
val phone_no = 5551337 : int
val pi = 3.14159 : real
val negative_number = ~15 : int
```

#### 숫자 연산
숫자 연산 시 타입을 명확히 사용해야 한다. 만약에 다른 타입으로 연산하면 에러가 발생한다.

##### 예제코드
```
- val pi = 3.14159
= val tau = 2 * pi;
```

##### 실행결과
```
stdIn:7.5-7.17 Error: operator and operand do not agree [overload conflict]
  operator domain: [* ty] * [* ty]
  operand:         [* ty] * real
  in expression:
    2 * pi
```

정확한 타입을 사용하면 정상적으로 연산 결과를 확인할 수 있다.

##### 예제코드
```
- val pi = 3.14159
= val tau = 2.0 * pi;
```

##### 실행결과
```
val pi = 3.14159 : real
val tau = 6.28318 : real
```

이외 이러한 연산자를 지원한다.

##### 예제코드
```
- val real_division = 14.0 / 4.0 (* 3.5 *)
= val int_division = 14 div 4 (* 3 *)
= val int_remainder = 14 mod 4; (* 2 *)
```

##### 실행결과
```
val real_division = 3.5 : real
val int_division = 3 : int
val int_remainder = 2 : int
```

#### 타입 선언
타입을 추가하고 싶다면 타입을 선언할 수 있다. 하지만 SML은 자동으로 타입을 추론하기 때문에 불필요한 작업이다.

```
- val diameter = 7926 : int
= val e = 2.718 : real
= val name = "Bobby" : string;
```

#### 불리언
- `andalso` 연산자는 and 연산을 한다.
- `orelse` 연산자는 or 연산을 한다.
- `not` 함수는 not 연산을 한다.

```
val got_milk = true
val got_bread = false
val has_breakfast = got_milk andalso got_bread
val has_something = got_milk orelse got_bread
val is_sad = not(has_something);
```

#### 문자열
- 문자 하나만 사용할 때는 `#`을 사용한다.
- 문자를 연결할 때는 `^`를 사용한다.
- 문자를 출력할 때는 바로 `print <Variable>` 형태로 사용할 수 없다. 항상 `val _ = print <Variable>` 형태로 사용한다.

##### 예제코드
```
val foo = "Hello World!\n"
val one_letter = #"a"
val combined = "Hello " ^ "World!" ^ "\n"

val _ = print foo
val _ = print combined;
```

##### 실행결과
```
Hello World!
Hello World!
val foo = "Hello World!\n" : string
val one_letter = #"a" : char
val combined = "Hello World!\n" : string
```

#### 함수
함수는 `fun`으로 선언한다. `fun <함수명> <인자> = <반환값>` 형태로 이뤄진다.

##### 예제코드
```
fun is_large x = x > 10
val some_answer = is_large(11) (* true *)
val some_answer2 = is_large 11; (* true *)
```

##### 실행결과
```
val is_large = fn : int -> bool
val some_answer = true : bool
```

인자를 괄호(`()`)로 묶어서 사용하는 것도 가능하다.

##### 예제코드
```
- fun is_large (x) = x > 10
= val some_answer = is_large(11);
```

##### 실행결과
```
val is_large = fn : int -> bool
val some_answer = true : bool
```

### 참고자료
- https://en.wikipedia.org/wiki/Modular_programming
- https://learnxinyminutes.com/docs/standard-ml/
- https://en.wikipedia.org/wiki/Standard_ML
- http://www.smlnj.org/doc/interact.html
- http://www.smlnj.org/doc/FAQ/usage.html#loadFile