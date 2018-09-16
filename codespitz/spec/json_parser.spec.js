const expect = require('expect')
const {parser} = require('../json_parser')

describe('json_parser', () => {
  it('parser', () => {
    // Given
    const html = '{"key": "value"}'

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual({
      key: "value"
    })
  })
})
