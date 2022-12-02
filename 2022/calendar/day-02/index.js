import * as path from 'path';

import CONSTANTS from '../../Components/Constants.js';
import cookie from '../../../utils/Cookie.js';
import { getInput } from '../../../utils/Input.js';

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

// >>> [ function to parse input ] ----------------------------------------- >>>
const parseInput = (input) => {
  const data = input
    .trim()
    .split('\n')
    .map((d) => d.split(' '));

  return data;
};
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ function to decode choices ] >>>
const getChoice = (choiceEncoded) => {
  const decoder = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
    X: 'rock',
    Y: 'paper',
    Z: 'scissors',
  };
  const choiceDecoded = decoder[choiceEncoded];
  return choiceDecoded;
};
// <<< [ function to decode choices ] <<<

// >>> [ function to determine game outcome ] >>>
const getGameOutcome = (opponentChoice, playerChoice) => {
  const rules = {
    rock: {
      scissors: 'win',
      paper: 'loss',
      rock: 'draw',
    },
    paper: {
      rock: 'win',
      scissors: 'loss',
      paper: 'draw',
    },
    scissors: {
      paper: 'win',
      rock: 'loss',
      scissors: 'draw',
    },
  };

  const outcome = {
    opponent: {
      choice: opponentChoice,
      outcome: rules[opponentChoice][playerChoice],
    },
    player: {
      choice: playerChoice,
      outcome: rules[playerChoice][opponentChoice],
    },
  };

  return outcome;
};
// <<< [ function to determine game outcome ] <<<

// >>> [ function to score outcome ] >>>
const getGameScore = (playerOutcome) => {
  const rules = {
    shape: {
      rock: 1,
      paper: 2,
      scissors: 3,
    },
    outcome: {
      loss: 0,
      draw: 3,
      win: 6,
    },
  };

  const { choice, outcome } = playerOutcome;
  const score = rules.shape[choice] + rules.outcome[outcome];
  return score;
};
// <<< [ function to score outcome ] <<<

// >>> [ function to determine choices based on player outcome ] >>>
const getChoiceByOutcome = (opponentChoiceDecoded, playerOututcome) => {
  const decoder = {
    X: {
      // need to lose
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper',
    },
    Y: {
      // need to draw
      rock: 'rock',
      paper: 'paper',
      scissors: 'scissors',
    },
    Z: {
      // need to win
      rock: 'paper',
      paper: 'scissors',
      scissors: 'rock',
    },
  };
  const playerChoiceDecoded = decoder[playerOututcome][opponentChoiceDecoded];
  return playerChoiceDecoded;
};
// <<< [ function to determine player choice based on player outcome ] <<<

// >>> [ function to evaluate game ] >>>
const evalGame = (gameArr, part) => {
  let opponentChoice;
  let playerChoice;

  if (part === 1) {
    // get choices
    const [oChoice, pChoice] = gameArr;
    opponentChoice = getChoice(oChoice);
    playerChoice = getChoice(pChoice);
  } else if (part === 2) {
    const [oChoice, pOutcome] = gameArr;
    opponentChoice = getChoice(oChoice);
    playerChoice = getChoiceByOutcome(opponentChoice, pOutcome);
  } else {
    return null;
  }

  // get game outcome
  const outcome = getGameOutcome(opponentChoice, playerChoice);

  // get each player's game score
  const opponentScore = getGameScore(outcome.opponent);
  const playerScore = getGameScore(outcome.player);
  const score = {
    opponent: opponentScore,
    player: playerScore,
  };

  return score;
};
// <<< [ function to evaluate game ] <<<

// >>> [ partOne function ] >>>
const partOne = (data) => {
  const gameScores = data.map((g) => evalGame(g, 1));

  // sum player score across all games
  const playerScore = gameScores.reduce((a, b) => a + b.player, 0);

  return playerScore;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  const gameScores = data.map((g) => evalGame(g, 2));

  // sum player score across all games
  const playerScore = gameScores.reduce((a, b) => a + b.player, 0);

  return playerScore;
};
// <<< [ partTwo function ] <<<
// <<< [ answer functions ] ------------------------------------------------ <<<

// >>> [ main ] ------------------------------------------------------------ >>>
const getAnswers = async () => {
  try {
    const input = await getInput(
      `https://adventofcode.com/${YEAR}/day/${DAY}/input`,
      cookie
    );
    const data = parseInput(input);
    const partOneAnswer = partOne(data);
    const partTwoAnswer = partTwo(data);

    return Promise.all([partOneAnswer, partTwoAnswer]).then(
      ([answerOne, answerTwo]) => {
        // console.log(`Part One Answer: ${answerOne}`);
        // console.log(`Part Two Answer: ${answerTwo}`);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

getAnswers();
// <<< [ main ] ------------------------------------------------------------ <<<

export { parseInput, partOne, partTwo };
