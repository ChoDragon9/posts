const expect = require('expect')
const {parser} = require('../json_parser')

describe('json_parser_basic_value', () => {
  it('parser - String', () => {
    // Given
    const html = `"value"`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(`value`)
  })

  it('parser - String - Empty', () => {
    // Given
    const html = `""`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(``)
  })

  it('parser - String - Special Char', () => {
    // Given
    const html = `"value\\"value"`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(`value\\"value`)
  })

  it('parser - String', () => {
    // Given
    const html = `"WHITE FROWNING FACE (U+2639)"`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual("WHITE FROWNING FACE (U+2639)")
  })

  it('parser - Number', () => {
    // Given
    const html = `[
      0.4e006,
      0.4e-006,
      0.4e+006,
      4e006,
      4e-006,
      4e+006
    ]`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([
      0.4e006,
      0.4e-006,
      0.4e+006,
      4e006,
      4e-006,
      4e+006
    ])
  })

  it('parser - Number', () => {
    // Given
    const html = '123'

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(123)
  })

  it('parser - Number - Min/Max', () => {
    // Given
    const html = `{ "min": -1.0e+28, "max": 1.0e+28 }`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual({ "min": -1.0e+28, "max": 1.0e+28 })
  })

  it('parser - Truthy Boolean', () => {
    // Given
    const html = `true`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(true)
  })

  it('parser - Falsy Boolean', () => {
    // Given
    const html = `false`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(false)
  })

  it('parser - null', () => {
    // Given
    const html = `null`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(null)
  })
})
