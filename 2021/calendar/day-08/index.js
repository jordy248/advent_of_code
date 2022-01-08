import cookie from '../../../utils/getCookie.js';
import { getInput } from '../../../utils/getInput.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const day = '8';
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ helper functions ] ------------------------------------------------ >>>
// function to parse puzzle input
const parseInput = (input) => {
  // remove trailing newline
  const tidiedInput = input
    .replace(/\n$/g, '')
    .split('\n')
    .map((l) => l.split(' | ').map((s) => s.split(' ')));

  return tidiedInput;
};

// function to test if array B is a subset of array A
const BIsSubsetOfA = (A, B) => B.every((b) => A.includes(b));

// function to get intersection of array A and array B
const intersection = (A, B) => new Set(A.filter((a) => B.includes(a)));

// init provided segment definitions object
const digits = {
  0: {
    segs: ['a', 'b', 'c', 'e', 'f', 'g'],
  },
  1: {
    segs: ['c', 'f'],
  },
  2: {
    segs: ['a', 'c', 'd', 'e', 'g'],
  },
  3: {
    segs: ['a', 'c', 'd', 'f', 'g'],
  },
  4: {
    segs: ['b', 'c', 'd', 'f'],
  },
  5: {
    segs: ['a', 'b', 'd', 'f', 'g'],
  },
  6: {
    segs: ['a', 'b', 'd', 'e', 'f', 'g'],
  },
  7: {
    segs: ['a', 'c', 'f'],
  },
  8: {
    segs: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  },
  9: {
    segs: ['a', 'b', 'c', 'd', 'f', 'g'],
  },
};

// add segment count to segments object
Object.keys(digits).forEach((key) => {
  digits[key].nSegs = digits[key].segs.length;
});
// <<< [ helper functions ] ------------------------------------------------ <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// function to accept input and output part one answer
const partOne = (input) => {
  const tidiedInput = parseInput(input);

  // console.log(digits);

  // get pattern lines (parts after " | ")
  const patternLines = tidiedInput.map((l) => l[1]);

  // count number of times we see a pattern with the number of digits
  // present in 1 (2), 4 (4), 7 (3), or 8 (7)
  const lengthsOfInterest = [2, 4, 3, 7];
  let answer = 0;

  patternLines.forEach((l) => {
    l.forEach((p) => {
      if (lengthsOfInterest.includes(p.length)) {
        answer += 1;
      }
    });
  });

  return answer;
};

// function to accept input and output part two answer
const partTwo = (input) => {
  const tidiedInput = parseInput(input);
  // console.log(tidiedInput);

  // console.log(digits);

  const answersArr = [];
  const testAnswer = 0;

  tidiedInput.forEach((l) => {
    // init lineSegments
    const lineSegments = {
      0: {
        nSegs: 6,
        segs: [],
      },
      1: {
        nSegs: 2,
        segs: [],
      },
      2: {
        nSegs: 5,
        segs: [],
      },
      3: {
        nSegs: 5,
        segs: [],
      },
      4: {
        nSegs: 4,
        segs: [],
      },
      5: {
        nSegs: 5,
        segs: [],
      },
      6: {
        nSegs: 6,
        segs: [],
      },
      7: {
        nSegs: 3,
        segs: [],
      },
      8: {
        nSegs: 7,
        segs: [],
      },
      9: {
        nSegs: 6,
        segs: [],
      },
    };
    // init lineDigits
    const lineDigits = {};

    const signalPatterns = l[0].sort((a, b) => a.length - b.length);
    const outputPatterns = l[1].sort((a, b) => a.length - b.length);

    signalPatterns.forEach((p) => {
      const pattern = [...p].sort();
      if (pattern.length === 2) {
        // >>> [ 1 ] >>>
        lineSegments[1].segs = pattern;
        lineDigits[pattern] = 1;
      } else if (pattern.length === 4) {
        // >>> [ 4 ] >>>
        lineSegments[4].segs = pattern;
        lineDigits[pattern] = 4;
      } else if (pattern.length === 3) {
        // >>> [ 7 ] >>>
        lineSegments[7].segs = pattern;
        lineDigits[pattern] = 7;
      } else if (pattern.length === 7) {
        // >>> [ 8 ] >>>
        lineSegments[8].segs = pattern;
        lineDigits[pattern] = 8;
      } else if (pattern.length === 5) {
        // >>> [ 2, 3, 5 ] >>>
        if (intersection(pattern, lineSegments[1].segs).size === 2) {
          // if size of intersection between p and 1 is 2, then p is 3
          lineSegments[3].segs = pattern;
          lineDigits[pattern] = 3;
        } else if (intersection(pattern, lineSegments[4].segs).size === 2) {
          // if size of intersection between p and 4 is 2, then p is 2
          lineSegments[2].segs = pattern;
          lineDigits[pattern] = 2;
        } else {
          // otherwise, p is 5
          lineSegments[5].segs = pattern;
          lineDigits[pattern] = 5;
        }
      } else if (p.length === 6) {
        // >>> [ 0, 6, 9 ] >>>
        if (intersection(pattern, lineSegments[1].segs).size === 1) {
          // if size of intersection between p and 1 is 1, then p is 6
          lineSegments[6].segs = pattern;
          lineDigits[pattern] = 6;
        } else if (intersection(pattern, lineSegments[4].segs).size === 4) {
          // if size of intersection between p and 4 is 4, then p is 9
          lineSegments[9].segs = pattern;
          lineDigits[pattern] = 9;
        } else {
          // otherwise, p is 0
          lineSegments[0].segs = pattern;
          lineDigits[pattern] = 0;
        }
      }
    });

    let output = '';
    outputPatterns.forEach((p) => {
      const pattern = [...p].sort();
      output += `${lineDigits[pattern]}`;
    });
    answersArr.push(parseInt(output));
  });

  const answer = answersArr.reduce((a, b) => a + b);
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

// >>> [ exports ] --------------------------------------------------------- >>>
// module.exports = { partOne, partTwo };
// <<< [ exports ] --------------------------------------------------------- <<<
