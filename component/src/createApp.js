import {component} from './core/component'
import {TodoList} from './TodoList'

export const createApp = component({
  template () {
    return `<div>
      <todo-list></todo-list>
    </div>`
  },
  components () {
    return [
      ['todo-list', TodoList]
    ]
  }
})