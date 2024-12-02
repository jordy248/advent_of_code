import * as path from 'path';

import CONSTANTS from '../../Components/Constants.js';
import { Cookie, Example, Input, Matrix, Utils } from '../../../utils/index.js';

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
function getDist(speed, time) {
  return speed * time;
}

function countWinningOptions(race) {
  const { time, bestDist } = race;
  let count = 0;

  for (let secondsPressed = 0; secondsPressed <= time; secondsPressed += 1) {
    const dist = getDist(secondsPressed, time - secondsPressed);
    if (dist > bestDist) count += 1;
  }

  return count;
}

function getOptions(race) {
  const { time } = race;

  const options = [];

  // eslint-disable-next-line no-plusplus
  for (let secondsPressed = 0; secondsPressed <= time; secondsPressed += 1) {
    const timeRemaining = time - secondsPressed;
    const dist = getDist(secondsPressed, timeRemaining);
    options.push({
      time,
      secondsPressed,
      dist,
    });
  }

  return options;
}

function getWinningOptions(race) {
  const { time, bestDist } = race;
  const options = getOptions(race);

  const winningOptions = options.filter((option) => {
    const { dist } = option;
    return dist > bestDist;
  });

  return winningOptions;
}
// <<< [ utils ] ----------------------------------------------------------- <<<

// >>> [ function to parse input ] ----------------------------------------- >>>
function parseInput(input) {
  const data = [];

  input
    .trim()
    .split(/\n/)
    .forEach((row) => {
      const key = row.indexOf('Time') !== -1 ? 'time' : 'bestDist';
      const numbers = row.split(':') && row.split(':')[1].trim().split(/\s+/);
      numbers.forEach((number, i) => {
        if (data[i]) {
          data[i][key] = +number;
        } else {
          const datum = {};
          datum[key] = +number;
          data.push(datum);
        }
      });
    });

  return data;
}
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  const nWinningOptionsForRaces = data.map((race) => {
    const winningOptions = getWinningOptions(race);
    const nWinningOptions = winningOptions.length;
    return nWinningOptions;
  });

  const result = Utils.prodArray(nWinningOptionsForRaces);
  return result;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  const time = data.reduce((a, b) => a + b.time, '');
  const bestDist = data.reduce((a, b) => a + b.bestDist, '');
  const modifiedData = {
    time,
    bestDist,
  };

  const result = countWinningOptions(modifiedData);
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
