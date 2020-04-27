```ts
type ElemType<T> = T extends (infer E)[] ? E : never;
```

```ts
type PropType<T, K extends keyof T> = T extends { [P in K]?: (infer R) }
  ? R
  : never;
function copyIfExist<
  F extends Pick<T, K>,
  T,
  FV extends PropType<F, K> & TV,
  TV extends PropType<T, K>,
  K extends keyof (F | T)
>(from: F, to: T | F, key: K) {
  if (key in from) {
    to[key] = from[key];
  }
}
```