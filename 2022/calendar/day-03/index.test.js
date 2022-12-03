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
test('partOne example', async () => {
  const exampleAnswer = await getExampleAnswer(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    1
  );
  console.log('partOne example answer:', exampleAnswer);

  const exampleInput = await getExampleInput(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'pre:nth-of-type(1)'
  );

  const data = parseInput(exampleInput);
  const answer = partOne(data);

  // expect(answer).toBe(24000);
  expect(answer).toBe(+exampleAnswer);
});

test('partTwo example', async () => {
  const exampleAnswer = await getExampleAnswer(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    2
  );
  console.log('partTwo example answer:', exampleAnswer);

  const exampleInput = await getExampleInput(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'pre:nth-of-type(1)'
  );

  const data = parseInput(exampleInput);
  const answer = partTwo(data);

  // expect(answer).toBe(45000);
  expect(answer).toBe(+exampleAnswer);
});
// <<< [ tests ] ----------------------------------------------------------- <<<
