const {test} = require('./helper')

const MAP = [
  [0, 1, 1, 0],
  [0, 0, 0, 1],
  [1, 0, 1, 0],
  [1, 0, 0, 0],
];

test({
  map: MAP,
  startPoint: [0, 0],
  endPoint: [3, 3],
  result: [
    [0, 0], [1, 0], [1, 1], [2, 1],
    [3, 1], [3, 2], [3, 3]
  ]
});

test({
  map: MAP,
  startPoint: [0, 0],
  endPoint: [3, 3],
  result: [
    [0, 0], [1, 0], [1, 1], [2, 1],
    [3, 1], [3, 2], [3, 3]
  ]
});