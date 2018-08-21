import {getElem} from './helper'
import {createTodoList} from './TodoList'

export default () => {
  const initState = {
    todo: [
      { id: 0, contents: 'asdasdad' },
      { id: 1, contents: 'asdasdad' },
      { id: 2, contents: 'asdasdad' }
    ]
  }
  const todoList = createTodoList({initState})
  getElem('#container')[0].appendChild(todoList)
}
