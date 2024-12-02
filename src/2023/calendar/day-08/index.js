import * as path from 'path';

import CONSTANTS from '../../Components/Constants.js';
import { Cookie, Input, Utils } from '../../../utils/index.js';

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

// >>> [ utils ] ----------------------------------------------------------- >>>
function traverseNodes(directionsArr, nodesObj, ghostMode = false) {
  if (ghostMode) {
    let steps = 0; // eslint-disable-line no-shadow

    const ghostPaths = Object.entries(nodesObj)
      .filter(([name]) => name.endsWith('A'))
      .map(([name, value]) => ({ name, nodes: value, zCycle: 0 }));

    while (ghostPaths.some(({ zCycle }) => zCycle === 0)) {
      const dir = directionsArr[steps % directionsArr.length];
      steps += 1;

      for (const ghostPath of ghostPaths) {
        ghostPath.name = ghostPath.nodes[dir];
        ghostPath.nodes = nodesObj[ghostPath.nodes[dir]];

        if (ghostPath.name.endsWith('Z') && ghostPath.zCycle === 0) {
          ghostPath.zCycle = steps;
        }
      }
    }

    // eslint-disable-next-line no-undef
    const zCycleLeastCommonMultiple = BigInt(
      ghostPaths
        .slice(1)
        .reduce(
          (acc, v) => Utils.leastCommonMultiple(acc, v.zCycle),
          ghostPaths[0].zCycle
        )
    );

    return zCycleLeastCommonMultiple;
  }

  let steps = 0;
  let pos = 'AAA';
  const dest = 'ZZZ';

  while (pos !== dest) {
    const dir = directionsArr[steps % directionsArr.length];
    pos = nodesObj[pos][dir];
    steps += 1;
  }

  return steps;
}
// <<< [ utils ] ----------------------------------------------------------- <<<

// >>> [ function to parse input ] ----------------------------------------- >>>
function parseInput(input) {
  const [directionsStr, nodesStr] = input.trim().split(/\n\n/);

  const directionsArr = directionsStr.trim().split('');

  const nodesArr = nodesStr
    .trim()
    .split(/\n/)
    .map((node) => {
      const [name, tree] = node.split(' = ');
      const [L, R] = tree.replaceAll(/\(|\)/gi, '').split(', ');

      return [name, { L, R }];
    });
  const nodesObj = Object.fromEntries(nodesArr);

  return {
    directionsArr,
    nodesObj,
  };
}
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  const steps = traverseNodes(data.directionsArr, data.nodesObj, false);
  const result = steps;
  return result;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  const ghostSteps = traverseNodes(data.directionsArr, data.nodesObj, true);
  const result = parseInt(ghostSteps);
  return result;
};
// <<< [ partTwo function ] <<<
// <<< [ answer functions ] ------------------------------------------------ <<<

// >>> [ main ] ------------------------------------------------------------ >>>
const getAnswers = async () => {
  try {
    const input = await Input.getInput(
      `https://adventofcode.com/${YEAR}/day/${DAY}/input`,
      Cookie.cookie
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
