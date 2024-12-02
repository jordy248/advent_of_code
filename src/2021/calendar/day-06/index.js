import cookie from '../../../utils/Cookie.js';
import { getInput } from '../../../utils/Input.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const day = '6';
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
// <<< [ helper functions ] ------------------------------------------------ <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// function to accept input and output part one answer
const partOne = (input) => {
  const fish = parseInput(input);
  const nDays = 80;

  [...Array(nDays).keys()].forEach((day) => { // eslint-disable-line
    fish.forEach((f, i) => {
      if (f === 0) {
        fish[i] = 6;
        fish.push(8);
      } else {
        fish[i] = f - 1;
      }
    });
  });

  const answer = fish.length;
  return answer;
};

// function to accept input and output part two answer
const partTwo = (input) => {
  const fish = parseInput(input);
  const nDays = 256;
  const maxAge = 9;

  // init array consisting of entry for each stage of fish lifecycle
  let agesArr = Array(maxAge).fill(0);
  // define agesArr based on fish input
  agesArr = agesArr.map((_, i) => {
    const nFish = fish.filter((f) => f === i).length;
    return nFish;
  });

  [...Array(nDays).keys()].forEach((day) => { // eslint-disable-line
    // update ages by shifting items to the left
    // and save the leftmost item (count of spawning fish)
    const spawnFish = agesArr.shift();
    // spawning fish become fish with 6 days
    agesArr[6] += spawnFish;
    // spawning fish add new fish with 8 days
    agesArr.push(spawnFish);
  });

  // answer is sum of fish of all ages
  const answer = agesArr.reduce((acc, curr) => acc + curr, 0);
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
