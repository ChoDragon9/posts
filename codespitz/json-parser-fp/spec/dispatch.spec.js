const expect = require('expect')
const {dispatch} = require('../fp')

describe('fp', () => {
  it('dispatch', () => {
    // Given
    let count = 0
    const wrongFn = _ => { count++ }
    const rightFn = v => v
    const getRight = dispatch(wrongFn, wrongFn, rightFn, wrongFn, wrongFn)

    // When
    const result = getRight(10)

    // Then
    expect(result).toBe(10)
    expect(count).toBe(2)
  })

  it('dispatch - string', () => {
    // Given
    const doubleString = dispatch(
      v => typeof v === 'string' ? `${v}${v}` : undefined,
      v => typeof v === 'number' ? v * v : undefined
    )

    // When
    const result = doubleString('369')

    // Then
    expect(result).toBe('369369')
  })

  it('dispatch - string', () => {
    // Given
    const sqare = dispatch(
      v => typeof v === 'string' ? `${v}${v}` : undefined,
      v => typeof v === 'number' ? v * v : undefined
    )

    // When
    const result = sqare(2)

    // Then
    expect(result).toBe(4)
  })
})
