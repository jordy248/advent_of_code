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
function getHandStrength(hand, bid, jokerRule = false) {
  const cardCounts = Utils.countChars(hand);

  let nJokers = 0;
  if (jokerRule && Utils.hasProp(cardCounts, 'J')) {
    nJokers = cardCounts.J;
    delete cardCounts.J;
  }

  const counts = Object.values(cardCounts);

  let countsSorted = Utils.sortDescending(counts);
  countsSorted[0] += nJokers;
  // edge case if hand is all jokers and jokerRule is active
  if (jokerRule && hand === 'JJJJJ') {
    countsSorted = [5];
  }

  const countsSortedStr = countsSorted.join(''); // because js compares objects by reference, not value

  let strength = 0;

  if (countsSortedStr === '5') {
    strength = 10;
  } else if (countsSortedStr === '41') {
    strength = 9;
  } else if (countsSortedStr === '32') {
    strength = 8;
  } else if (countsSortedStr === '311') {
    strength = 7;
  } else if (countsSortedStr === '221') {
    strength = 6;
  } else if (countsSortedStr === '2111') {
    strength = 5;
  } else if (countsSortedStr === '11111') {
    strength = 4;
  }

  return {
    hand,
    bid,
    strength,
  };
}
// <<< [ utils ] ----------------------------------------------------------- <<<

// >>> [ function to parse input ] ----------------------------------------- >>>
function parseInput(input) {
  const data = input
    .trim()
    .split(/\n/)
    .map((game) => {
      let [hand, bid] = game.split(/\s/);
      bid = parseInt(bid);
      return { hand, bid };
    });

  return data;
}
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  // console.log('data', data);

  const handsWithStrengths = data.map(({ hand, bid }) =>
    getHandStrength(hand, bid, false)
  );

  const hashedHands = handsWithStrengths.map((handWithStrength) => {
    const { hand, bid, strength } = handWithStrength;

    const cardStrengths = '23456789TJQKA';
    const modifiedHand = hand
      .split('')
      .map((card) => cardStrengths.indexOf(card));

    const hash = [];
    hash.push(strength);
    modifiedHand.forEach((c) => hash.push(c));
    return {
      hand,
      modifiedHand,
      bid,
      strength,
      hash,
    };
  });

  const sortedHands = [...hashedHands].sort((a, b) => {
    for (let i = 0; i < a.hash.length; i += 1) {
      if (a.hash[i] !== b.hash[i]) return a.hash[i] - b.hash[i];
    }
    return 0;
  });

  const handScores = sortedHands.map((hand, i) => {
    const rank = i + 1;
    const score = rank * hand.bid;
    hand.rank = rank;
    hand.score = score;
    return score;
  });

  const winnings = Utils.sumArray(handScores);

  const result = winnings;
  return result;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  // console.log('data', data);

  const handsWithStrengths = data.map(({ hand, bid }) =>
    getHandStrength(hand, bid, true)
  );

  const hashedHands = handsWithStrengths.map((handWithStrength) => {
    const { hand, bid, strength } = handWithStrength;

    const cardStrengths = 'J23456789TQKA';
    const modifiedHand = hand
      .split('')
      .map((card) => cardStrengths.indexOf(card));

    const hash = [];
    hash.push(strength);
    modifiedHand.forEach((c) => hash.push(c));
    return {
      hand,
      modifiedHand,
      bid,
      strength,
      hash,
    };
  });

  const sortedHands = [...hashedHands].sort((a, b) => {
    for (let i = 0; i < a.hash.length; i += 1) {
      if (a.hash[i] !== b.hash[i]) return a.hash[i] - b.hash[i];
    }
    return 0;
  });

  const handScores = sortedHands.map((hand, i) => {
    const rank = i + 1;
    const score = rank * hand.bid;
    hand.rank = rank;
    hand.score = score;
    return score;
  });

  const winnings = Utils.sumArray(handScores);

  const result = winnings;
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
