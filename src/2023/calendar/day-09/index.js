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
function getDiffSeq(seq) {
  const diffSeq = [];
  for (let i = 0; i < seq.length - 1; i += 1) {
    const a = seq[i];
    const b = seq[i + 1];
    const diff = b - a;
    diffSeq.push(diff);
  }
  return diffSeq;
}

function getDiffSeqs(history) {
  const seqs = [];
  let currSeq = history;

  // eslint-disable-next-line no-loop-func
  while (!currSeq.every((x) => x === 0)) {
    seqs.push(currSeq);
    currSeq = getDiffSeq(currSeq);
  }
  seqs.push(currSeq); // save last sequence

  return seqs;
}

function getExtrapolatedSeqs(seqs) {
  const seqsReversed = [...seqs].reverse();
  let lastPlaceholder = 0;

  seqsReversed.forEach((seq) => {
    const seqEnd = seq[seq.length - 1] + lastPlaceholder;
    lastPlaceholder = seqEnd;
    seq.push(seqEnd);
  });

  return [...seqsReversed].reverse();
}

function getExtrapolatedHistory(history, backwards = false) {
  const diffSeqs = backwards
    ? getDiffSeqs([...history].reverse())
    : getDiffSeqs(history);
  const extrapolatedSeqs = getExtrapolatedSeqs(diffSeqs);
  return extrapolatedSeqs;
}

function getHistoryNextValue(history, backwards) {
  const extrapolatedSeqs = getExtrapolatedHistory(history, backwards);
  const extrapolatedHistory = extrapolatedSeqs[0];
  const historyNextValue = extrapolatedHistory[extrapolatedHistory.length - 1];
  return historyNextValue;
}
// <<< [ utils ] ----------------------------------------------------------- <<<

// >>> [ function to parse input ] ----------------------------------------- >>>
function parseInput(input) {
  const data = input
    .trim()
    .split(/\n/)
    .map((line) => line.split(/\s/).map((x) => parseInt(x)));

  return data;
}
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  // console.log('data', data);
  const historyNextValues = data.map((history) =>
    getHistoryNextValue(history, false)
  );
  const result = Utils.sumArray(historyNextValues);
  return result;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  // console.log('data', data);
  const historyNextValues = data.map((history) =>
    getHistoryNextValue(history, true)
  );
  const result = Utils.sumArray(historyNextValues);
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
