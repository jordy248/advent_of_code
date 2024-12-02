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

// >>> [ UTILS ] ----------------------------------------------------------- >>>
// >>> [ function to parse input ] >>>
const parseInput = (input) => {
  const data = input.trim().split('\n');
  return data;
};
// <<< [ function to parse input ] <<<

// >>> [ function to get item's priority ] >>>
const getItemPriority = (item) => {
  if (typeof item === 'undefined' || item === null) return 0;

  const characterIsUpperCase = item === item.toUpperCase();

  const itemPriority = characterIsUpperCase
    ? item.charCodeAt(0) - 'A'.charCodeAt(0) + 27
    : item.charCodeAt(0) - 'a'.charCodeAt(0) + 1;

  return itemPriority;
};
// <<< [ function to get item's priority ] <<<

// >>> [ function to find common letters between two strings ] >>>
const getCommonLetters = (s1, s2) => {
  let commonLetters = s1.split('').filter((l) => s2.includes(l));

  // only keep uniques
  commonLetters = Array.from(new Set(commonLetters));

  return commonLetters;
};
// <<< [ function to find common letters between two strings ] <<<

// >>> [ function to find intersection between arbitrary num of strings ]  >>>
const getStringsIntersection = (...strings) => {
  const [stringsArr] = strings;

  // get all letters shared between all strings
  const allCommonLetters = stringsArr
    .reduce((acc, currString, i) => {
      if (!stringsArr[i + 1]) return acc;
      const nextString = stringsArr[i + 1];
      const currCommonLetters = getCommonLetters(currString, nextString);
      acc.push(currCommonLetters);
      return acc;
    }, [])
    .flat()
    .filter((l) => stringsArr.every((s) => s.includes(l)));

  const commonLetters = Array.from(new Set(allCommonLetters));

  return commonLetters;
};
// <<< [ function to find intersection between arbitrary num of strings ] <<<
// <<< [ UTILS ] ----------------------------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  // split rucksack contents in half
  const rucksacks = data.map((s) => [
    s.slice(0, s.length / 2),
    s.slice(s.length / 2, s.length),
  ]);

  // get items in both halves
  const commonItems = rucksacks.map((rucksack) =>
    getCommonLetters(rucksack[0], rucksack[1]).pop()
  );

  // get priority of common items
  const commonItemsPriority = commonItems.map((item) => getItemPriority(item));

  // sum priorities of common items
  const sumCommonItemsPriority = commonItemsPriority.reduce((a, b) => a + b, 0);

  return sumCommonItemsPriority;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  // separate input into groups of three rucksacks
  const groupSize = 3;
  const groupedData = data.reduce((acc, current, i) => {
    const iGroup = Math.floor(i / groupSize); // current group index
    if (!acc[iGroup]) acc[iGroup] = []; // init new group array if necessary
    acc[iGroup].push(current); // add current item to current group
    return acc;
  }, []);

  const groupBadges = groupedData.map((group) => {
    const badge = getStringsIntersection(group);
    return badge;
  });

  // get priority of each group's badge item
  const groupBadgePriorities = groupBadges.map((item) =>
    getItemPriority(item[0])
  );

  // sum priorities of common items
  const sumGroupBadgePriorities = groupBadgePriorities.reduce(
    (a, b) => a + b,
    0
  );

  return sumGroupBadgePriorities;
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
