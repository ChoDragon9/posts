import {component} from './core/component'
import {TodoItem} from './TodoItem'
import {store} from './store'

export const TodoList = component({
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
      ['todo-item', TodoItem]
    ]
  }
})
