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

// >>> [ day constants ] --------------------------------------------------- >>>
const cubeColors = ['red', 'green', 'blue'];
const availableCubes = {
  red: 12,
  green: 13,
  blue: 14,
};
// <<< [ day constants ] --------------------------------------------------- <<<

// >>> [ function to parse input ] ----------------------------------------- >>>
const parseInput = (input) => {
  const data = input
    .trim()
    .split('\n')
    .map((game) => {
      const gameNumber = +game.match(/\d+/)[0];

      const gameDraws = game.split(':')[1].split(';');

      const gameCubes = gameDraws.map((gameDraw) => {
        const gameCube = {};

        cubeColors.forEach((color) => {
          const colorPattern = new RegExp(`(?<number>\\d+)\\s${color}`);
          let colorCubesChosen = gameDraw.match(colorPattern);
          colorCubesChosen =
            colorCubesChosen && Object.hasOwn(colorCubesChosen.groups, 'number')
              ? +colorCubesChosen.groups.number
              : 0;
          gameCube[color] = colorCubesChosen;
        });

        return gameCube;
      });

      const thisGame = {};
      thisGame.gameNumber = gameNumber;
      thisGame.gameDraws = gameCubes;
      return thisGame;
    });
  return data;
};
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  const possibleGames = data.filter((game) => {
    const { gameDraws } = game;

    const isGamePossible = gameDraws.every((gameDraw) => {
      const drawnColors = Object.keys(gameDraw);

      const isDrawPossible = drawnColors.every((drawnColor) => {
        const nDrawn = gameDraw[drawnColor];
        return nDrawn <= availableCubes[drawnColor];
      });
      return isDrawPossible;
    });

    return isGamePossible;
  });

  const result = possibleGames
    .map((game) => game.gameNumber)
    .reduce((a, b) => a + b, 0);

  return result;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  const gamePowers = data.map((game) => {
    const { gameDraws } = game;

    const colorDraws = {
      maxDraws: [],
    };

    cubeColors.forEach((color) => {
      const draws = gameDraws.map((draw) => draw[color]);
      const maxColorDraw = Math.max(...draws);
      colorDraws[`${color}`] = draws;
      colorDraws.maxDraws.push(maxColorDraw);
    });

    const gamePower = colorDraws.maxDraws.reduce((a, b) => a * b, 1);
    return gamePower;
  });

  const result = gamePowers.reduce((a, b) => a + b, 0);
  return result;
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
        console.log(`Part One Answer: ${answerOne}`);
        console.log(`Part Two Answer: ${answerTwo}`);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

getAnswers();
// <<< [ main ] ------------------------------------------------------------ <<<

export { parseInput, partOne, partTwo };
