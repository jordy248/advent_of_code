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

// >>> [ function to create "tree" ] >>>
const makeTree = (data) => {
  // const tree = {
  //   name: '/',
  //   children: [],
  // };
  const tree = {};
  const cwd = ['~'];

  data.forEach((l) => {
    const isCommand = l[0] === '$';

    if (isCommand) {
      const commandParts = l.split(' ');
      const command = commandParts[1];

      if (command === 'cd') {
        // navigate through dirs
        const arg = commandParts[2];
        if (arg === '..') {
          // return to parent dir
          cwd.pop();
        } else if (arg === '/') {
          // reset cwd to root dir
          cwd.splice(0, cwd.length, '~');
        } else {
          // move to child dir
          cwd.push(commandParts[2]);
        }
      }
    } else {
      // handle files
      const listParts = l.split(' ');
      if (listParts[0] !== 'dir') {
        // file - save file size in all dirs in cwd
        const fileSize = parseInt(listParts[0]);

        const tmpwd = [...cwd];

        while (tmpwd.length > 0) {
          // create full path for current dir
          const dirPath = tmpwd.join('/');
          // add current dir path to tree if it doesn't exist
          if (!Object.hasOwn(tree, dirPath)) {
            tree[dirPath] = 0;
          }
          // update current dir size
          tree[dirPath] += fileSize;

          // go up to next dir
          tmpwd.pop();
        }
      } else {
        // dir -- do nothing
      }
    }
  });

  return tree;
};
// <<< [ function to create "tree" ] <<<
// <<< [ UTILS ] ----------------------------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  const tree = makeTree(data);

  const threshold = 1e5;
  const keepDirsSizes = Object.values(tree).filter((size) => size <= threshold);
  const sumKeepDirsSizes = keepDirsSizes.reduce((a, b) => a + b, 0);

  return sumKeepDirsSizes;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  const tree = makeTree(data);

  const totalMemoryUsed = tree['~'];
  const totalMemoryAvailable = 70000000;
  const updateMemoryRequired = 30000000;

  const memoryToDelete =
    totalMemoryUsed + updateMemoryRequired - totalMemoryAvailable;

  const deleteDirCandidates = Object.values(tree).filter(
    (size) => size >= memoryToDelete
  );
  const deleteDir = Math.min(...deleteDirCandidates);

  return deleteDir;
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
