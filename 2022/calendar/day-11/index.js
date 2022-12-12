import * as path from 'path';

import { nextTick } from 'process';
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
  const data = input
    .trim()
    .split('\n\n')
    .map((monkey) => {
      const monkeyLines = monkey.split('\n');

      // get monkey number
      const monkeyNumber = +monkeyLines[0].match(/\d+/g);

      // get monkey starting items
      let monkeyItems = monkeyLines[1].split(':');
      monkeyItems =
        monkeyItems && monkeyItems.length > 0 && monkeyItems[1].trim();
      const monkeyItemsArr =
        monkeyItems !== ''
          ? monkeyItems.split(', ').map((item) => parseInt(item))
          : [];

      // get monkey operation
      let operation = monkeyLines[2].split('=');
      operation =
        operation &&
        operation.length > 0 &&
        operation[1].trim().split(/old\s/i);
      operation = operation && operation.length > 0 && operation[1].split(/\s/);
      const operationObj = {
        operator: operation[0],
        pred: operation[1],
      };

      // get monkey test
      const testPred = parseInt(monkeyLines[3].match(/\d+/g));

      // get monkey test outcomes
      const testTrueOutcome = monkeyLines[4].match(/\d+/g);
      const testFalseOutcome = monkeyLines[5].match(/\d+/g);
      const testOutcomes = {
        t: parseInt(testTrueOutcome),
        f: parseInt(testFalseOutcome),
      };

      return {
        monkey: monkeyNumber,
        items: monkeyItemsArr,
        operation: operationObj,
        testPred,
        testOutcomes,
      };
    });

  return data;
};
// <<< [ function to parse input ] <<<

// >>> [ function to get least common denominator ] ----------------------- >>>
const getLeastCommonMultiple = (arr, maxIts = 1e9) => {
  const max = Math.max(...arr);
  let currentNumber = max;
  let currentIt = 0;

  while (true && currentIt < maxIts) {
    // eslint-disable-next-line no-loop-func
    const isCommonMultiple = arr.every((n) => currentNumber % n === 0);
    if (isCommonMultiple) return currentNumber;
    currentNumber += 1;
    currentIt += 1;
  }
  return null;
};
// <<< [ function to get least common denominator ] ----------------------- <<<

// >>> [ function to apply operations to get new item priorities ] >>>
const inspectItem = (item, operation) => {
  let { operator, pred } = operation;
  pred = Number.isNaN(parseInt(pred)) ? parseInt(item) : parseInt(pred);
  const operations = {
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
  };
  if (!Object.hasOwn(operations, operator)) return null;

  return operations[operator].apply(null, [item, pred]);
};
// <<< [ function to apply operations to get new item priorities ] <<<

// >>> [ function to determine which monkeys to toss items to ] >>>
const monkeyTurn = (monkeyData, relief = true, LCM = null) => {
  const { monkey, items, operation, testPred, testOutcomes } = monkeyData;

  // inspect each item and divide by 3
  let newItems = items.map((item) => inspectItem(item, operation));

  if (relief) {
    // if using standard default reduction, divide by 3
    newItems = newItems.map((item) => Math.floor(item / 3));
  } else {
    // if not using default relief reduction, modulo by LCM of test values
    newItems = newItems.map((item) => item % LCM);
  }

  // evaluate new item priorities
  const itemEvaluations = newItems.map((item) => item % testPred === 0);

  // get monkey to receive each item
  const itemMonkeys = itemEvaluations.map((item) =>
    item ? testOutcomes.t : testOutcomes.f
  );

  const itemsToToss = newItems.map((item, i) => ({
    item,
    recipient: itemMonkeys[i],
  }));

  return itemsToToss;
};
// <<< [ function to determine which monkeys to toss items to ] <<<
// <<< [ UTILS ] ----------------------------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  // create deep clone of stacks data to avoid modifying original data
  const monkeyData = JSON.parse(JSON.stringify(data));

  // number of rounds
  let round = 20;
  const topN = 2;
  const useDefaultWorryReduction = true;

  // init object to keep track of how many times each monkey inspects an object
  const nMonkeys = data.length;
  const monkeyInspections = Array.from({ length: nMonkeys }, () => 0);

  // simulate rounds
  while (round > 0) {
    // simulate monkeys' turns for this round
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < monkeyData.length; i++) {
      const monkey = monkeyData[i];

      // increment monkeyInspections
      const monkeyItems = monkey.items;
      monkeyInspections[i] += monkeyItems.length;

      // inspect items
      const itemsToToss = monkeyTurn(monkey, useDefaultWorryReduction);

      itemsToToss.forEach((itemToToss) => {
        const { item, recipient } = itemToToss;
        monkeyData[recipient].items.push(item);
        monkey.items.pop();
      });
    }
    // decrement round
    round -= 1;
  }

  monkeyInspections.sort((a, b) => b - a);

  const topMonkeys = monkeyInspections.slice(0, topN);
  const topMonkeysInspectionsProd = topMonkeys.reduce((a, b) => a * b, 1);

  return topMonkeysInspectionsProd;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  // create deep clone of stacks data to avoid modifying original data
  const monkeyData = JSON.parse(JSON.stringify(data));

  // number of rounds
  let round = 10000;
  const topN = 2;
  // instead of default worry reduction, we can stop values from getting too
  // massive moduloing the post-inspection value by the least common multiple
  // of all monkey test numbers (rather than dividing by default of 3).
  const useDefaultWorryReduction = false;
  const allMonkeyTestPreds = monkeyData.map((m) => m.testPred);
  const leastCommonMultiple = getLeastCommonMultiple(allMonkeyTestPreds);

  // init object to keep track of how many times each monkey inspects an object
  const nMonkeys = data.length;
  const monkeyInspections = Array.from({ length: nMonkeys }, () => 0);

  // simulate rounds
  while (round > 0) {
    // simulate monkeys' turns for this round
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < monkeyData.length; i++) {
      const monkey = monkeyData[i];

      // increment monkeyInspections
      const monkeyItems = monkey.items;
      monkeyInspections[i] += monkeyItems.length;

      // inspect items
      const itemsToToss = monkeyTurn(
        monkey,
        useDefaultWorryReduction,
        leastCommonMultiple
      );

      itemsToToss.forEach((itemToToss) => {
        const { item, recipient } = itemToToss;
        monkeyData[recipient].items.push(item);
        monkey.items.pop();
      });
    }
    // decrement round
    round -= 1;
  }

  monkeyInspections.sort((a, b) => b - a);

  const topMonkeys = monkeyInspections.slice(0, topN);
  const topMonkeysInspectionsProd = topMonkeys.reduce((a, b) => a * b, 1);

  return topMonkeysInspectionsProd;
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
