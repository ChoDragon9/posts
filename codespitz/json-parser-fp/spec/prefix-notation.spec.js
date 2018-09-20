const expect = require('expect')
const {prefixNotation} = require('../prefix-notation')

describe('prefix-notation', () => {
  it('prefixNotation - String', () => {
    // Given
    const html = `"value"`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual([`value`])
  })

  it('prefixNotation - String - Empty', () => {
    // Given
    const html = `""`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(``)
  })

  it('prefixNotation - String - Unicode', () => {
    // Given
    const html = `"value\\"value"`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(`value\\"value`)
  })

  it('prefixNotation - String - Unicode', () => {
    // Given
    const html = `"value\\"value"`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(`value\\"value`)
  })

  it('prefixNotation - String - Unicode', () => {
    // Given
    const html = `"WHITE FROWNING FACE (U+2639)"`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual("WHITE FROWNING FACE (U+2639)")
  })

  it('prefixNotation - String - Unicode', () => {
    // Given
    const html = `{"title":"\u041f\u043e\u043b\u0442\u043e\u0440\u0430 \u0417\u0435\u043c\u043b\u0435\u043a\u043e\u043f\u0430" }`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual({
      title: `\u041f\u043e\u043b\u0442\u043e\u0440\u0430 \u0417\u0435\u043c\u043b\u0435\u043a\u043e\u043f\u0430`
    })
  })

  it('prefixNotation - Number', () => {
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

  it('prefixNotation - Number', () => {
    // Given
    const html = '123'

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(123)
  })

  it('prefixNotation - Number - Min/Max', () => {
    // Given
    const html = `{ "min": -1.0e+28, "max": 1.0e+28 }`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual({ "min": -1.0e+28, "max": 1.0e+28 })
  })

  it('prefixNotation - Truthy Boolean', () => {
    // Given
    const html = `true`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(true)
  })

  it('prefixNotation - Falsy Boolean', () => {
    // Given
    const html = `false`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(false)
  })

  it('prefixNotation - null', () => {
    // Given
    const html = `null`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(null)
  })
})
