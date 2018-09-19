const expect = require('expect')
const {step} = require('../fp')

describe('fp', () => {
  it('step', () => {
    // Given
    const str = '12345'

    // When
    const arr = []
    step(str, ({cursor, index}) => {
      arr[index] = cursor
    })

    // Then
    expect(arr).toEqual(['1','2','3','4','5'])
  })

  it('step - go next step', () => {
    // Given
    const str = '12345'

    // When
    const arr = []
    step(str, ({cursor, index}) => {
      arr.push(cursor)
      if (index === 1) {
        return 4
      }
    })

    // Then
    expect(arr).toEqual(['1','2','5'])
  })

  it('step - wrong step', () => {
    // Given
    const str = '12345'

    // When
    const arr = []
    step(str, ({cursor, index}) => {
      arr.push(cursor)
      if (index === 1) {
        return 0
      }
    })

    // Then
    expect(arr).toEqual(['1','2'])
  })

  it('step - number', () => {
    // Given
    const num = 1234

    // When
    let count = 0
    step(num, _ => count++)

    // Then
    expect(count).toBe(0)
  })

  it('step - boolean - true', () => {
    // Given
    const boolean = true

    // When
    let count = 0
    step(boolean, _ => count++)

    // Then
    expect(count).toBe(0)
  })

  it('step - boolean - false', () => {
    // Given
    const boolean = false

    // When
    let count = 0
    step(boolean, _ => count++)

    // Then
    expect(count).toBe(0)
  })

  it('step - null', () => {
    // Given
    const nll = null

    // When
    let count = 0
    step(nll, _ => count++)

    // Then
    expect(count).toBe(0)
  })

  it('step - array', () => {
    // Given
    const arr = ['1','2','3']

    // When
    let count = 0
    step(arr, _ => count++)

    // Then
    expect(count).toBe(0)
  })

  it('step - object', () => {
    // Given
    const obj = {a:'a', b:'b'}

    // When
    let count = 0
    step(obj, _ => count++)

    // Then
    expect(count).toBe(0)
  })
})
