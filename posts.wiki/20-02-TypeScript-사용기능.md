### 글의 목적
인하우스 서비스 구축하며 사용했던 TypeScript의 문법들을 정리한다. 어떤 것을 알고 있는 지 식별하기 위함과 생산성을 위한 최소한의 문법들을 정리하기 위함이다.

### 기본 타입
> [Basic Types](http://www.typescriptlang.org/docs/handbook/basic-types.html)

```ts
const canDelete: boolean = false
const num: number = 0
const str: string = 'string'
const strArr: string[] = ['string', 'string']
const tuple: [string, number] = ['string', 0]
const nullType: null = null
const undefinedType: undefined = undefined
const obj: object = {key: 'value'}
```
```ts
enum Phase {
  Sandbox = 'sandbox',
  Beta = 'beta',
  Production = 'production'
}
```
```ts
let anyType: any = 0 // anything
anyType = 'string' // Ok
anyType = ['string'] // Ok
```

> [Type assertions](http://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions)는 특정 DOM 타입을 사용할 때 유용하다.

```ts
const str: any = 'this is a string'
const len: number = (str as string).length
```

### 사용자 타입 정의
#### function
> [Function Types](http://www.typescriptlang.org/docs/handbook/functions.html#function-types)

```ts
const add: (x: number, y: number) => number = (x, y) => x + y
```

#### Interface
> [Interfaces](http://www.typescriptlang.org/docs/handbook/interfaces.html)

```ts
interface DateOption {
  readonly year: number
  month: number
}

interface CalendarOption extends DateOption {
  day: number
}
```

#### class
> [Class Expressions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-6.html#class-expressions)

```ts
class ToggleHelper {
  private state: boolean
  private constructor(state: boolean) {
    this.state = state
  }
  static create(state = false): ToggleHelper {
    return new ToggleHelper(state)
  }
  on(): void {
    this.state = true
  }
  off(): void {
    this.state = false
  }
  toggle(): void {
    this.state = !this.state
  }
  get isOn(): boolean {
    return this.state
  }
}

// new ToggleHelper() Error!
ToggleHelper.create() // Ok
```

#### namespace
> [namespace](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-5.html#namespace-keyword)

```ts
namespace MyBackendApi {
  interface Request {}
  interface Response {}
}
```

#### Generic
> [Generic](http://www.typescriptlang.org/docs/handbook/generics.html#introduction)

```ts
type NoticeKey<T> = {
  notice_key: T
}

type SingleNoticeKey = NoticeKey<number>
type MultiNoticeKey = NoticeKey<number[]>
```

#### type
> [Type Aliases](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-4.html#type-aliases)

```ts
type Callback = () => void
type SingleNoticeKey = NoticeKey<number>
type MultiNoticeKey = NoticeKey<number[]>
```

#### declare
> [Reusable Types Interfaces](http://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#reusable-types-interfaces)

```ts
declare namespace GetNotice {
  interface Request {}
  interface Response {}
}
declare namespace GetNoticeList {
  interface Request {}
  interface Response {}
}
```

### 타입 조합하기
#### Intersection Types
> [Intersection Types](http://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types)

```ts
interface YearField {
  year: number
}
interface MonthField {
  month: number
}
interface DayField {
  day: number
}

type DateOption = YearField & MonthField & DayField

const option: DateOption = {
  year: 2020,
  month: 2,
  day: 10,
}
```

#### Union Types
> [Union Types](http://www.typescriptlang.org/docs/handbook/advanced-types.html#union-types)

```ts
let option: DateOption | null = null
option = {
  year: 2020,
  month: 2,
  day: 10,
}
```

#### keyof
> [keyof and lookup types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)

```ts
type DateOptionKey = keyof DateOption

const keys: DateOptionKey[] = [
  'year', 'month', 'day'
]
const keys2: DateOptionKey[] = [
  'seconds' // Wrong
]
```

#### key 선언
```ts
interface ReadonlyDictionary {
  readonly [key: string]: any
}

const API_CONFIG: ReadonlyDictionary = {
  PROTOCOL: 'https',
  HOST: 'my.api.com',
  PORT: '443',
}

API_CONFIG.PROTOCOL = 'http' // Wrong!
```
```ts
enum Phase {
  Sandbox = 'sandbox',
  Beta = 'beta',
  Production = 'production'
}

type PhaseHost = {
  readonly [key in Phase]: string
}

const PHASE_CONFIG: PhaseHost = {
  [Phase.Sandbox]: 'my-sandbox.api.com',
  [Phase.Beta]: 'my-beta.api.com',
  [Phase.Production]: 'my.api.com',
  'cbt': 'my-cbt.api.com' // Wrong
}
```

### Mapped Types
> [Partial](http://www.typescriptlang.org/docs/handbook/utility-types.html#partialt)

```ts
interface DateOption {
  year: number
  month: number
  day: number
}

type DateOptionPartial = Partial<DateOption>

const yearKey: DateOptionPartial = {
  year: 2020
}
const monthKey: DateOptionPartial = {
  month: 2
}
const calendarOption: DateOptionPartial = {
  year: 2020,
  month: 2
}
const selectedDay: DateOptionPartial = {
  year: 2020,
  month: 2,
  day: 10
}
```

> [Pick](http://www.typescriptlang.org/docs/handbook/utility-types.html#picktk)

```ts
interface DateOption {
  year: number
  month: number
  day: number
}

const calendarTitle: Pick<DateOption, 'year' | 'month'> = {
  year: 2020,
  month: 2,
  day: 10 // Wrong
}
```

### Postfix
#### Definite Assignment Assertions
> [Definite Assignment Assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#definite-assignment-assertions)

```ts
// Wrong
let x: {num: number}
init()
const y = x.num + x.num
function init() {
  x = {num: 1}
}

// Ok
let x!: {num: number}
init()
const y = x.num + x.num // Wrong
function init() {
  x = {num: 1}
}
```

#### Optional parameters and properties
> [Optional parameters and properties](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#optional-parameters-and-properties)

```ts
interface DateOption {year: number, month: number}

function toTitle(dateOption?: DateOption): string {
  return  dateOption ? `${dateOption.year}.${dateOption.month}` : ''
}

const option: DateOption = {year: 2020, month: 2}
toTitle(option) // '2020.2'
toTitle() // ''
```

### 논외
TypeScript 버전에 따른 추가된 문법 정리.

- [v3.7 Nullish Coalescing](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing)
- [v3.7 Assertion Functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)
- [v3.0 New unknown top type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)
- [v2.8 Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#conditional-types)
- [v2.3 Async Iteration](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html#async-iteration)
- [v2.1 Object Spread and Rest](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#object-spread-and-rest)
- [v1.7 ES7 exponentiation operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html#es7-exponentiation-operator)
- [v1.6 ES6 Generators](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-6.html#es6-generators)
- [v1.6 Experimental support for async functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-6.html#experimental-support-for-async-functions)
- [v1.5 ES6 Modules](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-5.html#es6-modules)
- [v1.5 let end const support](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-5.html#let-and-const-support)

### 끄읕
