/**
 * 이벤트 조작 객체
 */
module.exports = {
  bindEvent (name, callback) {
    return (element) => {
      element.addEventListener(name, callback)
      return element
    }
  },
  unbindEvent (name, callback) {
    return (element) => {
      element.removeEventListener(name, callback)
      return element
    }
  },
  bindBodyEvent (name, callback) {
    return this.bindEvent(name, callback)(document.body)
  },
  unbindBodyEvent (name, callback) {
    return this.unbindEvent(name, callback)(document.body)
  }
}
