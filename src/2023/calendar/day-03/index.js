import * as path from 'path';

import structuredClone from '@ungap/structured-clone';

import CONSTANTS from '../../Components/Constants.js';
import { Cookie, Input, Matrix, Utils } from '../../../utils/index.js';

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
function isSymbol(s) {
  return s !== '.' && !Utils.isItDigit(s);
}

function getPartNumber(matrix, coords) {
  const [x, y] = coords;

  let partNumber = '';
  let colIdx = y;

  // walk back to start of number
  while (Utils.isItDigit(matrix[x][colIdx])) {
    colIdx -= 1;
  }
  colIdx += 1;

  // walk along and save number
  while (Utils.isItDigit(matrix[x][colIdx])) {
    partNumber += matrix[x][colIdx];
    matrix[x][colIdx] = '.'; // remove number so we don't double-count
    colIdx += 1;
  }

  return parseInt(partNumber);
}
// <<< [ utils ] ----------------------------------------------------------- <<<

// >>> [ function to parse input ] ----------------------------------------- >>>
const parseInput = (input) => {
  const data = input
    .trim()
    .split('\n')
    .map((row) => row.split(''));
  return data;
};
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  const dataCopy = structuredClone(data); // because we're overwriting characters in getPartNumber()

  const parts = [];

  Matrix.callAtMatrixCells(dataCopy, (s, [x, y]) => {
    if (isSymbol(s)) {
      Matrix.callAtSurroundings(
        dataCopy,
        [x, y],
        (sAdj, [surroundingX, surroundingY]) => {
          if (Utils.isItDigit(sAdj)) {
            const partNumber = getPartNumber(dataCopy, [
              surroundingX,
              surroundingY,
            ]);
            parts.push(partNumber);
          }
        }
      );
    }
  });

  const result = Utils.sumArray(parts);
  return result;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  const dataCopy = structuredClone(data); // because we're overwriting characters in getPartNumber()

  const gearRatios = [];

  Matrix.callAtMatrixCells(dataCopy, (s, [x, y]) => {
    if (s === '*') {
      const parts = [];

      Matrix.callAtSurroundings(
        dataCopy,
        [x, y],
        (sAdj, [surroundingX, surroundingY]) => {
          if (Utils.isItDigit(sAdj)) {
            const partNumber = getPartNumber(dataCopy, [
              surroundingX,
              surroundingY,
            ]);
            parts.push(partNumber);
          }
        }
      );

      if (parts.length === 2) {
        const gearRatio = parts.reduce((a, b) => a * b, 1);
        gearRatios.push(gearRatio);
      }
    }
  });

  const result = Utils.sumArray(gearRatios);
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
