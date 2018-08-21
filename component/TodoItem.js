import {parseHTML} from './helper'

class TodoItem {
  constructor (state) {
    this._dom = null
    this._state = state
  }
  get template () {
    let list = ''

    if (this._state) {
      const items = this._state.reduce((result, txt) => {
        return `${result}<li>${txt}</li>`
      }, '')
      list = `<ul>${items}</ul>`
    }

    return `<div>${list}</div>`
  }
  render () {
    this._dom = parseHTML(this.template)
    return this._dom
  }
}

export default TodoItem
