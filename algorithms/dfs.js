/**
 * @todo 최단거리를 구할 수 있도록 해야함
 * @todo 갈수 없는 위치
 */
// 상하좌우로 움직일 때 좌표 차이
const directionRow = [0, 1, 0, -1];
const directionCol = [1, 0, -1, 0];

const validateCoordinate = (row, col, map) => {
  return row >= 0 && row < map.length && col >= 0 && col < map[0].length;
};

const find = (map, startPoint, endPoint) => {
  let paths = [];

  const dfs = (startRow, startCol, stack) => {
    const temp = map[startRow][startCol];
    map[startRow][startCol] = 1;
    stack.push([startRow, startCol]);

    for (let i = 0; i < 4; i++) {
      const targetRow = startRow + directionRow[i];
      const targetCol = startCol + directionCol[i];
      if(!validateCoordinate(targetRow, targetCol, map)) {
        continue;
      }
      // 완료할 때
      if (targetRow == endPoint[0] && targetCol == endPoint[1]) {
        map[startRow][startCol] = temp;
        paths.push([...stack, [targetRow, targetCol]]);
        return;
      }
      if (map[targetRow][targetCol] == 0) {
        dfs(targetRow, targetCol, [...stack]);
      }
    }
    map[startRow][startCol] = temp;
  };

  dfs(startPoint[0], startPoint[1], []);

  return paths.reduce((minPath, currentPath) => {
    if (minPath.length >= currentPath.length) {
      return currentPath;
    } else {
      return minPath;
    }
  }, paths[0]);
}

module.exports = {find}