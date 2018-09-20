const expect = require('expect')
const {parser} = require('../../json-parser')

describe('json-parser/array', () => {
  it('parser', () => {
    // Given
    const html = `[]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([])
  })

  it('parser - String', () => {
    // Given
    const html = `["value"]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(["value"])
  })

  it('parser - Number', () => {
    // Given
    const html = `[123]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([123])
  })

  it('parser - Object', () => {
    // Given
    const html = `[{"key": "value"}]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([{"key": "value"}])
  })

  it('parser', () => {
    // Given
    const html = `[[123]]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([[123]])
  })

  it('parser - Truthy Boolean', () => {
    // Given
    const html = `[true]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([true])
  })

  it('parser - Falsy Boolean', () => {
    // Given
    const html = `[false]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([false])
  })

  it('parser - null', () => {
    // Given
    const html = `[null]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([null])
  })
})
