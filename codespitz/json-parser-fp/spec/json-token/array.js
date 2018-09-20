const expect = require('expect')
const {prefixNotation} = require('../../prefix-notation')

describe('prefix-notation/array', () => {
  it('prefixNotation', () => {
    // Given
    const html = `[]`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([[]])
  })

  it('prefixNotation - String', () => {
    // Given
    const html = `["value"]`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([[], "value"])
  })

  it('prefixNotation - Number', () => {
    // Given
    const html = `[123]`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([[], 123])
  })

  it('prefixNotation - Object', () => {
    // Given
    const html = `[{"key": "value"}]`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([[], {}, "key", "value"])
  })

  it('prefixNotation', () => {
    // Given
    const html = `[[123]]`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([[], [], 123])
  })

  it('prefixNotation - Truthy Boolean', () => {
    // Given
    const html = `[true]`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([[], true])
  })

  it('prefixNotation - Falsy Boolean', () => {
    // Given
    const html = `[false]`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([[], false])
  })

  it('prefixNotation - null', () => {
    // Given
    const html = `[null]`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([[], null])
  })
})
