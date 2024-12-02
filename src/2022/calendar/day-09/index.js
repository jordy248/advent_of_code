import * as path from 'path';

import CONSTANTS from '../../Components/Constants.js';
import cookie from '../../../utils/Cookie.js';
import { getInput } from '../../../utils/Input.js';

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

// >>> [ UTILS ] ----------------------------------------------------------- >>>
// >>> [ function to parse input ] >>>
const parseInput = (input) => {
  const data = input
    .trim()
    .split('\n')
    .map((d) => d.split(' '))
    .map((p) => [p[0], +p[1]]);

  return data;
};
// <<< [ function to parse input ] <<<

// >>> [ function to get motion array from motion command ] ---------------- >>>
const getMotionArr = (dir, nSteps) => {
  const directions = {
    U: [0, -1],
    R: [1, 0],
    D: [0, 1],
    L: [-1, 0],
  };
  const motionArr = Array.from({ length: nSteps }, () => directions[dir]);
  return motionArr;
};
// <<< [ function to get motion array from motion command ] ---------------- <<<

// >>> [ function to simulate knot movement on rope ] ---------------------- >>>
const simRope = (nKnots, dirData) => {
  // init arr to keep track of knots' coordinates
  const rope = Array.from({ length: nKnots }, () => [0, 0]);
  // init object to keep track of coordinates visited
  const visitedCoords = {};

  dirData.forEach((motion) => {
    // convert motion commands to array of motion coordinates
    const [dir, nSteps] = motion;
    const motionArr = getMotionArr(dir, nSteps);

    while (motionArr.length > 0) {
      const motionCoords = motionArr.pop();
      // move head knot
      rope[0] = rope[0].map(
        (coord, axisIdx) =>
          // axisIdx 0 = x (left/right)
          // axisIdx 1 = y (down/up)
          coord + motionCoords[axisIdx]
      );

      // advance other knots following head knot
      // eslint-disable-next-line no-loop-func
      rope.forEach((knotCoords, i) => {
        if (i === 0) return knotCoords;

        const prevKnotCoords = rope[i - 1];

        // check if curr knot is >= 2 spaces away from prev knot (either axis)
        const isTooFar = prevKnotCoords.some((prevCoord, axisIdx) => {
          // axisIdx 0 = x (left/right)
          // axisIdx 1 = y (down/up)
          const axisDistance = Math.abs(prevCoord - knotCoords[axisIdx]);
          return axisDistance >= 2;
        });
        // if curr knot too far from previous knot, advance it in the
        // direction of the prev knot
        if (isTooFar) {
          const newKnotCoords = knotCoords.map((coord, axisIdx) => {
            const advDirection = Math.sign(prevKnotCoords[axisIdx] - coord);
            return coord + advDirection;
          });
          rope[i] = newKnotCoords;
        }
      });

      // save tail position
      const tailCurrCoords = rope[nKnots - 1].join(',');
      if (!Object.hasOwn(visitedCoords, tailCurrCoords)) {
        visitedCoords[tailCurrCoords] = 0;
      }
      visitedCoords[tailCurrCoords] += 1;
    }
  });
  return visitedCoords;
};
// <<< [ function to simulate knot movement on rope ] ---------------------- <<<
// <<< [ UTILS ] ----------------------------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  const nKnots = 2;
  const coordsVisitedByTail = simRope(nKnots, data);
  const nCoordsVisitedByTail = Object.keys(coordsVisitedByTail).length;
  return nCoordsVisitedByTail;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  const nKnots = 10;
  const coordsVisitedByTail = simRope(nKnots, data);
  const nCoordsVisitedByTail = Object.keys(coordsVisitedByTail).length;
  return nCoordsVisitedByTail;
};
// <<< [ partTwo function ] <<<
// <<< [ answer functions ] ------------------------------------------------ <<<

// >>> [ main ] ------------------------------------------------------------ >>>
const getAnswers = async () => {
  try {
    const input = await getInput(
      `https://adventofcode.com/${YEAR}/day/${DAY}/input`,
      cookie
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
