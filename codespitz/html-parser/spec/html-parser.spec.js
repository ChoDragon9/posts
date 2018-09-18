const expect = require('expect')
const {parser} = require('../html-parser')

describe('html_parser', () => {
  it('parser', () => {
    // Given
    const html = '<div>a<a>b</a>c<img/>d</div>'

    // When
    const result = parser(html)

    // Then
    expect(result).toEqual({
      name: 'ROOT',
      type: 'node',
      children: [
        {
          name: 'div',
          type: 'node',
          children: [
            {type: 'text', text: 'a'},
            {
              type: 'node',
              name: 'a',
              children: [
                {type: 'text', text: 'b'}
              ]
            },
            {type: 'text', text: 'c'},
            {type: 'node', name: 'img', children: []},
            {type: 'text', text: 'd'}
          ]
        }
      ]
    })
  })
})
