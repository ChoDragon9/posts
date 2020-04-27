### 모듈 시스템
SML은 모듈 시스템으로 계층적이고 조직화된 구조를 구축할 수 있다. 논리적으로 관련딘 유형 그리고 값 선언 요소들을 정의할 수 있다. SML의 모듈 시스템은 네임스페이스, 추상 자료형, 구현을 정의할 수 있는 모듈을 제공한다.

SML의 모듈 시스템은 세 가지 주요 구문 구조로 이뤄진다.
`structure`, `signature` 그리고 `functor`이다.

`structure`는 타입, 예외, 값, 서브 `structure`로 구성된 **구현**을 정의하는 모듈이다.

`signature`는 `structure`의 **타입**을 정의한다. `structure`에서 제공하는 기능을 모두 `signature`에 정의한다.

`functor`는 **구현**을 정의하는 **함수**이다. `functor`는 `signature`의 `structure`인 하나 이상의 인수를 받아들이고 그 결과로 `structure`를 생성한다. `functor`는 일반적인 데이터 구조와 알고리즘을 구현하는데 사용된다.

아래에서 예제를 통해 자세히 알아보자.

### Signature
`signature`는 [TypeScript의 interface](https://www.typescriptlang.org/docs/handbook/interfaces.html)과 유사하게 인터페이스를 정의한다. 약간의 다른 점은 `namespace`처럼 내부에서 `type`을 정의할 수 있고, 내부에 정의된 모든 것은 밖에서 접근할 수 없다.

`signature <Name> = sig <Interface> end` 형태로 정의한다.

```
signature RAT =
sig
  type rat
  exception DivisionByZero
  val makeRat : int * int -> rat
  val plus : rat * rat -> rat
  val minus : rat * rat -> rat
  val times : rat * rat -> rat
  val inverse : rat -> rat
  val toString : rat -> string
end
```

#### anonymous signature
`signature`를 정의하지 않고 `sig ... end`를 정의하여, `structure`에 사용할 수 있다. 이를 익명 시그니처(anonymous signature)라고 부른다.

```
structure Rat :
  sig
    type rat
    exception DivisionByZero
    val makeRat : int * int -> rat
  end
= struct (* implementation here *) end
```

### Structure
`structure`는 Class와 유사하게 구현을 정의한다. 다른점은 내부적으로 `type`을 정의할 수 있고, `signature`와 함께 정의하여 모든 것을 접근할 수 있다.

`structure <Name>: <Signature Name> = struct <Implementation> end` 형태로 정의한다.

```
structure Rat : RAT =
  struct
    type rat = int * int
    exception DivisionByZero

    fun gcd(0, m) = m
      | gcd(n, m) = gcd(m mod n, n)
    fun makeRat (_, 0) = raise DivisionByZero
      | makeRat (x, y) = 
        if y < 0 then makeRat (~x, ~y)
        else let val g = gcd(y,x) in
          (x div g, y div g)
        end
    fun plus ((x, y), (z, t)) = makeRat (x*t+z*y, y*t)
(* remaining functions ... *)
  end
```

#### signature없이 structure 정의
`signature` 없이 `structure`는 정의할 수 있다. `structure`에 정의한 모든 것은 외부에서 접근할 수 있다.

```
structure Rat = struct (* implementation *) end
```

#### anonymous structure
`structure`은 `struct <구현> end` 형태로 익명으로 정의할 수 있다.

```
structure Calc = Calculator (struct (* implementation here *) end)
```

#### unique structure
`:` 대신 `:>`사용하여 unique한 structure를 정의할 수 있다.
```
structure Rat :> RAT = struct ... end
```

### Functor
`functor`는 `structure`을 인자로 받아 새로운 `structure`를 반환한다. `functor`는 반환 타입은 `signature`로 정의되고 `struct ... end` 형태로 `structure`를 정의한다.

```
functor PQUEUE(type Item  
               val > : Item * Item -> bool  
              ):QueueSig =  
struct  
    type Item = Item  
    exception Deq  
    fun insert e [] = [e]:Item list  
      | insert e (h :: t) =  
        if e > h then e :: h :: t  
                 else h :: insert e t  
 
    abstype Queue = Q of Item list  
    with  
        val empty          = Q []  
        fun isEmpty (Q []) = true  
          | isEmpty _      = false  
 
        fun enq(Q q, e)    = Q(insert e q)  
        fun deq(Q(h :: t)) = (Q t, h)  
          | deq _          = raise Deq  
    end  
end;
```

##### 사용예제
```
structure IntPQ = PQUEUE(type Item = int  
                         val op >  = op > : int * int -> bool)
```

### 예제코드
#### 예제 1
##### example-1.sml
```
signature S =
sig
  type t
  val f : t -> t
  val x : t
end

structure S1: S =
struct
  type t = int
  val x = 0
  fun f (x) = x + 1
end
```

##### 실행결과
```
- use "example-1.sml";
[opening example-1.sml]
signature S =
  sig
    type t
    val f : t -> t
    val x : t
  end
structure S1 : S
val it = () : unit
- S1.f(5);
val it = 6 : S1.t
```

#### 예제 2
```
signature MySig =  
sig  
    val run : int * int -> int
end
  
structure Add: MySig =  
struct
    fun run (x, y) = x + y
end

functor toTwice(Something: MySig): MySig =
struct
    val argRun = Something.run
    fun run (x, y) = argRun(x, y) * 2
end

structure Mul = toTwice(Add)
```
##### 실행결과
```
- Add.run(2, 3);
val it = 5 : int
- Mul.run(2, 3);
val it = 10 : int
```

#### 참고자료
- https://piazza.com/class_profile/get_resource/hpo8fqgcnhr585/hulvgokntfk6my
- http://homepages.inf.ed.ac.uk/mfourman/teaching/mlCourse/notes/sml-modules.html
- https://www.smlnj.org/doc/ML-Yacc/mlyacc008.html