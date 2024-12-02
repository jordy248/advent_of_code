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
const parseInput = (input) => {
  const data = input
    .trim()
    .split('\n')
    .map((d) => d.split(' '));
  return data;
};
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>

// >>> [ function to reset choices ] >>>
const getChoiceOrd = (game) => {
  const [opponentChoice, playerChoice] = game;
  const opponentChoiceOrd = opponentChoice.charCodeAt(0) - 'A'.charCodeAt(0);
  const playerChoiceOrd = playerChoice.charCodeAt(0) - 'X'.charCodeAt(0);
  return [opponentChoiceOrd, playerChoiceOrd];
};
// <<< [ function to reset choices ] <<<

// >>> [ partOne function ] >>>
const partOne = (data) => {
  const score = data.reduce((a, b) => {
    const [opponentChoiceOrd, playerChoiceOrd] = getChoiceOrd(b);
    const choiceScore = playerChoiceOrd + 1;
    let outcomeScore = (playerChoiceOrd + 1 - opponentChoiceOrd) % 3;
    outcomeScore += Math.sign(outcomeScore) === -1 ? 3 : 0;
    outcomeScore *= 3;
    const gameScore = choiceScore + outcomeScore;

    return a + gameScore;
  }, 0);

  return score;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  const score = data.reduce((a, b) => {
    const [opponentChoiceOrd, playerChoiceOrd] = getChoiceOrd(b);
    const choiceScore = playerChoiceOrd * 3;
    let outcomeScore = (playerChoiceOrd + opponentChoiceOrd + 2) % 3;
    outcomeScore += Math.sign(outcomeScore) === -1 ? 3 + 1 : 0 + 1;
    const gameScore = choiceScore + outcomeScore;

    return a + gameScore;
  }, 0);

  return score;
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
