### Composing functionality With the New Vue Apis
> https://www.vuemastery.com/conferences/connect-tech-2019/composing-functionality-with-the-new-vue-apis

#### What is the goal of the composition API?
- Portable functionality
- Composable abstractions

#### The Main Benefits
- Explicit extraction of logic, including stateful logic
- Feature based organization vs. Option-based organization

### 상태관리
> https://www.vuemastery.com/conferences/connect-tech-2019/managing-state-in-vuejs

#### What is Vuex?
- Store Model for State
- Reduces the paths where data is mutated
- Introduces more concepts (complexity)

#### Flow
```
Vue Components =[Dispatch]=> Actions =[Commit]=> 
Mutations =[Mutate]=> State =[Render]=> Vue Components
```

Vue 컴포넌트의 상태관리는 Vuex를 통해서 한다.


### 컴포넌트 디자인 패턴
> https://www.vuemastery.com/conferences/connect-tech-2019/fundamental-component-design-patterns/

#### [Props-based solution] Problems
- New requirements increase complexity
- Multiple responsibilities
- Lots of conditionals in the template
- Low flexibility
- Hard to maintain

#### Use slots for:
- Content distribution (like layouts)
- Creating larger components by combining smaller components
- Default content in Multi-page Apps
- Providing a wrapper for other components
- Replace default component fragments

#### Use scoped slots for:
- Applying custom formatting/template to fragments of a component
- Creating wrapper components
- Exposing its own data and methods to child components

#### Slots(Composition) > Props(Configuration)
- Slots: With composition, you're less restricted by what you are building at first.
- Props: With configuration, you have to document everything and new requirements means new configuration

#### Container (What is it doing?)
> Examples: UserProfile, Product, TheShoppingCart, Login

- Application logic
- Application state
- Use Vuex
- Usually Router views

#### Presentational (How does it look?)
> Examples: AppButton, AppModal, TheSidebar, ProductCard

- Application UI and styles
- UI-related state only
- Receive data from props
- Emit events to containers
- Reusable and composable
- Not relying on global state

Props를 통한 컴포넌트 디자인은 복잡하다. Slot을 통해 해결할 수 있다.

Scoped slots을 사용하면 자식 컴포넌트에 전달한 상태를 부모에서 사용할 수있다. 반복에 대한 처리를 자식에서 하고 부모는 어떤 것을 표시할지 선택할 수 있다.

마지막장쯤에는 언제 리팩토링이 필요한가에 대한 내용도 다룬다.