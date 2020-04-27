### 예외처리
예외처리는 `raise`로 정의한다.

```
fun calc (n) = if n < 0.0
               then raise Domain
               else n * 1.04
val balance = calc(~10.0)
```

##### 실행 결과
```
uncaught exception Domain [domain error]
  raised at: stdIn:312.27-312.33
```

#### 예외 핸들링
예외 핸들링은 `handle`로 정의한다.

```
fun calc (n) = if n < 0.0
               then raise Domain
               else n * 1.04
val balance = calc(~10.0)
              handle Domain => ~10.0
```

##### 실행 결과
```
val calc = fn : real -> real
val balance = ~10.0 : real
```