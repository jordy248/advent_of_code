import * as path from 'path';

import CONSTANTS from '../../Components/Constants.js';
import cookie from '../../../utils/Cookie.js';
import { getExampleInput, getExampleAnswer } from '../../../utils/Example.js';
import { parseInput, partOne, partTwo } from './index.js';

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

// >>> [ tests ] ----------------------------------------------------------- >>>
// test('partOne example', async () => {
//   const exampleAnswer = await getExampleAnswer(
//     `https://adventofcode.com/${YEAR}/day/${DAY}`,
//     cookie,
//     1,
//     'number'
//   );
//   console.log('partOne example answer:', exampleAnswer);

//   const exampleInput = await getExampleInput(
//     `https://adventofcode.com/${YEAR}/day/${DAY}`,
//     cookie,
//     'main > article:nth-of-type(1) > pre:nth-of-type(4)'
//   );

//   const data = parseInput(exampleInput);
//   const answer = partOne(data);

//   expect(answer).toBe(exampleAnswer);
// });

test('partTwo example', async () => {
  const exampleAnswer = await getExampleAnswer(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    2,
    'number'
  );
  console.log('partTwo example answer:', exampleAnswer);

  const exampleInput = await getExampleInput(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(1) > pre:nth-of-type(4)'
  );

  const data = parseInput(exampleInput);
  const answer = partTwo(data);

  expect(answer).toBe(exampleAnswer);
});
// <<< [ tests ] ----------------------------------------------------------- <<<
