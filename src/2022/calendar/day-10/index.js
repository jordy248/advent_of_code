import * as path from 'path';

import { nextTick } from 'process';
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
    .map((p) => [p[0], +p[1] || null]);

  return data;
};
// <<< [ function to parse input ] <<<

// >>> [ generator function to get cycles from instructions ] -------------- >>>
function* makeCycles(instructions, part) {
  let cycle = 0;
  let x = 1;
  let pixels = '';

  // eslint-disable-next-line no-shadow
  const drawPixel = (c, x) => {
    let pixelToDraw = '';
    const pixelPos = c % 40;
    if (pixelPos === 0) pixelToDraw += '\n';
    const pixelIsLit = Math.abs(pixelPos - x) <= 1;
    const pixelChar = pixelIsLit ? '#' : '.';
    pixelToDraw += pixelChar;
    return pixelToDraw;
  };

  function* runCycle() {
    pixels += drawPixel(cycle, x);
    cycle += 1;
    yield [cycle, x];
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < instructions.length; i++) {
    const [command, arg] = instructions[i];

    if (command === 'noop') {
      yield* runCycle();
    } else if (command === 'addx') {
      // add a cycle and increment x
      yield* runCycle();
      yield* runCycle();
      x += arg;
    }
  }

  if (part === 2) yield pixels;
}
// <<< [ generator function to get cycles from instructions ] -------------- <<<
// <<< [ UTILS ] ----------------------------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  const cyclesOfInterest = [20, 60, 100, 140, 180, 220];
  const cycles = Array.from(makeCycles(data, 1));

  const signalStrengths = cyclesOfInterest.map((cycle) => {
    const cycleX = cycles[cycle - 1]; // grumble grumble...
    const strength = cycle * cycleX[1];
    return strength;
  });
  const totalSignalStrength = signalStrengths.reduce((a, b) => a + b, 0);

  return totalSignalStrength;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  const _ = makeCycles(data, 2);
  let pixels = '';

  let finished = false;
  while (!finished) {
    const res = _.next();
    const { value, done } = res;
    if (typeof value === 'string') pixels += value;
    if (done) {
      finished = true;
    }
  }
  return pixels;
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
