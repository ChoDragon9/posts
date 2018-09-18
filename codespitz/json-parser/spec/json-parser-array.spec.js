const expect = require('expect')
const {parser} = require('../json-parser')

describe('json_parser_array', () => {
  it('parser - Array', () => {
    // Given
    const html = `[]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([])
  })

  it('parser - Array - String', () => {
    // Given
    const html = `["value"]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(["value"])
  })

  it('parser - Array - Number', () => {
    // Given
    const html = `[123]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([123])
  })

  it('parser - Array - Object', () => {
    // Given
    const html = `[{"key": "value"}]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([{"key": "value"}])
  })

  it('parser - Array - Array', () => {
    // Given
    const html = `[[123]]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([[123]])
  })

  it('parser - Array - Truthy Boolean', () => {
    // Given
    const html = `[true]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([true])
  })

  it('parser - Array - Falsy Boolean', () => {
    // Given
    const html = `[false]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([false])
  })

  it('parser - Array - null', () => {
    // Given
    const html = `[null]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([null])
  })
})
