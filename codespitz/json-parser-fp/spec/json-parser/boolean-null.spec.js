const expect = require('expect')
const {parser} = require('../../json-parser')

describe('json-parser/boolean-null', () => {
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
