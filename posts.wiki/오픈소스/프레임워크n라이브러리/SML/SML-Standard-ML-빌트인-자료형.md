### 리스트
> 리스트는 메모리상에서 연속적으로 값이 할당된 자료형이다.

리스트를 선언할 때는 자바스크립트와 유사하게 선언 가능하다.

```
val numbers = [1, 3, 3, 7, 229, 230, 248]  (* : int list *)
val names = [ "Fred", "Jane", "Alice" ]    (* : string list *)
val groups = [ [ "Alice", "Bob" ],
               [ "Huey", "Dewey", "Louie" ],
               [ "Bonnie", "Clyde" ] ]     (* : string list list *)
```

#### 리스트 사이즈
내장 함수인 `List.length` 를 통해 리스트의 길이를 구할 수 있다.

##### 예제코드
```
val numbers = [1, 2, 3]
val count = List.length numbers
```

##### 실행결과
```
[autoloading]
[library $SMLNJ-BASIS/basis.cm is stable]
[library $SMLNJ-BASIS/(basis.cm):basis-common.cm is stable]
[autoloading done]
val numbers = [1,2,3] : int list
val count = 3 : int
```

#### 리스트 값 추가
- 앞으로 추가할 때는 `::` 연산자를 사용한다.
- 리스트를 병합하고 싶을 때는 `@` 연산자를 사용한다.

##### 예제코드
```
val numbers = [1, 2, 3]
val front_numbers = 0 :: numbers
val back_numbers = numbers @ [4]
```

##### 실행결과
```
val numbers = [1,2,3] : int list
val front_numbers = [0,1,2,3] : int list
val back_numbers = [1,2,3,4] : int list
```

### 이름있는 튜플
> 자바스크립트의 [객체리터럴](https://www.w3schools.com/js/js_objects.asp)을 사용하는 것과 유사하다.

- 튜플을 정의할 때는 `{ <name>=<value> }` 형태로 정의한
다.
- 튜플의 값을 접근할 때는 `#<name> <tuple>` 형태로 사용한다.

##### 예제코드
```
val rgb = { r=0.23, g=0.56, b=0.91 }
val r = #r rgb
```

##### 실행결과
```
val rgb = {b=0.91,g=0.56,r=0.23} : {b:real, g:real, r:real}
val r = 0.23 : real
```