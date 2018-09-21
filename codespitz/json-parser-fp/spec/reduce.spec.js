const expect = require('expect')
const {reduce} = require('../fp')

describe('fp', () => {
  it('reduce', () => {
    // Given
    const arr = ['1','2','3','4','5']

    // When
    const str = reduce(arr, (acc, item) => {
      return `${acc}${item}`
    }, '')

    // Then
    expect(str).toEqual('12345')
  })
})
