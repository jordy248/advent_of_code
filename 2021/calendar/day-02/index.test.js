import cookie from '../../../utils/getCookie.js';
import { getExample } from '../../../utils/getExample.js';
import { tidyInput } from '../../../utils/getInput.js';
import {partOne, partTwo} from './index.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const day = '2';
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ tests ] ----------------------------------------------------------- >>>
test('partOne example', () =>
  getExample(
    `https://adventofcode.com/2021/day/${day}`,
    cookie,
    'pre:nth-of-type(1)'
  ).then((input) => {
    const answer = partOne(input);
    expect(answer).toBe(150);
  }));

test('partTwo example', () =>
  getExample(
    `https://adventofcode.com/2021/day/${day}`,
    cookie,
    'pre:nth-of-type(1)'
  ).then((input) => {
    const answer = partTwo(input);
    expect(answer).toBe(900);
  }));
// <<< [ tests ] ----------------------------------------------------------- <<<
