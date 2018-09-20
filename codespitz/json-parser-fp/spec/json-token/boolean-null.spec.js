const expect = require('expect')
const {prefixNotation} = require('../../prefix-notation')

describe('prefix-notation/boolean-null', () => {
  it('prefixNotation - Truthy Boolean', () => {
    // Given
    const html = `true`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([true])
  })

  it('prefixNotation - Falsy Boolean', () => {
    // Given
    const html = `false`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([false])
  })

  it('prefixNotation - null', () => {
    // Given
    const html = `null`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([null])
  })
})
