const {test} = require('./helper')
const {find} = require('./dfs')

const MAP = [
  [0, 1, 1, 0],
  [0, 0, 0, 1],
  [1, 0, 1, 0],
  [1, 0, 0, 0],
];

test({
  find,
  map: [
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [1, 0, 1, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 0],
  ],
  startPoint: [0, 0],
  endPoint: [3, 1],
  result: [
    [0, 0], [1, 0], [1, 1], [2, 1], [3, 1],
  ]
});

test({
  find,
  map: MAP,
  startPoint: [2, 3],
  endPoint: [3, 3],
  result: [
    [2, 3], [3, 3]
  ]
});

test({
  find,
  map: MAP,
  startPoint: [1, 2],
  endPoint: [2, 3],
  result: [
    [1, 2], [1, 1], [2, 1],
    [3, 1], [3, 2], [3, 3], [2, 3]
  ]
});

test({
  find,
  map: MAP,
  startPoint: [1, 2],
  endPoint: [0, 0],
  result: [
    [1, 2], [1, 1], [1, 0], [0, 0]
  ]
});

test({
  find,
  map: MAP,
  startPoint: [0, 0],
  endPoint: [1, 1],
  result: [
    [0, 0], [1, 0], [1, 1]
  ]
});

test({
  find,
  map: MAP,
  startPoint: [0, 0],
  endPoint: [3, 3],
  result: [
    [0, 0], [1, 0], [1, 1], [2, 1],
    [3, 1], [3, 2], [3, 3]
  ]
});

test({
  find,
  map: MAP,
  startPoint: [0, 0],
  endPoint: [2, 3],
  result: [
    [0, 0], [1, 0], [1, 1], [2, 1],
    [3, 1], [3, 2], [3, 3], [2, 3]
  ]
});