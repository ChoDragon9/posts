const expect = require('expect')
const {parser} = require('../../json-parser')

describe('json-parser/number', () => {
  it('parser', () => {
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

  it('parser', () => {
    // Given
    const html = '123'

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual(123)
  })

  it('parser - Min/Max', () => {
    // Given
    const html = `{ "min": -1.0e+28, "max": 1.0e+28 }`

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual({ "min": -1.0e+28, "max": 1.0e+28 })
  })
})
