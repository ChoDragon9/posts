const expect = require('expect')
const {go} = require('../fp')

describe('fp', () => {
  it('go', () => {
    // Given
    const count = 0

    // When
    const result = go(count, v => v + 1, v => v + 1)

    // Then
    expect(result).toEqual(2)
  })
})
