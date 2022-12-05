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
  const data = input.split('\n');

  // stacks and instructions are separated by blank line
  const idxBlankLine = data.indexOf('');
  const dataGroups = data.reduce(
    (acc, curr, i) => {
      // no equality because we can ignore blank line
      if (i < idxBlankLine) acc.stacksRaw.push(curr);
      if (i > idxBlankLine && curr !== '') acc.instructionsRaw.push(curr);
      return acc;
    },
    {
      stacksRaw: [],
      instructionsRaw: [],
    }
  );

  // >>> [ clean up stacks ] >>>
  // get number of stacks
  const stackNumbers = dataGroups.stacksRaw
    .map((d) => d.replaceAll(/[^\d]/gi, ''))
    .filter((d) => d !== '');
  const nStacks = stackNumbers[0].split('').length;
  let stacksArr = Array.from({ length: nStacks }, (_) => []);

  // add stack items to stacksArr
  dataGroups.stacksRaw.forEach((l) => {
    // split line into groups of 3
    const lineStacks = l.match(/.{1,4}/g);
    // loop through line stacks and add to stacksArr
    lineStacks.forEach((ll, ii) => {
      if (ll.trim() !== '' && Number.isNaN(parseInt(ll))) {
        stacksArr[ii].push(ll.replaceAll(/[^\w]/gi, ''));
      }
    });
  });

  // reverse each stack to retain original order
  stacksArr = stacksArr.map((stack) => stack.reverse());
  // <<< [ clean up stacks ] <<<

  // >>> [ clean up instructions ] >>>
  const instructionsArr = dataGroups.instructionsRaw.map((d, i) => {
    const numbersMatch = d.match(/\d+/g).map((n) => parseInt(n));
    return numbersMatch;
  });
  // <<< [ clean up instructions ] <<<

  const dataParsed = {
    stacks: stacksArr,
    instructions: instructionsArr,
  };

  return dataParsed;
};
// <<< [ function to parse input ] <<<
// <<< [ UTILS ] ----------------------------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  const { stacks, instructions } = data;

  // create deep clone of stacks data to avoid modifying original data
  const stacksCopy = JSON.parse(JSON.stringify(stacks));

  // execute instructions
  const craneType = 'CrateMover 9000';
  instructions.forEach((instruction, i) => {
    const [move, from, to] = instruction;
    // reverse crates if crane is 9000
    const crates =
      craneType === 'CrateMover 9000'
        ? stacksCopy[from - 1].splice(-move, move).reverse()
        : stacksCopy[from - 1].splice(-move, move);

    crates.forEach((c) => {
      stacksCopy[to - 1].push(c);
    });
  });

  // get crates on top of each stack
  const topCrates = stacksCopy
    .map((stack) => stack.slice(-1))
    // eslint-disable-next-line no-param-reassign
    .reduce((acc, curr) => (acc += curr), '');

  return topCrates;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  const { stacks, instructions } = data;

  // create deep clone of stacks data to avoid modifying original data
  const stacksCopy = JSON.parse(JSON.stringify(stacks));

  // execute instructions
  const craneType = 'CrateMover 9001';
  instructions.forEach((instruction, i) => {
    const [move, from, to] = instruction;
    // reverse crates if crane is 9000
    const crates =
      craneType === 'CrateMover 9000'
        ? stacksCopy[from - 1].splice(-move, move).reverse()
        : stacksCopy[from - 1].splice(-move, move);

    crates.forEach((c) => {
      stacksCopy[to - 1].push(c);
    });
  });

  // get crates on top of each stack
  const topCrates = stacksCopy
    .map((stack) => stack.slice(-1))
    // eslint-disable-next-line no-param-reassign
    .reduce((acc, curr) => (acc += curr), '');

  return topCrates;
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
