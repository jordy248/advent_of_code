import * as path from 'path';

import CONSTANTS from '../../Components/Constants.js';
import { Cookie, Input, Utils, Matrix } from '../../../utils/index.js';

// >>> [ fake __dirname ] -------------------------------------------------- >>>
const __dirname = (() => {
  const x = path.dirname(decodeURI(new URL(import.meta.url).pathname));
  return path.resolve(process.platform === 'win32' ? x.substr(1) : x);
})();
// <<< [ fake __dirname ] -------------------------------------------------- <<<

// >>> [ CONSTANTS ] ------------------------------------------------------- >>>
const DAY = +__dirname.split('/').pop().replaceAll(/[^\d]/g, '');
const { YEAR } = CONSTANTS;
// <<< [ CONSTANTS ] ------------------------------------------------------- <<<

// >>> [ utils ] ----------------------------------------------------------- >>>
const PIPE_MOVES = {
  //   | is a vertical pipe connecting north and south.
  // - is a horizontal pipe connecting east and west.
  // L is a 90-degree bend connecting north and east.
  // J is a 90-degree bend connecting north and west.
  // 7 is a 90-degree bend connecting south and west.
  // F is a 90-degree bend connecting south and east.
  // . is ground; there is no pipe in this tile.
  // S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

  '|': [
    [-1, 0], // top
    [1, 0], // bottom
  ],
  '-': [
    [0, -1], // left
    [0, 1], // right
  ],
  L: [
    [-1, 0], // top
    [0, 1], // right
  ],
  J: [
    [-1, 0], // top
    [0, -1], // left
  ],
  7: [
    [1, 0], // bottom
    [0, -1], // left
  ],
  F: [
    [1, 0], // bottom
    [0, 1], // right
  ],
  '.': [
    [Infinity, Infinity],
    [Infinity, Infinity],
  ],
};

function isSameLoc([x1, y1], [x2, y2]) {
  return x1 === x2 && y1 === y2;
}

function getConnectedPipes(matrix, [x, y]) {
  const tile = matrix[x][y];
  const moveCoords = PIPE_MOVES[tile];

  if (!moveCoords) {
    return [];
  }

  const connectedCoords = moveCoords.map(([moveX, moveY]) => [
    x + moveX,
    y + moveY,
  ]);

  return connectedCoords;
}

function getNextPipe(matrix, coords, lastCoords) {
  return getConnectedPipes(matrix, coords).find(
    (conn) => !isSameLoc(conn, lastCoords)
  );
}
// <<< [ utils ] ----------------------------------------------------------- <<<

// >>> [ function to parse input ] ----------------------------------------- >>>
function parseInput(input) {
  const data = input
    .trim()
    .split(/\n/)
    .map((line) => line.split(''));

  return data;
}
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  // console.log('data', data);

  const firstPipes = [];

  // find starting coordinates
  const startCoords = Matrix.getCoordsOfChar(data, 'S');
  // find two tiles that connect to startCoords and start paths
  Matrix.callAtAdjacents(data, startCoords, (tile, coords) => {
    const [connA, connB] = getConnectedPipes(data, coords);

    const isConnectedToStart =
      (connA && isSameLoc(startCoords, connA)) ||
      (connB && isSameLoc(startCoords, connB));

    if (isConnectedToStart) firstPipes.push(coords);
  });

  let steps = 1;
  // start loop at first connection
  let [currCoords] = firstPipes;
  let lastCoords = startCoords;

  // keep going until we get back to start and complete loop
  while (data[currCoords[0]][currCoords[1]] !== 'S') {
    const nextCoords = getNextPipe(data, currCoords, lastCoords); // get next coords
    lastCoords = currCoords; // update lastCoords
    currCoords = nextCoords; // update currCoords
    steps += 1;
  }

  // get farthest point
  //
  const farthestPoint = Math.ceil(steps / 2);

  const result = farthestPoint;
  return result;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  // console.log('data', data);
  const result = 'test';
  return result;
};
// <<< [ partTwo function ] <<<
// <<< [ answer functions ] ------------------------------------------------ <<<

// >>> [ main ] ------------------------------------------------------------ >>>
const getAnswers = async () => {
  try {
    const input = await Input.getInput(
      `https://adventofcode.com/${YEAR}/day/${DAY}/input`,
      Cookie.cookie
    );
    const data = parseInput(input);

    const partOneAnswer = partOne(data);
    const partTwoAnswer = partTwo(data);

    return Promise.all([partOneAnswer, partTwoAnswer]).then(
      ([answerOne, answerTwo]) => {
        console.log(`Part One Answer: ${answerOne}`);
        console.log(`Part Two Answer: ${answerTwo}`);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

getAnswers();
// <<< [ main ] ------------------------------------------------------------ <<<

export { parseInput, partOne, partTwo };
