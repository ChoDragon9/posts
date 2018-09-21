const Stack = class {
  constructor (val = null, back = null) {
    this.state = {val, back, key: null}
  }
  getValue () {
    return this.state.val
  }
  setValue (value) {
    const {key, val} = this.state
    if (Array.isArray(val)) {
      val.push(value)
    } else {
      if(val) {
        if (key) {
          val[key] = value
          this.state.key = null
        } else {
          this.state.key = value
        }
      } else {
        this.state.val = value
      }
    }
  }
  forword (val) {
    this.setValue(val)
    const back = this.state
    this.state = {val, back, key: null}
  }
  backword () {
    this.state = this.state.back
  }
}

module.exports = Stack