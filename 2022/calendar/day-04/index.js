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
    .map((d) =>
      d.split(',').map((r) => r.split('-').map((n) => parseInt(n, 10)))
    );
  return data;
};
// <<< [ function to parse input ] <<<
// <<< [ UTILS ] ----------------------------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  // get range start and end differences
  // get diff between start1 and start2 and diff between end1 and end2
  const diffs = data.map((d) => {
    const [r1, r2] = d;
    const d1 = r1[0] - r2[0];
    const d2 = r1[1] - r2[1];
    return [d1, d2];
  });

  // get signs of differences
  const diffSigns = diffs.map((d) => {
    const [d1, d2] = d;
    const s1 = Math.sign(d1);
    const s2 = Math.sign(d2);
    return [s1, s2];
  });

  // get containing ranges; one range completely contains the other if:
  // * signs are different
  // * one sign is 0
  const containingRanges = diffSigns.map((s) => {
    const [s1, s2] = s;
    const sp = s1 * s2;
    return +(sp === -1 || sp === 0);
  });

  // count containing ranges
  const nContainingRanges = containingRanges.reduce((a, b) => a + b, 0);

  return nContainingRanges;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  // get range start and end differences
  // get diff between start1 and end2 and diff between end1 and start2
  const diffs = data.map((d) => {
    const [r1, r2] = d;
    const d1 = r1[0] - r2[1];
    const d2 = r1[1] - r2[0];
    return [d1, d2];
  });

  // get signs of differences
  const diffSigns = diffs.map((d) => {
    const [d1, d2] = d;
    const s1 = Math.sign(d1);
    const s2 = Math.sign(d2);
    return [s1, s2];
  });

  // get overlapping ranges; ranges overlap if:
  // * signs are different
  // * one sign is 0
  const overlappingRanges = diffSigns.map((s) => {
    const [s1, s2] = s;
    const sp = s1 * s2;
    return +(sp === -1 || sp === 0);
  });

  // count containing ranges
  const nOverlappingRanges = overlappingRanges.reduce((a, b) => a + b, 0);

  return nOverlappingRanges;
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
