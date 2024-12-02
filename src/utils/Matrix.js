import { hasProp } from './Utils.js';

export const callAtCoords = (matrix, coords, cb) => {
  const [x, y] = coords;

  if (hasProp(matrix, x) && hasProp(matrix[x], y)) {
    return cb(matrix[x][y], coords, matrix);
  }
};

export function callAtAdjacents(matrix, coords, cb) {
  const [x, y] = coords;
  callAtCoords(matrix, [x - 1, y], cb); // top
  callAtCoords(matrix, [x, y + 1], cb); // right
  callAtCoords(matrix, [x + 1, y], cb); // bottom
  callAtCoords(matrix, [x, y - 1], cb); // left
}

export function callAtSurroundings(matrix, coords, cb) {
  const [x, y] = coords;
  // adjacents
  callAtAdjacents(matrix, coords, cb);
  // diagonals
  callAtCoords(matrix, [x - 1, y + 1], cb); // top right
  callAtCoords(matrix, [x + 1, y + 1], cb); // bottom right
  callAtCoords(matrix, [x + 1, y - 1], cb); // bottom left
  callAtCoords(matrix, [x - 1, y - 1], cb); // top left
}

export function callAtMatrixCells(matrix, cb) {
  matrix.forEach((row, x) => {
    row.forEach((cell, y) => {
      cb(matrix[x][y], [x, y], matrix);
    });
  });
}

export function getCoordsOfChar(matrix, char) {
  for (let x = 0; x < matrix.length; x += 1) {
    for (let y = 0; y < matrix[x].length; y += 1) {
      const coords = callAtCoords(matrix, [x, y], (val) => {
        if (val === char) {
          return [x, y];
        }
        return null;
      });
      if (coords) return coords;
    }
  }
  return [-1, -1];
}
