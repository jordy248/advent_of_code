import cookie from '../../../utils/Cookie.js';
import { getExampleInput } from '../../../utils/Example.js';
import { partOne, partTwo } from './index.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const day = '10';
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ tests ] ----------------------------------------------------------- >>>
test('partOne example', () =>
  getExampleInput(
    `https://adventofcode.com/2021/day/${day}`,
    cookie,
    '.day-desc:nth-of-type(1) pre:nth-of-type(2)'
  ).then((input) => {
    const answer = partOne(input);
    expect(answer).toBe(26397);
  }));

test('partTwo example', () =>
  getExampleInput(
    `https://adventofcode.com/2021/day/${day}`,
    cookie,
    '.day-desc:nth-of-type(1) pre:nth-of-type(2)'
  ).then((input) => {
    const answer = partTwo(input);
    expect(answer).toBe(288957);
  }));
// <<< [ tests ] ----------------------------------------------------------- <<<
