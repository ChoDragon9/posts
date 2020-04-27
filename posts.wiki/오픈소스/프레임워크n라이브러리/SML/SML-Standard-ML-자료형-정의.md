### 자료형 정의
자료형 정의는 `datatype`으로 정의한다. 자료형으로 정의된 형은 네임스페이스 없이 바로 접근 가능하다.

```
datatype color = Red | Green | Blue

fun say Red = "You are red!"
  | say Green = "You are green!"
  | say Blue = "You are blue!"

val _ = print (say(Red) ^ "\n")
val _ = print (say(Green) ^ "\n")
val _ = print (say(Blue) ^ "\n")
```

##### 실행 결과
```
You are red!
You are green!
You are blue!
datatype color = Blue | Green | Red
val say = fn : color -> string
```

### Binary Tree 정의
- `'a btree * 'a * 'a btree`는 인자를 3개 받는 것을 의미한다. 순서대로 `'a btree`, `'a`, `'a btree` 인자를 받는 다.
- btree 명의 타입을 정의한다. 'a는 다형성을 의미한다.

```
datatype 'a btree = Leaf of 'a
                  | Node of 'a btree * 'a * 'a btree

val myTree = Node (Leaf 9, 8, Node (Leaf 3, 5, Leaf 7))

val strTree = Node (Leaf("B"), "A", Node (Leaf("D"), "C", Leaf("E")))
```

##### 실행 결과
```
val myTree = Node (Leaf 9,8,Node (Leaf #,5,Leaf #)) : int btree
val strTree = Node (Leaf "B","A",Node (Leaf #,"C",Leaf #)) : string btree
```

#### 숫자값 모두 더하기
```
datatype 'a btree = 
    Leaf of 'a
  | Node of 'a btree * 'a * 'a btree

val myTree = Node (
  Leaf(9),
  8,
  Node (
    Leaf(3),
    5,
    Leaf(7)
  )
)

fun count (Leaf n) = n
  | count (Node (left, n, right)) = count(left) + n + count(right)

val myTreeCount = count(myTree)
```

##### 실행결과
```
datatype 'a btree = Leaf of 'a | Node of 'a btree * 'a * 'a btree
val myTree = Node (Leaf 9,8,Node (Leaf #,5,Leaf #)) : int btree
val count = fn : int btree -> int
val myTreeCount = 32 : int
```