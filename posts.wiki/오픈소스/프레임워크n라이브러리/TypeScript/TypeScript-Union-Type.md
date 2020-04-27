> 대수학은 수를 대신해서 문자를 사용하는 방법을 의미한다.<br>
> 대표적으로 방정식이 있다. x + 10 = 15 일 때 x는 5이다.

> 대수적 타입([Algebraic Data Type](https://en.wikipedia.org/wiki/Algebraic_data_type))은 두개 이상의 자료형의 값을 가지는 자료형이다.
> 대수적 타입을 사용하는 언어는 패턴 매칭을 통해 자료형의 생성자를 얻을 수 있다.

#### Union Type 정의
Union Type은 [TypeScript에서 대수적 타입](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions)을 정의하는 방법이다. Union Type은 두개 이상의 자료형의 값을 가지는 자료형이다. 두개 이상의 자료형을 가지기 때문에 타입 정의 시 두개 이상의 타입들을 조합해서 정의한다.

다수의 자료형이 있으면,
```ts
interface Square {
  kind: 'square'
  size: number
}
interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}
interface Circle {
  kind: 'circle'
  radius: number
}
```

Union Type은 이렇게 정의한다.
```ts
type Shape = Square | Rectangle | Circle
```

#### Union Type 사용
대수적 타입을 다루는 언어에서는 [패턴 매칭](https://dev-momo.tistory.com/entry/%ED%8C%A8%ED%84%B4-%EB%A7%A4%EC%B9%ADPattern-Matching-in-JavaScript)을 통해 자료형을 구분한다.
예를 들어 Shape를 사용할 때, Square, Rectangle, Circle 중 어떤 자료형인지 분기 후 사용한다.

하지만 TypeScript는 아직 패턴 매칭을 지원하지 않기 때문에 직접 값을 확인해서 자료형을 구분한다. 이 때 TypeScript는 [타입 추론](https://www.typescriptlang.org/docs/handbook/type-inference.html#contextual-typing)을 통해 각 자료형을 추론하게 된다.
```ts
const area = (shape: Shape) => {
  switch (shape.kind) {
    case 'square': return shape.size * shape.size;
    case 'rectangle': return shape.height * shape.width;
    case 'circle': return Math.PI * shape.radius ** 2;
  }
}
```

#### Union Type 사용 예
먼저 Union Type을 사용하지 않을 때 상황이다. Rectangle 자료형을 사용하는 Sketchbook 클래스가 있다. clear 메소드를 통해 rectangle를 비운다.
```ts
interface Rectangle {
  width: number
  height: number
}

class Sketchbook {
  private rectangle: Rectangle
  constructor(rectangle: Rectangle) {
    this.rectangle = rectangle
  }
  clear() {
    this.rectangle = {
      width: 0,
      height: 0
    }
  }
}
```
rectangle의 자료형을 비워 할당할 경우 이러한 단점이 있다.

- 자료형에 프로퍼티가 추가 시: clear 메소드에 프로퍼티를 추가
- 자료형이 비워졌음을 확인: 각 프로퍼티의 값을 확인

이번에는 Union Type으로 비워졌음을 의미하는 타입을 할당한 경우이다. 비워졌을 때 null 타입을 사용한다.

```ts
interface Rectangle {
  width: number
  height: number
}

type Empty = null

class Sketchbook {
  private rectangle: Rectangle | Empty
  constructor(rectangle: Rectangle) {
    this.rectangle = rectangle
  }
  clear() {
    this.rectangle = null
  }
}
```
Union Type을 사용하기 전과 비교했을 때 이러한 장점이 있다.

- 자료형에 프로퍼티가 추가 시: null로 할당
- 자료형이 비워졌음을 확인: null 체크