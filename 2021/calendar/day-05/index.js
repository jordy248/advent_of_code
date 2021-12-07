import cookie from '../../../utils/getCookie.js';
import { getInput } from '../../../utils/getInput.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const day = '5';
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ helper functions ] ------------------------------------------------ >>>

// <<< [ helper functions ] ------------------------------------------------ <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// function to accept input and output part one answer
const partOne = (input) => 1;

// function to accept input and output part two answer
const partTwo = (input) => 2;
// <<< [ answer functions ] ------------------------------------------------ <<<

// >>> [ main ] ------------------------------------------------------------ >>>
const getAnswers = () => {
  // get part one answer
  const partOneAnswer = getInput(
    `https://adventofcode.com/2021/day/${day}/input`,
    cookie
  )
    .then((i) => {
      const tidiedInput = i.replace(/\n$/g, '');
      const numberRegex = /\d+/g;

      const input = tidiedInput;

      /**
       * @param {string} input
       * @param {boolean} diagonal
       * @returns {number}
       */
      function solution(input, diagonal = false) {
        /**
         * @type {(undefined|number)[][]}
         */
        const coords = [];

        /**
         * @param {number} x
         * @param {number} y
         */
        function mark(x, y) {
          if (!coords[y]) coords[y] = [];
          coords[y][x] = (coords[y][x] || 0) + 1;
        }

        for (const line of input.split('\n')) {
          const [x1, y1, x2, y2] = line.match(numberRegex).map(Number);
          if (x1 === x2) {
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
              mark(x1, y);
            }
          } else if (y1 === y2) {
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
              mark(x, y1);
            }
          } else if (diagonal) {
            const stepX = x1 < x2 ? 1 : -1;
            const stepY = y1 < y2 ? 1 : -1;
            for (let i = 0; i <= Math.abs(x1 - x2); i++) {
              const x = x1 + i * stepX;
              const y = y1 + i * stepY;
              mark(x, y);
            }
          }
        }

        return coords.flat().filter((n) => n > 1).length;
      }

      /**
       * 2021 Day 5 - part 1
       * @param {string} input
       * @returns {number}
       */
      function part1(input) {
        return solution(input);
      }

      /**
       * 2021 Day 5 - part 2
       * @param {string} input
       * @returns {number}
       */
      function part2(input) {
        return solution(input, true);
      }

      console.log('2021 Day 5 - part 1:', part1(input));
      console.log('2021 Day 5 - part 2:', part2(input));
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

// >>> [ exports ] --------------------------------------------------------- >>>
// module.exports = { partOne, partTwo };
// <<< [ exports ] --------------------------------------------------------- <<<
