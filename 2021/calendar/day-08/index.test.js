import cookie from '../../../utils/getCookie.js';
import { getExample } from '../../../utils/getExample.js';
import { partOne, partTwo } from './index.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const day = '8';
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ tests ] ----------------------------------------------------------- >>>
test('partOne example', () =>
  getExample(
    `https://adventofcode.com/2021/day/${day}`,
    cookie,
    '.day-desc:nth-of-type(1) pre:nth-of-type(3)'
  ).then((input) => {
    const fixedInput = input.replaceAll(' |\n', ' | ');
    const answer = partOne(fixedInput);
    expect(answer).toBe(26);
  }));

test('partTwo example', () =>
  getExample(
    `https://adventofcode.com/2021/day/${day}`,
    cookie,
    // '.day-desc:nth-of-type(1) pre:nth-of-type(3)'
    '.day-desc:nth-of-type(2) pre:nth-of-type(1)'
  ).then((input) => {
    const fixedInput = input.replaceAll(' |\n', ' | ');
    const answer = partTwo(fixedInput);
    // expect(answer).toBe(61229);
    expect(answer).toBe(5353);
  }));
// <<< [ tests ] ----------------------------------------------------------- <<<
