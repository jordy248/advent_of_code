import cookie from '../../../utils/getCookie.js';
import { getInput } from '../../../utils/getInput.js';

// set day
const day = '2';

const getAnswers = () => {
  // get part one answer
  const partOneAnswer = getInput(
    `https://adventofcode.com/2021/day/${day}/input`,
    cookie
  )
    .then((input) => {
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
        const units = unitsRe.exec(s)[0];

        switch (dir) {
          case 'forward':
            pos.horizontal += Number(units);
            break;
          case 'up':
            pos.depth -= Number(units);
            break;
          case 'down':
            pos.depth += Number(units);
            break;
          default:
            break;
        }
      });

      // multiple pos.horizontal and pos.depth together to get answer
      const answer = pos.horizontal * pos.depth;
      return answer;
    })
    .catch((err) => console.log(err));

  // get part two answer
  const partTwoAnswer = getInput(
    `https://adventofcode.com/2021/day/${day}/input`,
    cookie
  )
    .then((input) => {
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
        const units = unitsRe.exec(s)[0];

        switch (dir) {
          case 'up':
            pos.aim -= Number(units);
            break;
          case 'down':
            pos.aim += Number(units);
            break;
          case 'forward':
            pos.horizontal += Number(units);
            pos.depth += Number(units) * pos.aim;
            break;
          default:
            break;
        }
      });

      // multiple pos.horizontal and pos.depth together to get answer
      const answer = pos.horizontal * pos.depth;
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
