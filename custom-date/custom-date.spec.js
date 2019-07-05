const CustomDate = require('./custom-date')
const log = (txt, fn) => {
  console.log('------------------------')
  console.log(txt)
  try {
    if (fn()) {
      console.log('[SUCCESS] ', txt)
    } else {
      console.error('[FAIL] ', txt)
    }
  } catch (e) {
    console.error(e)
  }
  console.log('------------------------')
}

log('addDate', () => {
  const customDate = CustomDate.create(2019, 0, 1)
  customDate.getDate() // 1
  customDate.addDate(10) // 11
  return customDate.getDate() === 11
})

log('subtractDate', () => {
  const customDate = CustomDate.create(2019, 0, 20)
  customDate.getDate() // 20
  customDate.subtractDate(10) // 10
  return customDate.getDate() === 10
})

log('isSame', () => {
  const customDate1 = CustomDate.create(2019, 0, 1)
  const customDate2 = CustomDate.create(2019, 0, 1)
  return customDate1.isSame(customDate2)
})
