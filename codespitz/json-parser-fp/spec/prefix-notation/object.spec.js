const expect = require('expect')
const {prefixNotation} = require('../../prefix-notation')

describe('prefix-notation/object', () => {
  it('prefixNotation - Array', () => {
    // Given
    const html = `{
      "key1": ["value", 123, {"key": "value"}, [123], true, false, null],
      "key2": [[[[1]]]],
      "key3": [
        ["value"], [123], [{"key": "value"}], [[123]],
        [true], [false], [null]
      ]
    }`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([
      {},
        "key1", [], "value", 123, {}, "key", "value", [], 123, true, false, null,
        "key2", [], [], [], [], 1,
        "key3", [],
          [], "value", [], 123, [], {}, "key", "value", [], [], 123,
          [], true, [], false, [], null
    ])
  })

  it('prefixNotation - String', () => {
    // Given
    const html = '{"key1": "value1", "key2": "value2"}'

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([
      {}, "key1", "value1", "key2", "value2"
    ])
  })

  it('prefixNotation - Number', () => {
    // Given
    const html = '{"key0": 0, "key1": -1, "key2", 12345}'

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([
      {}, "key0", 0, "key1", -1, "key2", 12345
    ])
  })

  it('prefixNotation', () => {
    // Given
    const html = '{"key1": {"key1_1":"value1_1"}, "key2": {"key2_1":"value2_1", "key2_2":"value2_2"}}'

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([
      {}, "key1", {}, "key1_1", "value1_1", "key2", {}, "key2_1","value2_1", "key2_2","value2_2"
    ])
  })

  it('prefixNotation - Array', () => {
    // Given
    const html = `{
      "key1": ["value", 123, {"key": "value"}, [123], true, false, null],
      "key2": [[[[1]]]],
      "key3": [
        ["value"], [123], [{"key": "value"}], [[123]],
        [true], [false], [null]
      ]
    }`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([
      {},
        "key1", [], "value", 123, {}, "key", "value", [], 123, true, false, null,
        "key2", [], [], [], [], 1,
        "key3", [],
          [], "value", [], 123, [], {},"key", "value", [], [], 123,
          [], true, [], false, [], null
    ])
  })

  it('prefixNotation - Boolean', () => {
    // Given
    const html = '{"key1": true, "key2": false}'

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([
      {}, "key1", true, "key2", false
    ])
  })

  it('prefixNotation - null', () => {
    // Given
    const html = '{"key": null}'

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([{}, "key", null])
  })

  it('prefixNotation - All Type', () => {
    // Given
    const html = `{
      "key1": "value1",
      "key2": "value2",
      "obj": {
        "key1": {"key1_1":"value1_1"},
        "key2": {"key2_1":"value2_1", "key2_2":"value2_2"}
      },
      "arr": ["value2_1", "value2_2"],
      "num": {"key0": 0, "key1": -1, "key2", 12345}
    }`

    // When
    const result = prefixNotation(html)

    // Then
    expect(result).toEqual([
      {},
        "key1", "value1",
        "key2", "value2",
        "obj", {},
          "key1", {}, "key1_1","value1_1",
          "key2", {}, "key2_1","value2_1", "key2_2","value2_2"
        ,
        "arr", [], "value2_1", "value2_2",
        "num", {}, "key0", 0, "key1", -1, "key2", 12345
    ])
  })
})
