import cookie from '../../../utils/getCookie.js';
import { getInput } from '../../../utils/getInput.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const day = '9';
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ helper functions ] ------------------------------------------------ >>>
// function to parse puzzle input
const parseInput = (input) => {
  // remove trailing newline
  const tidiedInput = input
    .replace(/\n$/g, '')
    .split('\n')
    .map((line) => [...line])
    .map((line) => line.map((v) => parseInt(v, 10)));

  return tidiedInput;
};

// function to get heightmap dimension
const getHeightmapDimension = (heightMap) => {
  const rows = heightMap.length;
  const cols = heightMap[0].length;

  return [rows, cols];
};

// function to get location height given map coordinates
const getLocationHeight = (heightMap, row, col) => {
  const locationHeight = heightMap[row][col];
  return locationHeight;
};

// function to get adjacent location coordinates
const getAdjacentCoords = (heightMap, row, col) =>
  [
    [row + 1, col], // up
    [row, col + 1], // right
    [row - 1, col], // down
    [row, col - 1], // left
  ].filter(
    // only keep rows and cols that are within the heightmap
    ([r, c]) => r in heightMap && c in heightMap[r]
  );

// function to get adjacent locations
const getAdjacent = (heightMap, nested = true) => {
  // get dimensions of heightmap
  // const [rows, cols] = getHeightmapDimension(heightMap);

  // get adjacent locations
  const adjacentHeightMap = heightMap.map((row, ri) => {
    const adjacentsLocations = row.map((col, ci) => {
      const adjacent = [];
      const loc = heightMap[ri][ci];
      const res = {};

      const adjacentCoords = getAdjacentCoords(heightMap, ri, ci);
      adjacentCoords.forEach((coords) => {
        const locationHeight = getLocationHeight(heightMap, ...coords);
        adjacent.push(locationHeight);
      });

      if (nested) {
        res[loc] = adjacent;
        return res;
      }
      return adjacent;
    });
    return adjacentsLocations;
  });
  return adjacentHeightMap;
};

const getBasinPoints = (
  heightMap,
  row,
  col,
  lowPoint = null,
  basinPoints = []
) => {
  // get heightMap dimensions
  const [rows, cols] = getHeightmapDimension(heightMap);

  // get current location coordinate string
  const locationCoordStr = `${row},${col}`;
  // append current location to basinPoints
  basinPoints.push(locationCoordStr);

  // get current location height
  const locationHeight = getLocationHeight(heightMap, row, col);

  // get current location height
  if (lowPoint === null) {
    lowPoint = locationHeight; // eslint-disable-line no-param-reassign
  }

  // get adjacent location coordinates
  const adjacentCoords = getAdjacentCoords(heightMap, row, col);

  // iteratively get basin
  for (const [r, c] of adjacentCoords) {
    const currLocationCoordStr = `${r},${c}`;

    if (basinPoints.includes(currLocationCoordStr)) {
      continue; // eslint-disable-line no-continue
    }

    const adjacentHeight = getLocationHeight(heightMap, r, c);

    if (adjacentHeight >= 9) {
      continue; // eslint-disable-line no-continue
    }

    if (adjacentHeight < lowPoint) {
      return false;
    }

    if (!getBasinPoints(heightMap, r, c, lowPoint, basinPoints)) {
      return false;
    }
  }

  return basinPoints;
};
// <<< [ helper functions ] ------------------------------------------------ <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// function to accept input and output part one answer
const partOne = (input) => {
  const tidiedInput = parseInput(input);

  // get adjacent locations
  const adjacentLocations = getAdjacent(tidiedInput, true).flat(1);

  // get locations that are lower than all adjacent locations
  const lowPoints = [];

  adjacentLocations.forEach((location) => {
    const locationStr = Object.keys(location)[0];
    const locationInt = parseInt(locationStr, 10);

    const lowestLocation = location[locationStr].every(
      (locationHeight) => locationHeight > locationInt
    );

    if (lowestLocation) {
      lowPoints.push(locationInt);
    }
  });

  // convert lowPoints to riskLevels
  const riskLevels = lowPoints.map((point) => point + 1);

  // get answer
  const answer = riskLevels.reduce((acc, curr) => acc + curr, 0);
  return answer;
};

// function to accept input and output part two answer
const partTwo = (input) => {
  const tidiedInput = parseInput(input);
  const heightMap = tidiedInput;

  // init array to store basin sizes
  const basinSizes = [];

  // get basin sizes
  heightMap.forEach((row, ri) => {
    row.forEach((col, ci) => {
      const basinPoints = getBasinPoints(heightMap, ri, ci);

      if (basinPoints) {
        basinSizes.push(basinPoints.length);
      }
    });
  });

  // get answer
  const answer = basinSizes
    // sort basin sizes in descending order
    .sort((a, b) => b - a)
    // take the three largest basin sizes
    .slice(0, 3)
    //
    .reduce((a, b) => a * b);
  return answer;
};

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

// >>> [ export ] --------------------------------------------------------- >>>
export { partOne, partTwo };
// <<< [ export ] --------------------------------------------------------- <<<
