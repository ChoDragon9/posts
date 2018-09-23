import {component} from './helper'
import {createTodoList} from './TodoList'

export const createApp = component({
  state () {
    return {
      todo: [
        { id: 0, contents: 'asdasdad' },
        { id: 1, contents: 'asdasdad' },
        { id: 2, contents: 'asdasdad' }
      ]
    }
  },
  template () {
    return `<div>
      <todo-list></todo-list>
    </div>`
  },
  components ({state}) {
    return [
      ['todo-list', createTodoList, {state}]
    ]
  }
})