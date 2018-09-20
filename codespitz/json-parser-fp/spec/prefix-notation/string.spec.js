const expect = require('expect')
const {prefixNotation} = require('../../prefix-notation')

describe('prefix-notation/string', () => {
  it('prefixNotation', () => {
    // Given
    const html = `"value"`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([`value`])
  })

  it('prefixNotation - Empty', () => {
    // Given
    const html = `""`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([``])
  })

  it('prefixNotation - Unicode', () => {
    // Given
    const html = `"value\\"value"`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([`value\\"value`])
  })

  it('prefixNotation - Unicode', () => {
    // Given
    const html = `"value\\"value"`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([`value\\"value`])
  })

  it('prefixNotation - Unicode', () => {
    // Given
    const html = `"WHITE FROWNING FACE (U+2639)"`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual(["WHITE FROWNING FACE (U+2639)"])
  })

  it('prefixNotation - Unicode', () => {
    // Given
    const html = `{"title":"\u041f\u043e\u043b\u0442\u043e\u0440\u0430 \u0417\u0435\u043c\u043b\u0435\u043a\u043e\u043f\u0430" }`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([
      {},
      "title",
      "\u041f\u043e\u043b\u0442\u043e\u0440\u0430 \u0417\u0435\u043c\u043b\u0435\u043a\u043e\u043f\u0430"
    ])
  })
})
