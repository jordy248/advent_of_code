import cookie from '../../utils/Cookie.js';
import { getInput } from '../../utils/Input.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const day = '7';
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ helper functions ] ------------------------------------------------ >>>
const parseInput = (input) => {
  // remove trailing newline
  const tidiedInput = input
    .replace(/\n$/g, '')
    .split(',')
    .map((x) => +x);

  return tidiedInput;
};

// factorial function
const addtorial = (n) => {
  if (n === 0) {
    return 0;
  }
  return n + addtorial(n - 1);
};
// <<< [ helper functions ] ------------------------------------------------ <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// function to accept input and output part one answer
const partOne = (input) => {
  const positions = parseInput(input);

  // get max position
  const maxPosition = Math.max(...positions);

  // get array of possible positions
  const possiblePositions = [...Array(maxPosition).keys()];

  // init array to store costs required to move all crabs to each position
  const costs = [];

  // compute and save costs to move all crabs to each position
  for (const pos of possiblePositions) {
    const posCosts = positions
      .map((x) => Math.abs(x - pos))
      .reduce((a, b) => a + b);

    costs.push(posCosts);
  }

  // answer is the lowest cost
  const answer = Math.min(...costs);
  return answer;
};

// function to accept input and output part two answer
const partTwo = (input) => {
  const positions = parseInput(input);

  // get max position
  const maxPosition = Math.max(...positions);

  // get array of possible positions
  const possiblePositions = [...Array(maxPosition).keys()];

  // init array to store costs required to move all crabs to each position
  const costs = [];

  // compute and save costs to move all crabs to each position
  for (const pos of possiblePositions) {
    const posCosts = positions.map((x) => addtorial(Math.abs(x - pos)));

    const totalCost = posCosts.reduce((a, b) => a + b);

    costs.push(totalCost);
  }

  // answer is the lowest cost
  const answer = Math.min(...costs);
  return answer;
};

// >>> [ main ] ------------------------------------------------------------ >>>
const getAnswers = () => {
  // get part one answer
  const partOneAnswer = getInput(
    `https://adventofcode.com/2021/day/${day}/input`,
    cookie
  )
    .then((input) => {
      const answer = partOne(input);
      return answer;
    })
    .catch((err) => console.log(err));

  // get part two answer
  const partTwoAnswer = getInput(
    `https://adventofcode.com/2021/day/${day}/input`,
    cookie
  )
    .then((input) => {
      const answer = partTwo(input);
      return answer;
    })
    .catch((err) => console.log(err));

  return Promise.all([partOneAnswer, partTwoAnswer]).then(
    ([answerOne, answerTwo]) => {
      console.log(`Part One Answer: ${answerOne}`);
      console.log(`Part Two Answer: ${answerTwo}`);
    }
  );
};

getAnswers();
// <<< [ main ] ------------------------------------------------------------ <<<

// >>> [ export ] --------------------------------------------------------- >>>
export { partOne, partTwo };
// <<< [ export ] --------------------------------------------------------- <<<
