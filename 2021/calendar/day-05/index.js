import cookie from '../../../utils/getCookie.js';
import { getInput } from '../../../utils/getInput.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const day = '5';
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ helper functions ] ------------------------------------------------ >>>
const parseInput = (input) => {
  // remove trailing newline
  const tidiedInput = input.replace(/\n$/g, '');

  const lines = tidiedInput
    .split('\n')
    .map((l) =>
      l.split(' -> ').map((c) => c.split(',').map((v) => parseInt(v)))
    );

  return lines;
};

// function to get grid dimensions, given array of lines
const getGridDimensions = (lines) => {
  const [xCoords, yCoords] = [
    lines.map((line) => [line[0][0], line[1][0]]).flat(1),
    lines.map((line) => [line[0][1], line[1][1]]).flat(1),
  ];
  const [xMin, xMax] = [Math.min(...xCoords), Math.max(...xCoords)];
  const [yMin, yMax] = [Math.min(...yCoords), Math.max(...yCoords)];
  const [gridWidth, gridHeight] = [xMax, yMax];

  return [gridWidth, gridHeight];
};

// function to init grid, given lines
const initGrid = (lines) => {
  const [gridWidth, gridHeight] = getGridDimensions(lines);
  const grid = Array(gridWidth + 1)
    .fill(0)
    .map((x) => Array(gridHeight + 1).fill(0));

  return grid;
};

// function to filter horizontal lines
// i.e., x1 === x2 or y1 === y2
const getHorizontalLines = (lines) => {
  const horizontalLines = lines.filter(
    (l) => l[0][0] === l[1][0] || l[0][1] === l[1][1]
  );
  return horizontalLines;
};

const getPointsBetween = ([[x1, y1], [x2, y2]]) => {
  const points = [];
  const [xMin, xMax] = [Math.min(x1, x2), Math.max(x1, x2)];
  const [yMin, yMax] = [Math.min(y1, y2), Math.max(y1, y2)];

  const X = Array.from(new Array(xMax - xMin + 1), (_, i) => i + xMin);
  const Y = Array.from(new Array(yMax - yMin + 1), (_, i) => i + yMin);

  X.forEach((x) => {
    Y.forEach((y) => {
      points.push([x, y]);
    });
  });

  return points;
};
// <<< [ helper functions ] ------------------------------------------------ <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// function to accept input and output part one answer
const partOne = (input) => {
  // parse input
  const lines = parseInput(input);

  // init grid
  const grid = initGrid(lines);

  // get horizontal lines
  const horizontalLines = getHorizontalLines(lines);

  // get points between coordinates
  const points = horizontalLines.map((l) => getPointsBetween(l));
  // console.log(points.flat(1));

  // increment values in grid for each point
  const ventsDict = Object.fromEntries(
    points.flat(1).map((p) => [String(p), 0])
  );

  points.flat(1).forEach((p) => {
    // eslint-disable-next-line no-plusplus
    grid[p[0]][p[1]]++;
    ventsDict[String(p)] += 1;
  });

  // answer is the number of entries with values > 1
  const answer = grid.flat(1).filter((v) => v >= 2).length;
  return answer;
};

// function to accept input and output part two answer
const partTwo = (input) => {
  // parse input
  const lines = parseInput(input);

  const gridDict = {};

  for (const [[x0, y0], [x1, y1]] of lines) {
    const [xMin, xMax] = [Math.min(x0, x1), Math.max(x0, x1)];
    const [yMin, yMax] = [Math.min(y0, y1), Math.max(y0, y1)];
    if (x0 == x1 || y0 == y1) {
      // horizontal or vertical line
      for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
          const coord = `${x},${y}`;
          gridDict[coord] = gridDict[coord] ? (gridDict[coord] += 1) : 1;
        }
      }
    } else {
      // diagonal line
      const xDir = x0 > x1 ? 'down' : 'up';
      const yDir = y0 > y1 ? 'left' : 'right';
      let y = y0;
      if (xDir === 'down') {
        // eslint-disable-next-line no-plusplus
        for (let x = x0; x >= x1; x--) {
          const coord = `${x},${y}`;
          gridDict[coord] = gridDict[coord] ? (gridDict[coord] += 1) : 1;
          y = yDir === 'left' ? y - 1 : y + 1;
        }
      } else {
        // eslint-disable-next-line no-plusplus
        for (let x = x0; x <= x1; x++) {
          const coord = `${x},${y}`;
          gridDict[coord] = gridDict[coord] ? (gridDict[coord] += 1) : 1;
          y = yDir === 'left' ? y - 1 : y + 1;
        }
      }
    }
  }

  // answer is the number of entries with values > 1
  const answer = Object.entries(gridDict).filter(([_, v]) => v > 1).length;
  return answer;
};
// <<< [ answer functions ] ------------------------------------------------ <<<

// >>> [ main ] ------------------------------------------------------------ >>>
const getAnswers = () => {
  // get part one answer
  const partOneAnswer = getInput(
    `https://adventofcode.com/2021/day/${day}/input`,
    cookie
  )
    .then((input) => {
      const answer = partOne(input);
      return answer;
    })
    .catch((err) => console.log(err));

  // get part two answer
  const partTwoAnswer = getInput(
    `https://adventofcode.com/2021/day/${day}/input`,
    cookie
  )
    .then((input) => {
      const answer = partTwo(input);
      return answer;
    })
    .catch((err) => console.log(err));

  return Promise.all([partOneAnswer, partTwoAnswer]).then(
    ([answerOne, answerTwo]) => {
      console.log(`Part One Answer: ${answerOne}`);
      console.log(`Part Two Answer: ${answerTwo}`);
    }
  );
};

getAnswers();
// <<< [ main ] ------------------------------------------------------------ <<<

// >>> [ exports ] --------------------------------------------------------- >>>
module.exports = { partOne, partTwo };
// <<< [ exports ] --------------------------------------------------------- <<<
