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
  const data = input.trim();
  return data;
};
// <<< [ function to parse input ] <<<

// >>> [ functions to generate windows from string ] >>>
function* generateWindows(inArr, windowSize) {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i + windowSize <= inArr.length; i++) {
    yield inArr.slice(i, i + windowSize);
  }
}

function getWindows(inArr, windowSize) {
  return Array.from(generateWindows(inArr, windowSize));
}
// <<< [ functions to generate windows from string ] <<<

// >>> [ function to get unique items in array ] >>>
const getUniques = (arr) => arr.filter((v, i, a) => a.indexOf(v) === i);
// <<< [ function to get unique items in array ] <<<

// >>> [ function to detect packet start ] >>>
const getPacketStartIdx = (data, sequenceSize) => {
  // convert string to array and set sequence size
  const bufferArr = data.split('');

  // get sliding windows
  const windows = getWindows(bufferArr, sequenceSize);

  // find first window with all unique characters
  const windowUniqueVals = windows.map((w) => getUniques(w));
  const windowAllUniques = windowUniqueVals.filter(
    (w) => w.length === sequenceSize
  );

  const marker = windowAllUniques[0].join('');
  const packetStartIdx = data.indexOf(marker) + sequenceSize;

  return packetStartIdx;
};
// <<< [ function to detect packet start ] <<<

// <<< [ UTILS ] ----------------------------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  const sequenceSize = 4;
  const packetStartIdx = getPacketStartIdx(data, sequenceSize);
  return packetStartIdx;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  const sequenceSize = 14;
  const packetStartIdx = getPacketStartIdx(data, sequenceSize);
  return packetStartIdx;
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
