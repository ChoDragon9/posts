const expect = require('expect')
const {parser} = require('../json_parser')

describe('json_parser', () => {
  it('parser - String', () => {
    // Given
    const html = `"value"`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(`value`)
  })
  it('parser - String - Unicode', () => {
    // Given
    const html = `"value\\"value"`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(`value\\"value`)
  })

  it('parser -  Number', () => {
    // Given
    const html = '123'

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(123)
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
