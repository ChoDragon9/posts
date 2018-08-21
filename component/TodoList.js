import {parseHTML, bindEvent, createStore, bindComponent} from './helper'
import {createTodoItem} from './TodoItem'

export const createTodoList = ({initState}) => {
  let dom = null
  const store = createStore()
  const template = () => {
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
  }
  const mount = () => {
    store.set('todo', initState.todo)
    dom = parseHTML(template())
    bindEvent(events, methods, dom)
    bindComponent(components(), dom)
    return dom
  }
  const methods = {
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
  const events = [
    ['form', 'onsubmit', 'addItem']
  ]
  const components = () => {
    return [
      ['todo-item', createTodoItem, {store}]
    ]
  }

  return mount()
}
