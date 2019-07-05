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

// addDate(count: number)
// subtractDate(count: number)
// format (fn) => fn({year: string, month: string, date: string, hours: string, minutes: string, seconds: string})
// isSameDay(): boolean
// isSameMonth(): boolean
// isSameYear(): boolean
// isLeapYear(): boolean
// getDateString(): YYYY-MM-DD
// getDateRange(date: CustomDate): number
// getDatePeriod(date: CustomDate): number
// getLastDay(): number
// getYesterday(): CustomDate
// compareYear(date: CustomDate): number
// compareMonth(date: CustomDate): number
// compareDate(date: CustomDate): number
// compareHours(date: CustomDate): number
// compareMinutes(date: CustomDate): number
// compareSeconds(date: CustomDate): number
// durationMonth(date: CustomDate): {month, date}
// static create(...args): CustomDate

module.exports = CustomDate