import {createStore, component} from './helper'
import {createTodoItem} from './TodoItem'

const store = createStore()

export const createTodoList = component({
  template () {
    return `<div>
      <form>
          <input type="text" placeholder="enter task">
          <input type="submit" value="add">
      </form>
      -------
      <todo-item></todo-item>
      -------
      <todo-item></todo-item>
    </div>`
  },
  events () {
    return [
      ['form', 'onsubmit', 'addItem']
    ]
  },
  methods ({dom}) {
    return {
      addItem (event) {
        event.preventDefault()
        const input = dom.querySelector('input[type="text"]')
        const todo = store.get('todo').map(({contents}, index) => {
          return { id: index, contents }
        })
        todo.push({
          id: todo.length,
          contents: input.value
        })
        store.set('todo', todo)
        input.value = ''
      }
    }
  },
  components () {
    return [
      ['todo-item', createTodoItem, {store}]
    ]
  },
  beforeCreate ({parentState}) {
    store.set('todo', parentState.todo)
  }
})
