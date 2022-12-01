import cookie from '../../../utils/getCookie.js';
import { getInput } from '../../../utils/getInput.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const day = '10';
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ helper functions ] ------------------------------------------------ >>>
// function to parse puzzle input
const parseInput = (input) => {
  // remove trailing newline
  const tidiedInput = input
    .replace(/\n$/g, '')
    .split('\n')
    .map((line) => [...line]);
  // .map((line) => line.map((v) => parseInt(v, 10)));

  return tidiedInput;
};

// map of opening and closing symbols
const symbols = {
  '(': {
    closing: ')',
  },
  '[': {
    closing: ']',
  },
  '{': {
    closing: '}',
  },
  '<': {
    closing: '>',
  },
  syntaxPenalty: {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  },
  autocompletePoints: {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  },
};

// function to find first illegal character
const getIllegalChars = (line) => {
  // init array of opening characters
  const openingChars = [];

  // iterate through line characters
  const illegalChars = line.map((c) => {
    let illegalClosingChars = '';
    if (Object.keys(symbols).includes(c)) {
      // if character is opening character, add it to openingChars
      openingChars.push(c);
    } else {
      // otherwise, if character is closing character,
      // check to see if it matches the last opening character.
      // if it does, it's a legal char; otherwise, it's an illegal char.
      const lastOpeningChar = openingChars.pop();
      const lastOpeningCharMatch = symbols[lastOpeningChar].closing;
      if (c !== lastOpeningCharMatch) {
        illegalClosingChars += c;
      }
    }
    return illegalClosingChars;
  });

  const illegalCharsArr = [...illegalChars].filter((c) => c !== '');
  return illegalCharsArr;
};

// function to compute syntax error points or autocomplete points
const getCharacterScore = (
  illegalCharacter,
  type = 'syntaxPenalty' || 'autocompletePoints',
  syms = symbols
) => syms[type][illegalCharacter];

// function to get unclosed opening characters from incomplete line
const getUnclosedOpenChars = (line) => {
  // init array of opening characters
  const openingChars = [];

  // iterate through line characters
  line.forEach((c) => {
    if (Object.keys(symbols).includes(c)) {
      // if character is opening character, add it to openingChars
      openingChars.push(c);
    } else {
      // otherwise, if character is closing character,
      // remove the corresponding opening character from the list
      openingChars.pop();
    }
  });

  return openingChars;
};

// function to return closing characters that close opening characters
const getClosingChars = (openingChars) => {
  // first have to reverse unclosed opening characters
  const reversedOpeningChars = openingChars.reverse();
  const closingChars = reversedOpeningChars.map((c) => symbols[c].closing);
  return closingChars;
};

// <<< [ helper functions ] ------------------------------------------------ <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// function to accept input and output part one answer
const partOne = (input) => {
  const tidiedInput = parseInput(input);

  // get illegal characters for each line
  const illegalChars = tidiedInput.map((line) => getIllegalChars(line));
  // get first illegal characters for each line
  const firstIllegalChars = illegalChars
    .filter((a) => a.length > 0)
    .map((l) => l[0]);

  // compute syntax error for each illegal character
  const syntaxErrorScores = firstIllegalChars.map((c) =>
    getCharacterScore(c, 'syntaxPenalty')
  );

  // get answer
  const answer = syntaxErrorScores.reduce((a, b) => a + b, 0);
  return answer;
};

// function to accept input and output part two answer
const partTwo = (input) => {
  const tidiedInput = parseInput(input);

  // get incomplete lines (lines that don't have errors)
  const incompleteLines = tidiedInput.filter((line) => {
    const illegalChars = getIllegalChars(line);
    return illegalChars.length === 0;
  });
  console.log(incompleteLines.length);

  // get unclosed opening characters for each incomplete line
  const unclosedOpenChars = incompleteLines.map((line) => {
    const u = getUnclosedOpenChars(line);
    return u;
  });

  // get closing characters for each unclosed opening character
  const closingChars = unclosedOpenChars.map((line) => {
    const c = getClosingChars(line);
    return c;
  });

  // compute syntax error for each illegal character
  const syntaxErrorScores = closingChars.map((charsArr) => {
    let score = 0;
    charsArr.forEach((char) => {
      score *= 5;
      score += getCharacterScore(char, 'autocompletePoints');
    });

    // const score = closingChars
    //   .map((c) =>
    //     getCharacterScore(c, 'autocompletePoints')
    //   )
    //   .reduce((a, b) => a + b, 0);
    return score;
  });

  // sort syntaxErrorScores in ascending order
  const sortedSyntaxErrorScores = syntaxErrorScores.sort((a, b) => a - b);

  // get middle value of sortedSyntaxErrorScores
  const middleValue =
    sortedSyntaxErrorScores[Math.floor(sortedSyntaxErrorScores.length / 2)];

  // get answer
  const answer = middleValue;
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

// getAnswers();
// <<< [ main ] ------------------------------------------------------------ <<<

// >>> [ export ] --------------------------------------------------------- >>>
export { partOne, partTwo };
// <<< [ export ] --------------------------------------------------------- <<<
