import cookie from '../../../utils/Cookie.js';
import { getExample } from '../../../utils/Example.js';
import { partOne, partTwo } from './index.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const day = '9';
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ tests ] ----------------------------------------------------------- >>>
test('partOne example', () =>
  getExample(
    `https://adventofcode.com/2021/day/${day}`,
    cookie,
    '.day-desc:nth-of-type(1) pre:nth-of-type(1)'
  ).then((input) => {
    const answer = partOne(input);
    expect(answer).toBe(15);
  }));

test('partTwo example', () =>
  getExample(
    `https://adventofcode.com/2021/day/${day}`,
    cookie,
    '.day-desc:nth-of-type(1) pre:nth-of-type(1)'
  ).then((input) => {
    const answer = partTwo(input);
    expect(answer).toBe(1134);
  }));
// <<< [ tests ] ----------------------------------------------------------- <<<
