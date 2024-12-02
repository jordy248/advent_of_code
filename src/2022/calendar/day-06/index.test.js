import * as path from 'path';

import CONSTANTS from '../../Components/Constants.js';
import cookie from '../../../utils/Cookie.js';
import {
  getExampleInput,
  getExampleAnswer,
  getExampleAnswerBySelector,
} from '../../../utils/Example.js';
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
test('partOne example 1', async () => {
  const exampleAnswer = await getExampleAnswer(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    1,
    'number'
  );

  const exampleInput = await getExampleInput(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'pre:nth-of-type(1)'
  );

  const data = parseInput(exampleInput);
  const answer = partOne(data);

  expect(answer).toBe(exampleAnswer);
});

test('partOne example 2', async () => {
  const exampleAnswer = await getExampleAnswerBySelector(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(1) ul > li:nth-of-type(1) > code:nth-of-type(2)',
    'number'
  );

  const exampleInput = await getExampleInput(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(1) ul > li:nth-of-type(1) > code:nth-of-type(1)'
  );

  const data = parseInput(exampleInput);
  const answer = partOne(data);

  expect(answer).toBe(exampleAnswer);
});

test('partOne example 3', async () => {
  const exampleAnswer = await getExampleAnswerBySelector(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(1) ul > li:nth-of-type(2) > code:nth-of-type(2)',
    'number'
  );

  const exampleInput = await getExampleInput(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(1) ul > li:nth-of-type(2) > code:nth-of-type(1)'
  );

  const data = parseInput(exampleInput);
  const answer = partOne(data);

  expect(answer).toBe(exampleAnswer);
});

test('partOne example 4', async () => {
  const exampleAnswer = await getExampleAnswerBySelector(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(1) ul > li:nth-of-type(3) > code:nth-of-type(2)',
    'number'
  );

  const exampleInput = await getExampleInput(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(1) ul > li:nth-of-type(3) > code:nth-of-type(1)'
  );

  const data = parseInput(exampleInput);
  const answer = partOne(data);

  expect(answer).toBe(exampleAnswer);
});

test('partOne example 5', async () => {
  const exampleAnswer = await getExampleAnswerBySelector(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(1) ul > li:nth-of-type(4) > code:nth-of-type(2)',
    'number'
  );

  const exampleInput = await getExampleInput(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(1) ul > li:nth-of-type(4) > code:nth-of-type(1)'
  );

  const data = parseInput(exampleInput);
  const answer = partOne(data);

  expect(answer).toBe(exampleAnswer);
});

test('partTwo example 1', async () => {
  const exampleAnswer = await getExampleAnswerBySelector(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(2) ul > li:nth-of-type(1) > code:nth-of-type(2)',
    'number'
  );

  const exampleInput = await getExampleInput(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(2) ul > li:nth-of-type(1) > code:nth-of-type(1)'
  );

  const data = parseInput(exampleInput);
  const answer = partTwo(data);

  expect(answer).toBe(exampleAnswer);
});

test('partTwo example 2', async () => {
  const exampleAnswer = await getExampleAnswerBySelector(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(2) ul > li:nth-of-type(2) > code:nth-of-type(2)',
    'number'
  );

  const exampleInput = await getExampleInput(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(2) ul > li:nth-of-type(2) > code:nth-of-type(1)'
  );

  const data = parseInput(exampleInput);
  const answer = partTwo(data);

  expect(answer).toBe(exampleAnswer);
});

test('partTwo example 3', async () => {
  const exampleAnswer = await getExampleAnswerBySelector(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(2) ul > li:nth-of-type(3) > code:nth-of-type(2)',
    'number'
  );

  const exampleInput = await getExampleInput(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(2) ul > li:nth-of-type(3) > code:nth-of-type(1)'
  );

  const data = parseInput(exampleInput);
  const answer = partTwo(data);

  expect(answer).toBe(exampleAnswer);
});

test('partTwo example 4', async () => {
  const exampleAnswer = await getExampleAnswerBySelector(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(2) ul > li:nth-of-type(4) > code:nth-of-type(2)',
    'number'
  );

  const exampleInput = await getExampleInput(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(2) ul > li:nth-of-type(4) > code:nth-of-type(1)'
  );

  const data = parseInput(exampleInput);
  const answer = partTwo(data);

  expect(answer).toBe(exampleAnswer);
});

test('partTwo example 5', async () => {
  const exampleAnswer = await getExampleAnswerBySelector(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(2) ul > li:nth-of-type(5) > code:nth-of-type(2)',
    'number'
  );

  const exampleInput = await getExampleInput(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'main > article:nth-of-type(2) ul > li:nth-of-type(5) > code:nth-of-type(1)'
  );

  const data = parseInput(exampleInput);
  const answer = partTwo(data);

  expect(answer).toBe(exampleAnswer);
});
// <<< [ tests ] ----------------------------------------------------------- <<<
