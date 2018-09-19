const expect = require('expect')
const {step} = require('../fp')

describe('fp', () => {
  it('step', () => {
    // Given
    const str = '12345'

    // When
    const arr = []
    step(str, ({cursor, index}) => {
      arr[index] = cursor
    })

    // Then
    expect(arr).toEqual(['1','2','3','4','5'])
  })

  it('step - go next step', () => {
    // Given
    const str = '12345'

    // When
    const arr = []
    step(str, ({cursor, index}) => {
      arr.push(cursor)
      if (index === 1) {
        return 4
      }
    })

    // Then
    expect(arr).toEqual(['1','2','5'])
  })

  it('step - wrong step', () => {
    // Given
    const str = '12345'

    // When
    const arr = []
    step(str, ({cursor, index}) => {
      arr.push(cursor)
      if (index === 1) {
        return 0
      }
    })

    // Then
    expect(arr).toEqual(['1','2'])
  })
})
