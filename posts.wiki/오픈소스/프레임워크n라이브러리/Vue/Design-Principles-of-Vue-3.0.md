> https://www.youtube.com/watch?v=WLpLYhnGqPA&feature=youtu.be

### The Challenges of Designing Vue
#### Vue has an extremely diverse audience
- Beginners just progressing from HTML & CSS
- Professionals moving an from jQuery
- Veterans migrating from another framework
- Backend engineers looking for lightweight frontend solution
- Architects choosing the foundation for entire organization

#### Vue has extremely diverse use cases
- Sprinkling interactivity onto legacy applications
- One-off projects that demands fast turn-around but no long-term maintenance concerns
- Medium scale projects where complexity cap is predictable
- Large scale projects expected to last for years, with team movement

#### Design involves Resolving Trade-offs
- API optimized for "easy-ness" leads to maintainability issues at scale
- Heavy tooling raises barrier of entry and limits use cases
- More features leads to more bloat

### Approachability vs. Scalability
#### CDN build & Vue CLI
#### Options API & Composition API
> Why introduce "another way of doing things?"

##### Options API
- Intuitive and easy to get started with
- Scalability issues in large scale applications

##### Composition API
- Purely additive
- Can be used alongside Options API
- Provides more flexible code organization & logic reuse capabilities
- Provides excellent TypeScript support

#### TypeScript vs. JavaScript
> Is TypeScript really necessary?

##### Why TypeScript
- Pro: excellent IDE support for auto-completion and type information
- Pro: confidence when refactoring old code in large projects
- Cons: learning cost
- Cons: slower initial development

#### In Vue 3
- TypeScript definitions benefit JavaScript users as well
- Component code using TypeScript and JavaScript will look largely the same

#### The bottleneck of traditional Virtual DOM
- Although Vue can ensure minimal updates at the component tree level, it's still a full diff inside each component instance.
- The performance of traditional VDOM is determined by the total size of the template rather than the amount of dynamic content in it.
- Fully dynamic render logic makes it very difficult to make safe assumptions about user intent for maximum AOT optimization.
- **With the new strategy**,  update performance is determined by the amount of dynamic content instead of total template size.

### Power vs. Size
#### The dilemma of Vue 2
> every new feature increases bundle size of every user

#### In Vue 3
- Most Global APIs and internal helpers are provided as ES modules exports (tree-shakable)
- The compiler generates tree-shakable code for your template as well
- Don't pay for features you never use

### Framework Coherence vs. Low-level Flexibility
- Libraries vs. Framework
- Primitives vs. Abstractions
- Bazaar vs. Cathedral

#### Small Scope Pros
- Fewer concepts to get started with
- More flexibility and more userland opportunities -> active ecosystem
- Smaller maintenance surface -> team can focus on exploring new ideas

#### Small Scope Cons
- More plumbing work needed when solving inherent complex problems with simple concepts
- Patterns naturally emerge over time and become semi-required knowledge, but often not officially documented.
- Ecosystem moving too fast can lead to fragmentation and constant churn

#### Large Scope Pros
- Most common problems can be solved with built-in abstractions
- Centralized design process ensures consistent and coherent ecosystem

#### Large Scope Cons
- Higher upfront learning barrier
- Inflexible if built-in solution doesn't fit use case
- Larger maintenance surface makes introducing fundamental new ideas much more costly

#### "Progressive" Scope
- A layered design that allows features to be opted-in in a progressive manner
- Layer
  - Declarative Rendering => Component System => Client-Side Routing => Large Scale State Management => Build System => Client-Server Data Persistence
- Low entry learning barrier
- Documented solutions for common problems

#### In Vue 3
- The same coherent experience as Vue 2
  - Router, Vuex & test-utils will receive respective updates to align with this vision
- Even more lower-level flexibilities
  - First-class custom renderer and custom compiler APIs