import { getInput, tidyInput } from '../../../utils/getData.js';

// set day
const day = '1';

const getAnswers = () => {
  // get part one answer
  const partOneAnswer = getInput(
    `https://adventofcode.com/2021/day/${day}/input`
  )
    .then((input) => {
      const data = input.split('\n').map((x) => parseInt(x));

      // filter

      // filter empty lines (NaN) out of data
      const tidiedData = tidyInput(data);

      // filter input to only retain entries that are smaller than the following entry
      // (look for smaller entries compared to following entry so we don't have to deal with first entry looking back on undefined)
      const arr = tidiedData.filter((d, i) => d < tidiedData[i + 1]);
      const answer = arr.length;
      return answer;
    })
    .catch((err) => console.log(err));

  // get part two answer
  const partTwoAnswer = getInput(
    `https://adventofcode.com/2021/day/${day}/input`
  )
    .then((input) => {
      const data = input.split('\n').map((x) => parseInt(x));

      // filter

      // filter empty lines (NaN) out of data
      const tidiedData = tidyInput(data);

      // function to compute moving sum of array
      // for window size of n, starting at index position i
      const movingSum = (arr, i, n) => {
        const windowArr = arr.slice(i, i + n);
        const windowSum = windowArr.reduce((a, b) => a + b, 0);
        return windowSum;
      };

      // compute moving sums
      const movingSumsArr = tidiedData.map((d, i) => {
        const windowSum = movingSum(tidiedData, i, 3);
        return windowSum;
      });

      // filter to only retain entries that are smaller than the following entry
      const arr = movingSumsArr.filter((d, i) => d < movingSumsArr[i + 1]);
      const answer = arr.length;

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

// // get data from advent of code
// getInput(`https://adventofcode.com/2021/day/${day}/input`)
//   .then((input) => {
//     const data = input.split('\n').map((x) => parseInt(x));

//     // filter

//     // filter empty lines (NaN) out of data
//     const tidiedData = tidyInput(data);

//     // filter input to only retain entries that are smaller than the following entry
//     // (look for smaller entries compared to following entry so we don't have to deal with first entry looking back on undefined)
//     const partOneArr = tidiedData.filter((d, i) => d < tidiedData[i + 1]);
//     const partOneAnswer = partOneArr.length;

//     console.log(`Part One Answer: ${partOneAnswer}`);

//     return partOneAnswer;
//   })
//   .catch((err) => console.log(err))
//   .finally((partOneAnswer) => console.log(`Part One Answer: ${partOneAnswer}`));

getAnswers();
