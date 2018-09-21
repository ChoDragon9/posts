const expect = require('expect')
const {jsonToken} = require('../../json-token')

describe('prefix-notation/boolean-null', () => {
  it('jsonToken - Truthy Boolean', () => {
    // Given
    const html = `true`

    // When

    const result = []
    jsonToken(html, v => result.push(v))

    // Then
    expect(result).toEqual([true])
  })

  it('jsonToken - Falsy Boolean', () => {
    // Given
    const html = `false`

    // When

    const result = []
    jsonToken(html, v => result.push(v))

    // Then
    expect(result).toEqual([false])
  })

  it('jsonToken - null', () => {
    // Given
    const html = `null`

    // When

    const result = []
    jsonToken(html, v => result.push(v))

    // Then
    expect(result).toEqual([null])
  })
})
