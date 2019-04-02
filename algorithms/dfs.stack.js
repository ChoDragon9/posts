/**
 * @todo 최단거리를 구할 수 있도록 해야함
 * @todo 갈수 없는 위치
 */
const VISITED = 2
const LOAD = 0
const DIRECTION_LENGTH = 4

// 상하좌우로 움직일 때 좌표 차이
const directionRow = [0, 1, 0, -1];
const directionCol = [1, 0, -1, 0];

const validateCoordinate = (row, col, map) => {
  return row >= 0 &&
    row < map.length &&
    col >= 0 &&
    col < map[0].length &&
    map[row][col] === LOAD;
};

const stackToPath = stack => {
  const paths = []
  while (stack) {
    paths.push([stack.row, stack.col])
    stack = stack.back
  }
  paths.reverse()
  return paths
}

const find = (map, startPoint, endPoint) => {
  let paths = [];
  let stack = {
    row: startPoint[0],
    col: startPoint[1],
    back: null
  }

  while (!paths.length) {
    const startRow = stack.row
    const startCol = stack.col
    let isMove = false

    map[startRow][startCol] = VISITED;

    for (let i = 0; i < DIRECTION_LENGTH; i++) {
      const targetRow = startRow + directionRow[i];
      const targetCol = startCol + directionCol[i];
      if(validateCoordinate(targetRow, targetCol, map)) {
        isMove = true
        stack = {
          row: targetRow,
          col: targetCol,
          back: stack
        }
        if (targetRow === endPoint[0] && targetCol === endPoint[1]) {
          paths = stackToPath(stack)
        }
        break;
      }
    }

    if (!isMove) {
      stack = stack.back
    }
  }

  return paths
}

module.exports = {find}