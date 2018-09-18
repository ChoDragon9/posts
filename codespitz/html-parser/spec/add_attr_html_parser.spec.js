const expect = require('expect')
const {parser} = require('../add_attr_html_parser')

describe('add_attr_html_parser', () => {
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
            {
              type: 'text',
              text: 'a'
            },
            {
              type: 'node',
              name: 'a',
              children: [
                {type: 'text', text: 'b'}
              ],
              attr: []
            },
            {type: 'text', text: 'c'},
            {type: 'node', name: 'img', children: [], attr: []},
            {type: 'text', text: 'd'}
          ],
          attr: []
        }
      ]
    })
  })
  it('parser - tag whitespace', () => {
    // Given
    const html = '<div >a<a  >b</a>c<img/>d</div>'

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
            {
              type: 'text',
              text: 'a'
            },
            {
              type: 'node',
              name: 'a',
              children: [
                {type: 'text', text: 'b'}
              ],
              attr: []
            },
            {type: 'text', text: 'c'},
            {type: 'node', name: 'img', children: [], attr: []},
            {type: 'text', text: 'd'}
          ],
          attr: []
        }
      ]
    })
  })
  it('parser attribute', () => {
    // Given
    const html = '<div style="background:red" class="test">a<a href="">b</a>c<img/>d</div>'

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
            {
              type: 'text',
              text: 'a'
            },
            {
              type: 'node',
              name: 'a',
              children: [
                {type: 'text', text: 'b'}
              ],
              attr: [
                {name: 'href', value: ''}
              ]
            },
            {type: 'text', text: 'c'},
            {type: 'node', name: 'img', children: [], attr: []},
            {type: 'text', text: 'd'}
          ],
          attr: [
            {name: 'style', value: 'background:red'},
            {name: 'class', value: 'test'}
          ]
        }
      ]
    })
  })
  it('parser data attribute', () => {
    // Given
    const html = '<div data-key="value">a<a>b</a>c<img/>d</div>'

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
            {
              type: 'text',
              text: 'a'
            },
            {
              type: 'node',
              name: 'a',
              children: [
                {type: 'text', text: 'b'}
              ],
              attr: []
            },
            {type: 'text', text: 'c'},
            {type: 'node', name: 'img', children: [], attr: []},
            {type: 'text', text: 'd'}
          ],
          attr: [
            {name: 'data-key', value: 'value'},
          ]
        }
      ]
    })
  })
  it('parser checked', () => {
    // Given
    const html = '<div><input type="radio" checked></div>'

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
            {
              type: 'node',
              name: 'input',
              children: [],
              attr: [
                {name: 'type', value: 'radio'},
                {name: 'checked', value: ''}
              ]
            }
          ],
          attr: []
        }
      ]
    })
  })
})
