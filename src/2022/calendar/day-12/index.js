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
// // >>> [ node class ] >>>
// class Node {
//   constructor(value) {
//     this.value = value;
//     this.children = [];
//   }

//   addChild(value) {
//     this.children.push(value);
//     return this;
//   }
// }
// // <<< [ node class ] <<<

// >>> [ function to parse input ] >>>
const parseInput = (input) => {
  const test = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

  const data = test
    .trim()
    .split('\n')
    .map((l) => l.split(''));

  return data;
};
// <<< [ function to parse input ] <<<

// >>> [ function to make graph ] >>>
const getGraph = (matrix) => {
  const m = matrix.length;
  const n = matrix[0].length;

  const rootNodeChar = 'S';
  const rootNodeHeight = 'a'.charCodeAt(0) - 'a'.charCodeAt(0);
  const exitNodeChar = 'E';
  const exitNodeHeight = 'z'.charCodeAt(0) - 'a'.charCodeAt(0);

  const nodes = matrix.map((row, rowIdx) => {
    const rowNodes = row.map((cell, colIdx) => {
      const coords = [rowIdx, colIdx];
      const id = coords.join(',');
      const isRootNode = cell === rootNodeChar;
      const isExitNode = cell === exitNodeChar;

      let height = null;
      height = isRootNode ? rootNodeHeight : height;
      height = isExitNode ? exitNodeHeight : height;
      height =
        height !== null ? height : cell.charCodeAt(0) - 'a'.charCodeAt(0);

      const node = {
        id,
        isRootNode,
        isExitNode,
        height,
        coords: [rowIdx, colIdx],
        x: colIdx,
        y: rowIdx,
        visited: false,
        distance: Infinity,
        neighbors: [
          // node left
          colIdx > 0 && {
            coords: [rowIdx, colIdx - 1],
            id: [rowIdx, colIdx - 1].join(','),
            height: row[colIdx - 1].charCodeAt(0) - 'a'.charCodeAt(0),
          },
          // node right
          colIdx < n - 1 && {
            coords: [rowIdx, colIdx + 1],
            id: [rowIdx, colIdx + 1].join(','),
            height: row[colIdx + 1].charCodeAt(0) - 'a'.charCodeAt(0),
          },
          // node above
          rowIdx > 0 && {
            coords: [rowIdx - 1, colIdx],
            id: [rowIdx - 1, colIdx].join(','),
            height:
              matrix[rowIdx - 1][colIdx].charCodeAt(0) - 'a'.charCodeAt(0),
          },
          // node below
          rowIdx < m - 1 && {
            coords: [rowIdx + 1, colIdx],
            id: [rowIdx + 1, colIdx].join(','),
            height:
              matrix[rowIdx + 1][colIdx].charCodeAt(0) - 'a'.charCodeAt(0),
          },
          // rowIdx < m - 1 ? matrix[rowIdx + 1][colIdx] : null,
        ]
          .flat()
          .filter((neighb) => !!neighb),
      };
      return node;
    });
    return rowNodes;
  });

  return nodes.flat();
};
// <<< [ function to make graph ] <<<
// <<< [ UTILS ] ----------------------------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  console.log('data', data);

  const heightOffset = 1;

  const g = getGraph(data);
  // console.log('g', g);

  const rootNode = g.find((n) => n.isRootNode);
  const exitNode = g.find((n) => n.isExitNode);
  // console.log('rootNode', rootNode);
  // console.log('exitNode', exitNode);

  function solve(n) {
    console.log('n', n);
    n.distance = 0;
    const queue = [n];
    const solution = Array(2).fill(-1);
    while (queue.length) {
      const node = queue.shift();
      console.log('node', node);
      for (const edge of node.neighbors) {
        if (!edge.visited && node.height - edge.height < 2) {
          const distance = node.distance + 1;
          if (edge.x === 0 && edge.y === rootNode.y && solution[0] === -1) {
            solution[0] = distance;
          } else if (edge.x === 0 && solution[1] === -1) {
            solution[1] = distance;
          }
          edge.visited = true;
          edge.distance = distance;
          queue.push(edge);
          if (solution.indexOf(-1) === -1) return solution;
        }
      }
    }
    return solution;
  }

  const test = solve(exitNode);
  console.log('test', test);

  return 'test';

  // // exit node height
  // const exitNodeHeight = exitNode.height;

  // // init array to store node values
  // const results = [];

  // // init queue and populate it with root node
  // const q = [rootNode];

  // // init array to store searched nodes
  // const searchedNodes = [];

  // while (q.length > 0) {
  //   // breadth-first-search = first-in-first-out
  //   const currNode = q.shift();

  //   searchedNodes.push(currNode.id);

  //   if (currNode.height === exitNodeHeight) {
  //     console.log('found exit');
  //     break;
  //   }

  //   if (currNode.neighbors) {
  //     currNode.neighbors.forEach((neighbor) => {
  //       if (neighbor.height - heightOffset <= currNode.height) {
  //         const neighborID = neighbor.id;
  //         if (!searchedNodes.includes(neighborID)) {
  //           const neighborNode = g.find((n) => n.id === neighborID);
  //           q.push(neighborNode);
  //           results.push(neighborID);
  //         } else {
  //           // console.log('did not add neighbor');
  //         }
  //       }
  //     });
  //   }
  //   // console.log('\n');
  // }

  // console.log('results', results);

  // return 'test';
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  console.log('data', 'data');
  return 'test';
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
