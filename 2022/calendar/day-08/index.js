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
  const data = input
    .trim()
    .split('\n')
    .map((row) => row.split('').map((number) => parseInt(number)));

  return data;
};
// <<< [ function to parse input ] <<<

// >>> [ function to get grid dimensions ] >>>
const getShape = (matrix) => {
  const m = matrix[0].length;
  const n = matrix.length;

  return [m, n];
};
// <<< [ function to get grid dimensions ] <<<

// >>> [ function to get tree data ] >>>
const getTreeData = (data) => {
  // get data shape
  const [m, n] = getShape(data);

  // for every tree, save its height, coords, and other trees in each direction
  const trees = data
    .map((row, rowIdx) => {
      const rowTrees = row.map((tree, colIdx) => {
        const thisTree = {
          height: tree,
          coords: [rowIdx, colIdx],
          // get trees (moving outwards from tree)
          otherTrees: {
            left: row.slice(0, colIdx).reverse(),
            right: row.slice(colIdx + 1, m),
            above: data
              .filter((_, i) => i < rowIdx)
              .map((aRow) => aRow[colIdx])
              .reverse(),
            below: data
              .filter((_, i) => i > rowIdx)
              .map((bRow) => bRow[colIdx]),
          },
        };
        return thisTree;
      });
      return rowTrees;
    })
    .flat();

  return trees;
};
// <<< [ function to get tree data ] <<<
// <<< [ UTILS ] ----------------------------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  const trees = getTreeData(data);

  // find the number of trees that are visible
  // a tree is visible from a direction if all other trees' heights in that
  // direction are less than that tree's height.
  const visibleTrees = trees.map((tree) => {
    const { otherTrees } = tree;
    const visible = Object.entries(otherTrees).some((ent) => {
      const [dir, dirTrees] = ent;
      const visibleInDir = dirTrees.every((dt) => dt < tree.height);
      return visibleInDir;
    });
    return visible;
  });
  const nVisibleTrees = visibleTrees.reduce((a, b) => a + b, 0);
  return nVisibleTrees;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  const trees = getTreeData(data);

  // get the visibility score of each tree
  // the visibility score is the product of direction visibility scores.
  // the direction visibliity scores is the  number of trees in each direction
  // with heights that are less than the current tree height.
  const treeVisibilityScores = trees.map((tree) => {
    const { otherTrees } = tree;
    const dirVisibilityScores = Object.entries(otherTrees).map((ent) => {
      const [dir, dirTrees] = ent;
      const dirVisibilityScore =
        dirTrees.findIndex((p) => p >= tree.height) + 1 || dirTrees.length;
      return dirVisibilityScore;
    });
    const visibliityScore = dirVisibilityScores.reduce((a, b) => a * b, 1);
    return visibliityScore;
  });

  treeVisibilityScores.sort((a, b) => b - a);
  return treeVisibilityScores[0];
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
