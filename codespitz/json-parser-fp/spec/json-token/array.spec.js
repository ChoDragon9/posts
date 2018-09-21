const expect = require('expect')
const {jsonToken} = require('../../json-token')

describe('prefix-notation/array', () => {
  it('jsonToken', () => {
    // Given
    const html = `[]`

    // When

    const result = []
    jsonToken(html, v => result.push(v))

    // Then
    expect(result).toEqual(['[', ']'])
  })

  it('jsonToken - String', () => {
    // Given
    const html = `["value"]`

    // When

    const result = []
    jsonToken(html, v => result.push(v))

    // Then
    expect(result).toEqual(['[', "value", ']'])
  })

  it('jsonToken - Number', () => {
    // Given
    const html = `[123]`

    // When

    const result = []
    jsonToken(html, v => result.push(v))

    // Then
    expect(result).toEqual(['[', 123, ']'])
  })

  it('jsonToken - Object', () => {
    // Given
    const html = `[{"key": "value"}]`

    // When

    const result = []
    jsonToken(html, v => result.push(v))

    // Then
    expect(result).toEqual(['[', '{', "key", "value", '}', ']'])
  })

  it('jsonToken', () => {
    // Given
    const html = `[[123]]`

    // When

    const result = []
    jsonToken(html, v => result.push(v))

    // Then
    expect(result).toEqual(['[','[', 123,']', ']'])
  })

  it('jsonToken - Truthy Boolean', () => {
    // Given
    const html = `[true]`

    // When

    const result = []
    jsonToken(html, v => result.push(v))

    // Then
    expect(result).toEqual(['[', true, ']'])
  })

  it('jsonToken - Falsy Boolean', () => {
    // Given
    const html = `[false]`

    // When

    const result = []
    jsonToken(html, v => result.push(v))

    // Then
    expect(result).toEqual(['[', false, ']'])
  })

  it('jsonToken - null', () => {
    // Given
    const html = `[null]`

    // When

    const result = []
    jsonToken(html, v => result.push(v))

    // Then
    expect(result).toEqual(['[', null, ']'])
  })
})
