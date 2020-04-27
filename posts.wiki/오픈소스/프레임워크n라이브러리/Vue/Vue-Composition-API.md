### [Vue 3 Cheat Sheet](https://www.vuemastery.com/vue-3-cheat-sheet)

### [Why the Composition API](https://www.vuemastery.com/courses/vue-3-essentials/why-the-composition-api)

#### Why the Composition API?

- Limitations of Vue 2
- The Vue 3 solution

#### Vue 2

- Readability as components grow
- Code reuse patterns have drawbacks
- Limited TypeScript Support

#### The first limitation with Vue 2

- Large components can become hard to read & maintain
- Eventually we might want to add search filters and pagination.
  - Logical concerns (features) are organized by component option.
  - Options are:
    - components
    - props
    - data
    - computed
    - methods
    - lifecycle methods

##### Writing Composition Functions

```js
export default {
  setup() {
    return { ...useSearch(), ...useSorting() }
  }
}
function useSearch() {}
function useSorting() {}
```

- Composition Functions: `useSearch`, `useSorting`

#### The second limitation with Vue 2

- No perfect way to reuse logic between components
- How would we extract functionality? (Three ways in Vue 2)
  - Mixins
    - [Good] Organized by feature
    - [Bad] Conflict prone
    - [Bad] Unclear relationships
    - [Bad] Not easily reusable
  - Mixin Factories
    - [Desc] Functions that return a customized version of a mixin
    - [Good] Easily Reusable
    - [Good] Clearer Relationships
    - [Bad] Weak Namespacing
    - [Bad] Implicit property additions
    - [Bad] No instance access at runtime
  - Scoped Slots
    - [Good] Solves Mixin Problems
    - [Bad] Increase indentation
    - [Bad] Lots of configuration
    - [Bad] Less flexible
    - [Bad] Less performant

#### Composition Functions

- [Good] Less code
- [Good] Familiar functions
- [Good] Extremely flexible
- [Good] Tooling friendly
- [Bad] Advanced syntax

### [Composing Functionality With The New Vue APIs](https://www.vuemastery.com/conferences/connect-tech-2019/composing-functionality-with-the-new-vue-apis/)

> Composition API 목적, 라이브 코딩, Composition API 장점 순서로 설명

#### What is the goal of composition API?

- [Main] Composing Functionality
  - Portable Functionality
  - Composable abstractions

#### Why the new API?

- Current solutions
  - Mixins
  - Renderless components
- Issues with Mixins
  - Implicit property addition
  - Properties can conflict, and namespacing is messy
  - Managing logic within template is sketchy

### [Design Principles of Vue 3.0](https://youtu.be/WLpLYhnGqPA?t=710)

#### Options API & Composition API

> Why introduce "another way of doing things"

##### Options API

- Intuitive and easy to get started with
- Scalability issues in large scale applications

##### Composition API

- Purely additive
- Can be used alongside Options API
- Provides more flexible code organization & logic reuse capabilities
- Provides excellent TypeScript support