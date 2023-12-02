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

// >>> [ function to parse input ] ----------------------------------------- >>>
const parseInput = (input) => input.trim().split('\n');
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  const calNumbers = data.map((calVal) =>
    calVal.replaceAll(/[A-z]/g, '').trim()
  );

  const calVals = calNumbers.map((numbers) =>
    parseInt(numbers.slice(0, 1) + numbers.slice(-1))
  );
  const result = calVals.reduce((a, b) => a + b, 0);
  return result;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  const numbers = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];

  const calNumbersAdj = data.map((calVal) => {
    let calValAdj = calVal;
    numbers.forEach((number) => {
      const numberVal = `${numbers.indexOf(number) + 1}`;
      const numberValAndFirstAndLastLetters =
        number.slice(0, 1) + numberVal + number.slice(-1);
      calValAdj = calValAdj.replaceAll(number, numberValAndFirstAndLastLetters);
    });
    return calValAdj;
  });

  const calNumbers = calNumbersAdj.map((calVal) =>
    calVal.replaceAll(/[A-z]/g, '')
  );

  const calVals = calNumbers.map((calNumber) =>
    parseInt(calNumber.trim().slice(0, 1) + calNumber.trim().slice(-1))
  );
  const result = calVals.reduce((a, b) => a + b, 0);
  return result;
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
