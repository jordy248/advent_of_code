import CONSTANTS from '../../Components/Constants.js';
import cookie from '../../../utils/getCookie.js';
import { getExample } from '../../../utils/getExample.js';
import { tidyInput } from '../../../utils/getInput.js';
import { partOne, partTwo } from './index.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const DAY = '1';
const { YEAR } = CONSTANTS;
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ tests ] ----------------------------------------------------------- >>>
test('partOne example', () =>
  getExample(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'pre:nth-of-type(1)'
  ).then((input) => {
    const answer = partOne(input);
    expect(answer).toBe(24000);
  }));

test('partTwo example', () =>
  getExample(
    `https://adventofcode.com/${YEAR}/day/${DAY}`,
    cookie,
    'pre:nth-of-type(1)'
  ).then((input) => {
    const answer = partTwo(input);
    expect(answer).toBe(45000);
  }));
// <<< [ tests ] ----------------------------------------------------------- <<<
