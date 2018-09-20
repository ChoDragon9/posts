const expect = require('expect')
const {jsonToken} = require('../../json-token')

describe('prefix-notation/number', () => {
  it('jsonToken', () => {
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
    const result = jsonToken(html)

    // Then
    expect(result).toEqual([
      '[',
      0.4e006,
      0.4e-006,
      0.4e+006,
      4e006,
      4e-006,
      4e+006,
      ']'
    ])
  })

  it('jsonToken', () => {
    // Given
    const html = '123'

    // When
    const result = jsonToken(html)

    // Then
    expect(result).toEqual([123])
  })

  it('jsonToken - Min/Max', () => {
    // Given
    const html = `{ "min": -1.0e+28, "max": 1.0e+28 }`

    // When
    const result = jsonToken(html)

    // Then
    expect(result).toEqual(['{', "min", -1.0e+28, "max", 1.0e+28, '}'])
  })
})
