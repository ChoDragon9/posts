const expect = require('expect')
const {reduce} = require('../fp')

describe('fp', () => {
  it('reduce', () => {
    // Given
    const str = '12345'

    // When
    const arr = reduce(str, ({char, index, acc}) => {
      acc[index] = char
      return [acc]
    }, [])

    // Then
    expect(arr).toEqual(['1','2','3','4','5'])
  })

  it('reduce - go next reduce', () => {
    // Given
    const str = '12345'

    // When
    const arr = reduce(str, ({char, index, acc}) => {
      acc.push(char)
      if (index === 1) {
        return [acc, 4]
      } else {
        return [acc]
      }
    }, [])

    // Then
    expect(arr).toEqual(['1','2','5'])
  })

  it('reduce - wrong reduce', () => {
    // Given
    const str = '12345'

    // When
    const arr = reduce(str, ({char, index, acc}) => {
      acc.push(char)
      if (index === 1) {
        return [acc, 0]
      } else {
        return [acc]
      }
    }, [])

    // Then
    expect(arr).toEqual(['1','2'])
  })

  it('reduce - number', () => {
    // Given
    const num = 1234

    // When
    let count = 0
    reduce(num, _ => count++)

    // Then
    expect(count).toBe(0)
  })

  it('reduce - boolean - true', () => {
    // Given
    const boolean = true

    // When
    let count = 0
    reduce(boolean, _ => count++)

    // Then
    expect(count).toBe(0)
  })

  it('reduce - boolean - false', () => {
    // Given
    const boolean = false

    // When
    let count = 0
    reduce(boolean, _ => count++)

    // Then
    expect(count).toBe(0)
  })

  it('reduce - null', () => {
    // Given
    const nll = null

    // When
    let count = 0
    reduce(nll, _ => count++)

    // Then
    expect(count).toBe(0)
  })

  it('reduce - array', () => {
    // Given
    const arr = ['1','2','3']

    // When
    let count = 0
    reduce(arr, _ => count++)

    // Then
    expect(count).toBe(0)
  })

  it('reduce - object', () => {
    // Given
    const obj = {a:'a', b:'b'}

    // When
    let count = 0
    reduce(obj, _ => count++)

    // Then
    expect(count).toBe(0)
  })
})
