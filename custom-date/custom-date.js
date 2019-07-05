class CustomDate extends Date {
  addDate (count) {
    this.setDate(this.getDate() + count)
  }
  subtractDate (count) {
    this.addDate(-count)
  }
  isSame (date) {
    return this.getId() === date.getId()
  }
  getId () {
    return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`
  }
  static create (...args) {
    return new CustomDate(...args)
  }
}

module.exports = CustomDate