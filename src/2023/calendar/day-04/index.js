import * as path from 'path';

import CONSTANTS from '../../Components/Constants.js';
import { Cookie, Input, Utils } from '../../../utils/index.js';

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
function getCardVal(nMatches) {
  return nMatches === 0 ? 0 : 2 ** (nMatches - 1);
}
// <<< [ utils ] ----------------------------------------------------------- <<<

// >>> [ function to parse input ] ----------------------------------------- >>>
const parseInput = (input) => {
  const data = input
    .trim()
    .split('\n')
    .map((card) => {
      const [cardNumber, cardGame] = card.split(':');

      let [numbersWinning, numbersScratched] = cardGame.split('|');
      numbersWinning = numbersWinning
        .trim()
        .replaceAll('  ', ' ')
        .split(' ')
        .map(Number);
      numbersScratched = numbersScratched
        .trim()
        .replaceAll('  ', ' ')
        .split(' ')
        .map(Number);

      const cardParsed = {
        cardNumber,
        nMatches: 0,
        cardCount: 1,
        numbersWinning,
        numbersScratched,
      };

      return cardParsed;
    });
  return data;
};
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  const cardVals = data.map((card) => {
    const { numbersWinning, numbersScratched } = card;
    const nMatches = Utils.count(numbersScratched, (scratchedNumber) =>
      numbersWinning.includes(scratchedNumber)
    );
    const cardVal = getCardVal(nMatches);
    return cardVal;
  });

  const result = Utils.sumArray(cardVals);
  return result;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  data.forEach((card, i) => {
    const { numbersWinning, numbersScratched, cardCount } = card;
    const nMatches = Utils.count(numbersScratched, (scratchedNumber) =>
      numbersWinning.includes(scratchedNumber)
    );
    data[i].nMatches = nMatches;

    for (let j = i + 1; j <= i + nMatches; j += 1) {
      data[j].cardCount += cardCount;
    }
  });

  const result = Utils.sumArray(data.map((card) => card.cardCount));
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
