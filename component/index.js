import {getElem} from './helper'
import TodoList from './TodoList'

const todoList = new TodoList().render()

getElem('#container').appendChild(todoList)
