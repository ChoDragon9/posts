const {BeeDate} = require('./custom-date')

let result = true
const log = (txt, fn) => {
  console.log('------------------------')
  console.log(txt)
  try {
    if (fn()) {
      console.log('[SUCCESS] ', txt)
    } else {
      console.error('[FAIL] ', txt)
      result = false
    }
  } catch (e) {
    result = false
    console.error(e)
  }
  console.log('------------------------')
}

log('create - nothing', function () {
  const nowDate = new Date()
  const date = BeeDate.create()

  const result = [
    nowDate.getFullYear() === date.getFullYear(),
    nowDate.getMonth() === date.getMonth(),
    nowDate.getDate() === date.getDate(),
    nowDate.getHours() === date.getHours(),
    nowDate.getMinutes() === date.getMinutes(),
    nowDate.getSeconds() === date.getSeconds(),
  ].every(v => v)

  return result
})

log('create - timestamp', () => {
	const nowDate = new Date()
	const date = BeeDate.create(+nowDate)

	const result = [
		nowDate.getFullYear() === date.getFullYear(),
		nowDate.getMonth() === date.getMonth(),
		nowDate.getDate() === date.getDate(),
		nowDate.getHours() === date.getHours(),
		nowDate.getMinutes() === date.getMinutes(),
		nowDate.getSeconds() === date.getSeconds(),
	].every(v => v)

	return result
})

log('create - BeeDate', () => {
	const srcDate = BeeDate.create()
	const targetDate = BeeDate.create(srcDate)

	const result = [
		srcDate.getFullYear() === targetDate.getFullYear(),
		srcDate.getMonth() === targetDate.getMonth(),
		srcDate.getDate() === targetDate.getDate(),
		srcDate.getHours() === targetDate.getHours(),
		srcDate.getMinutes() === targetDate.getMinutes(),
		srcDate.getSeconds() === targetDate.getSeconds(),
	].every(v => v)

	return result
})

log('create - Date', () => {
	const nowDate = new Date()
	const date = BeeDate.create(nowDate)

	const result = [
		nowDate.getFullYear() === date.getFullYear(),
		nowDate.getMonth() === date.getMonth(),
		nowDate.getDate() === date.getDate(),
		nowDate.getHours() === date.getHours(),
		nowDate.getMinutes() === date.getMinutes(),
		nowDate.getSeconds() === date.getSeconds(),
	].every(v => v)

	return result
})

log('createFromDate - Year', () => {
	const date = BeeDate.createFromDate(2019)
	const result = date.getFullYear() === 1970
	return result
})

log('createFromDate - Year, Month', () => {
	const date = BeeDate.createFromDate(2019, 10)
	const result = [
	  date.getFullYear() === 2019,
    date.getMonth() === 10
  ]
	return result.every(v => v)
})

log('createFromDate - Year, Month, Date', () => {
	const date = BeeDate.createFromDate(2019, 1, 2)
	const result = [
		date.getFullYear() === 2019,
		date.getMonth() === 1,
    date.getDate() === 2
	]
	return result.every(v => v)
})

log('clone', () => {
	const date = BeeDate.create()
	const clonedDate = date.clone()

	const result = [
		clonedDate.getFullYear() === date.getFullYear(),
		clonedDate.getMonth() === date.getMonth(),
		clonedDate.getDate() === date.getDate(),
		clonedDate.getHours() === date.getHours(),
		clonedDate.getMinutes() === date.getMinutes(),
		clonedDate.getSeconds() === date.getSeconds(),
	].every(v => v)

	return result
})

log('addDate', () => {
	const date = BeeDate.createFromDate(2019, 1, 1)
	const addedDate = date.addDate(5)

	const result = [
		date !== addedDate,
		addedDate.getMonth() === date.getMonth(),
		addedDate.getDate() === 6
	]

	return result.every(v => v)
})

log('subtractDate', () => {
	const date = BeeDate.createFromDate(2019, 1, 10)
	const addedDate = date.subtractDate(5)

	const result = [
		date !== addedDate,
		addedDate.getMonth() === date.getMonth(),
		addedDate.getDate() === 5
	]

	return result.every(v => v)
})

log('getYesterday', () => {
	const date = BeeDate.createFromDate(2019, 1, 2)
	const yesterday = date.getYesterday()

	const result = [
		date !== yesterday,
    yesterday.getDate() === 1,
	]

	return result.every(v => v)
})


log('formatDate - YYYY-MM-DD', () => {
	const date = BeeDate.createFromDate(2019, 1, 2)

	const result = date.formatDate('-')

	return result === '2019-02-02'
})

log('formatDate - YYYY.MM.DD', () => {
	const date = BeeDate.createFromDate(2019, 1, 2)

	const result = date.formatDate('.')

	return result === '2019.02.02'
})

log('formatTime - HH:mm:ss', () => {
	const date = BeeDate.createFromDate(2019, 1, 2, 10, 11, 13)

	const result = date.formatTime(':')

	return result === '10:11:13'
})

log('format - YYYY-MM-DD', () => {
	const date = BeeDate.createFromDate(2019, 1, 2)

	const result = date.format(({year, month, date}) => `${year}-${month}-${date}`)

	return result === '2019-02-02'
})

log('format - YYYY.MM.DD', () => {
	const date = BeeDate.createFromDate(2019, 1, 2)

	const result = date.format(({year, month, date}) => `${year}.${month}.${date}`)

	return result === '2019.02.02'
})

log('format - YYYY.MM.DD HH:mm:ss', () => {
	const date = BeeDate.createFromDate(2019, 1, 2, 10, 11, 13)

	const result = date.format(({year, month, date, hours, minutes, seconds}) => `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`)

	return result === '2019.02.02 10:11:13'
})

log('isSameDate', () => {
	const srcDate = BeeDate.createFromDate(2019, 1, 2)
	const targetDate = BeeDate.createFromDate(2019, 1, 2)

	const result = srcDate.isSameDate(targetDate)

	return result
})

log('isSameDate - not', () => {
	const srcDate = BeeDate.createFromDate(2019, 1, 2)
	const targetDate = BeeDate.createFromDate(2019, 1, 3)

	const result = !srcDate.isSameDate(targetDate)

	return result
})

log('isSameMonth', () => {
	const srcDate = BeeDate.createFromDate(2019, 1, 2)
	const targetDate = BeeDate.createFromDate(2019, 1, 2)

	const result = srcDate.isSameMonth(targetDate)

	return result
})

log('isSameMonth - not', () => {
	const srcDate = BeeDate.createFromDate(2019, 1, 2)
	const targetDate = BeeDate.createFromDate(2019, 2, 3)

	const result = !srcDate.isSameMonth(targetDate)

	return result
})

log('isSameYear', () => {
	const srcDate = BeeDate.createFromDate(2019, 1, 2)
	const targetDate = BeeDate.createFromDate(2019, 1, 2)

	const result = srcDate.isSameYear(targetDate)

	return result
})

log('isSameYear - not', () => {
	const srcDate = BeeDate.createFromDate(2019, 1, 2)
	const targetDate = BeeDate.createFromDate(2018, 2, 3)

	const result = !srcDate.isSameYear(targetDate)

	return result
})

log('isLeapYear', () => {
	const date = BeeDate.createFromDate(2016, 2)

	const result = date.isLeapYear()

	return result
})

log('isLeapYear - not', () => {
	const date = BeeDate.createFromDate(2017, 2)

	const result = !date.isLeapYear()

	return result
})

log('getLastDate', () => {
	const LAST_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	const date = Array
    .from({length: 12}, (v, i) => {
      return BeeDate.createFromDate(2017, i)
    })
    .map(date => {
      return date.getLastDate()
    })

  const result = LAST_DAYS.join('') === date.join('')

	return result
})

log('getLastDate - leap year', () => {
	const date = BeeDate.createFromDate(2016, 2)

	const result = date.getLastDate() === 29

	return result
})

log('range', () => {
	const startDate = BeeDate.createFromDate(2016, 0, 1)
	const endDate = BeeDate.createFromDate(2016, 0, 20)
	const range = startDate.range(endDate)

	const result = [
		startDate.isSameDate(range[0]),
		endDate.isSameDate(range[19]),
	]

	return result.every(v => v)
})

log('range - past', () => {
	const startDate = BeeDate.createFromDate(2016, 0, 20)
	const endDate = BeeDate.createFromDate(2016, 0, 1)

	const result = startDate.range(endDate).length === 0

	return result
})

log('range - limit 365', () => {
	const startDate = BeeDate.createFromDate(2016, 0, 1)
	const endDate = BeeDate.createFromDate(2017, 12, 31)

	const result = startDate.range(endDate).length === 365

	return result
})

console.log('Total Result: ', result ? 'SUCCESS' : 'FAIL')