import cookie from '../../../utils/getCookie.js';
import { getInput } from '../../../utils/getInput.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const day = '3';
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ helper functions ] ------------------------------------------------ >>>
// function to concatenate characters in a given position for each string
const getPositionCharacters = (data, i) => {
  // init result
  let result = '';
  // concatenate characters in position i for each string in data
  data.forEach((d) => {
    result += d[i];
  });
  return result;
};

// function to count the number of times a character appears in string by
// removing all other characters from string and finding remaining length
const countChar = (s, c) => {
  // remove from s any character that is not c
  const re = new RegExp(`[^${c}]`, 'g');
  const sFiltered = s.replace(re, '');
  // return length of sFiltered
  const count = sFiltered.length;
  return count;
};

// <<< [ helper functions ] ------------------------------------------------ <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// function to accept input and output part one answer
const partOne = (input) => {
  // parse input
  const data = input.split('\n').map((x) => String(x));

  // tidy data to remove empty strings
  const tidyData = data.filter((x) => x !== '');

  // init empty arrays for gamma and epsilon
  let gammaArr = Array(tidyData[0].length).fill(0);
  let epsilonArr = Array(tidyData[0].length).fill(0);

  // populate gammaArr
  // iterate through each position and concatenate the most common characters
  gammaArr = gammaArr.map((_, i) => {
    const posStr = getPositionCharacters(tidyData, i);
    const countZero = countChar(posStr, '0');
    const countOne = countChar(posStr, '1');

    return countOne > countZero ? 1 : 0;
  });

  // populate epsilonArr
  // iterate through each position and concatenate the least common characters
  epsilonArr = epsilonArr.map((_, i) => {
    const posStr = getPositionCharacters(tidyData, i);
    const countZero = countChar(posStr, '0');
    const countOne = countChar(posStr, '1');

    return countOne < countZero ? 1 : 0;
  });

  // below gets gamma by using bitwise XOR to invert epsilon
  // const strLen = tidyData[0].length;
  // const gamma = parseInt(gammaArr.join(''), 2);
  // // eslint-disable-next-line no-bitwise
  // const epsilon = gamma ^ parseInt(Array(strLen).fill(1).join(''), 2);
  // console.log(`gamma:   ${gamma.toString(2).padStart(strLen, '0')}`);
  // console.log(`epsilon: ${epsilon.toString(2).padStart(strLen, '0')}`);

  // get gamma by converting binary to decimal
  const gammaDecimal = parseInt(gammaArr.join(''), 2);
  // get epsilon by converting binary to decimal
  const epsilonDecimal = parseInt(epsilonArr.join(''), 2);
  // get power consumption by multiplying gamma and epsilon
  const powerConsumption = gammaDecimal * epsilonDecimal;

  return powerConsumption;
};

// function to accept input and output part two answer
const partTwo = (input) => {
  // parse input
  const data = input.split('\n').map((x) => String(x));

  // tidy data to remove empty strings
  const tidyData = data.filter((x) => x !== '');

  // init empty arrays for gamma and epsilon
  const o2RatingArr = Array(tidyData[0].length).fill(0);
  const co2RatingArr = Array(tidyData[0].length).fill(0);

  // update o2RatingArr
  let o2Rating = [...tidyData]; // copy so we can filter as we go
  o2RatingArr.forEach((_, i) => {
    // get position string
    const posStr = getPositionCharacters(o2Rating, i);
    // get count of zeros
    const countZero = countChar(posStr, '0');
    // get count of ones
    const countOne = countChar(posStr, '1');
    // common char
    const commonChar = countOne >= countZero ? '1' : '0';
    // update o2Rating
    if (o2Rating.length > 1) {
      o2Rating = o2Rating.filter((d) => d[i] === commonChar);
    }
  });

  // update co2RatingArr
  let co2Rating = [...tidyData]; // copy so we can filter as we go
  co2RatingArr.forEach((_, i) => {
    // get position string
    const posStr = getPositionCharacters(co2Rating, i);
    // get count of zeros
    const countZero = countChar(posStr, '0');
    // get count of ones
    const countOne = countChar(posStr, '1');
    // common char
    const leastCommonChar = countOne < countZero ? '1' : '0';
    // update co2Rating
    if (co2Rating.length > 1) {
      co2Rating = co2Rating.filter((d) => d[i] === leastCommonChar);
    }
  });

  // get o2Rating by converting binary to decimal
  const o2RatingDecimal = parseInt(o2Rating.join(''), 2);
  // get co2Rating by converting binary to decimal
  const co2RatingDecimal = parseInt(co2Rating.join(''), 2);
  // get life support rating by multiplying gamma and epsilon
  const lifeSupportRating = o2RatingDecimal * co2RatingDecimal;

  return lifeSupportRating;
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

// >>> [ exports ] --------------------------------------------------------- >>>
module.exports = { partOne, partTwo };
// <<< [ exports ] --------------------------------------------------------- <<<
