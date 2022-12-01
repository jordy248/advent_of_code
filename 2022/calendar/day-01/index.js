import { notStrictEqual } from 'assert';

import CONSTANTS from '../../Components/Constants.js';
import cookie from '../../../utils/getCookie.js';
import { getExample } from '../../../utils/getExample.js';
import { getInput, tidyInput } from '../../../utils/getInput.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const DAY = '1';
const { YEAR } = CONSTANTS;
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ function to parse input ] ----------------------------------------- >>>
const parseInput = (input) => {
  const data = input.split('\n\n').map((row) =>
    row
      .split('\n')
      .filter((o) => o !== '')
      .map((o) => parseInt(o))
  );
  return data;
};
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (input) => {
  // parse input
  const data = parseInput(input);

  // sum calories carried by each elf
  const elfSums = data.map((elf) => elf.reduce((a, b) => a + b, 0));

  // get largest elfSum
  const largestElfSum = elfSums.length > 0 && Math.max(...elfSums);

  return largestElfSum;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (input) => {
  // parse input
  const data = parseInput(input);

  // sum calories carried by each elf
  const elfSums = data.map((elf) => elf.reduce((a, b) => a + b, 0));

  // get 3 largest elfSums
  elfSums.sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });

  // get three largest elf sums
  const threeLargestElfSums = elfSums.reverse().slice(0, 3);

  // sum three largest elf sums
  const totalThreeLargestElfSums = threeLargestElfSums.reduce(
    (a, b) => a + b,
    0
  );

  return totalThreeLargestElfSums;
};
// <<< [ partTwo function ] <<<
// <<< [ answer functions ] ------------------------------------------------ <<<

// >>> [ main ] ------------------------------------------------------------ >>>
const getAnswers = async () => {
  try {
    // get input
    const input = await getInput(
      `https://adventofcode.com/${YEAR}/day/${DAY}/input`,
      cookie
    );

    // get part one answer
    const partOneAnswer = await partOne(input);

    // get part two answer
    const partTwoAnswer = await partTwo(input);

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

// >>> [ export ] --------------------------------------------------------- >>>
export { partOne, partTwo };
// <<< [ export ] --------------------------------------------------------- <<<
