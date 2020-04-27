> 참고 사이트 : https://infoscis.github.io/2017/06/19/TypeScript-handbook-advanced-types/

- Union Type : 여러 타입을 지정할 때 사용한다.
```ts
const merge = (a: string | number, b: string | number): string => `${a}${b}`
```
- instanceof : 타입 처리 범위를 좁힐 때 사용한다.
```ts
type Name = string
type Age = number

if (str instanceof Name) {
 // Name만 확인
}
if (str instanceof Age) {
 // Age만 확인
}
```
- Alias : 타입을 참조하는 새이름을 작성한다. 커스텀 타일을 통해 새로운 커스텀 타입이 필요할 때 사용
```ts
type Name = string
type Age = number
type Info = Name | Age // Alias
```