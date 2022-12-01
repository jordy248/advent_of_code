import cookie from '../../../utils/getCookie.js';
import { getInput } from '../../../utils/getInput.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const day = '2';
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// function to accept input and output part one answer
const partOne = (input) => {
  // parse input
  const data = input.split('\n').map((x) => String(x));

  // tidy data to remove empty strings
  const tidyData = data.filter((x) => x !== '');

  // init position object to store horizontal and depth results
  const pos = {
    horizontal: 0,
    depth: 0,
  };

  // read positon changes from tidyData and update pos object
  const dirRe = /[A-z]+/;
  const unitsRe = /[0-9]+/;

  tidyData.forEach((s) => {
    const dir = dirRe.exec(s)[0];
    const units = +unitsRe.exec(s)[0];

    switch (dir) {
      case 'forward':
        pos.horizontal += units;
        break;
      case 'up':
        pos.depth -= units;
        break;
      case 'down':
        pos.depth += units;
        break;
      default:
        // 😠
        break;
    }
  });

  // multiply pos.horizontal and pos.depth together to get answer
  const answer = pos.horizontal * pos.depth;
  return answer;
};

// function to accept input and output part two answer
const partTwo = (input) => {
  const data = input.split('\n').map((x) => String(x));

  // tidy data to remove empty strings
  const tidyData = data.filter((x) => x !== '');

  // init position object to store horizontal, depth, and aim results
  const pos = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };

  // read positon changes from tidyData and update pos object
  const dirRe = /[A-z]+/;
  const unitsRe = /[0-9]+/;

  tidyData.forEach((s) => {
    const dir = dirRe.exec(s)[0];
    const units = +unitsRe.exec(s)[0];

    switch (dir) {
      case 'up':
        pos.aim -= units;
        break;
      case 'down':
        pos.aim += units;
        break;
      case 'forward':
        pos.horizontal += units;
        pos.depth += units * pos.aim;
        break;
      default:
        // 😠
        break;
    }
  });

  // multiply pos.horizontal and pos.depth together to get answer
  const answer = pos.horizontal * pos.depth;
  return answer;
};
// <<< [ answer functions ] ------------------------------------------------ <<<

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
