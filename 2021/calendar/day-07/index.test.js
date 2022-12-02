import cookie from '../../../utils/Cookie.js';
import { getExampleInput } from '../../../utils/Example.js';
import { partOne, partTwo } from './index.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const day = '7';
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ tests ] ----------------------------------------------------------- >>>
test('partOne example', () =>
  getExampleInput(
    `https://adventofcode.com/2021/day/${day}`,
    cookie,
    'pre:nth-of-type(1)'
  ).then((input) => {
    const answer = partOne(input);
    expect(answer).toBe(37);
  }));

test('partTwo example', () =>
  getExampleInput(
    `https://adventofcode.com/2021/day/${day}`,
    cookie,
    'pre:nth-of-type(1)'
  ).then((input) => {
    const answer = partTwo(input);
    expect(answer).toBe(168);
  }));
// <<< [ tests ] ----------------------------------------------------------- <<<
