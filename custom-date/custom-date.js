const toLong = num => `${num < 10 ? '0': ''}${num}`

const LAST_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const LEAP_YEAR = 2000
const LEAP_YEAR_PERIOD = 4
const LEAP_YEAR_LAST_DATE = 29
const MAX_RANGE = 365

class BeeDate extends Date {
	clone() {
		return BeeDate.create(+this)
	}

	addDate(count) {
		const clonedDate = this.clone()
		clonedDate.setDate(clonedDate.getDate() + count)
		return clonedDate
	}

	subtractDate(count) {
		return this.addDate(-count)
	}

	getYesterday () {
		return this.subtractDate(1)
	}

	formatDate (delimiter = '-') {
		return this.format(({year, month, date}) => {
			return [year, month, date].join(delimiter)
		})
	}

	formatTime (delimiter = ':') {
		return this.format(({hours, minutes, seconds}) => {
			return [hours, minutes, seconds].join(delimiter)
		})
	}

	format(mapper) {
		const year = String(this.getFullYear())
		const month = toLong(this.getMonth() + 1)
		const date = toLong(this.getDate())
		const hours = toLong(this.getHours())
		const minutes = toLong(this.getMinutes())
		const seconds = toLong(this.getSeconds())
		return mapper({year, month, date, hours, minutes, seconds})
	}

	range(afterDate) {
		if (this > afterDate) {
			return []
		}
		const dates = []
		let limit = 0
		let date = this.clone()

		dates.push(date)
		while (!afterDate.isSameDate(date) && ++limit < MAX_RANGE) {
			date = date.addDate(1)
			dates.push(date)
		}

		return dates
	}

	isSameDate(date) {
		return this.isSameMonth(date) &&
			this.getDate() === date.getDate()
	}

	isSameMonth(date) {
		return this.isSameYear(date) &&
			this.getMonth() === date.getMonth()
	}

	isSameYear(date) {
		return this.getFullYear() === date.getFullYear()
	}

	isLeapYear() {
		const diffYear = Math.abs(this.getFullYear() - LEAP_YEAR)
		return diffYear % LEAP_YEAR_PERIOD === 0
	}

	getLastDate() {
		if (this.isLeapYear()) {
			return LEAP_YEAR_LAST_DATE
		}
    return LAST_DAYS[this.getMonth()]
  }

	static create(value) {
		if (value) {
			return new BeeDate(value)
		}
    return new BeeDate()
	}

	static createFromDate(year, month, date, hours, minutes, seconds, ms) {
		const args = [year, month, date, hours, minutes, seconds, ms]
			.filter(v => v !== undefined)
		return new BeeDate(...args)
	}
}


module.exports = {BeeDate}