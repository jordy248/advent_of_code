import cookie from '../../../utils/getCookie.js';
import { getInput } from '../../../utils/getInput.js';

// >>> [ configs ] --------------------------------------------------------- >>>
const day = '4';
// <<< [ configs ] --------------------------------------------------------- <<<

// >>> [ helper functions ] ------------------------------------------------ >>>
const parseInput = (input, type = 'matrix') => {
  // remove trailing newline
  const tidiedInput = input.replace(/\n$/g, '');

  // >>> [ get numbers ] >>>
  const numbersArr = tidiedInput
    .split('\n\n')[0]
    .split(',')
    .map((n) => Number(n));
  // <<< [ get numbers ] <<<

  // >>> [ get boards ] >>>
  const boardsStr = tidiedInput.split('\n\n').slice(1);
  const boardsArr = boardsStr.map((board) =>
    board
      // Split each board into lines
      .split('\n')
      // Strip blank lines (handles trailing newline in file)
      .filter((l) => l.length > 0)
      // Read all the numbers and parse them into cells
      .map((row) =>
        type === 'dict'
          ? Array.from(row.matchAll(/\d+/g)).map((cell) => ({
              number: parseInt(cell[0]),
              called: false,
            }))
          : Array.from(row.matchAll(/\d+/g)).map((cell) => parseInt(cell[0]))
      )
  );
  // <<< [ get boards ] <<<

  return [numbersArr, boardsArr];
};

// function to update boards for cells matching number
// for dict type, update `called` property to true
// for matrix type, update matching cell to -1
const updateBoard = (number, board, type = 'matrix') => {
  if (type === 'matrix') {
    const newBoard = board.map((row) =>
      row.map((cell) => {
        if (cell === number) {
          return -1;
        }
        return cell;
      })
    );
    return newBoard;
  }
  if (type === 'dict') {
    const newBoard = board.map((row) =>
      row.map((cell) => {
        if (cell.number === number) {
          cell.called = true;
        }
        return cell;
      })
    );
    return newBoard;
  }
  return null;
};

// function to check a board to see if it's a winner
// for dict type, check if all cells in a row or column have property `called` === true
// for matrix type, check if all cells in a row or column are -1
const checkBoard = (board, type = 'matrix', nrow = 5, ncol = 5) => {
  if (type === 'matrix') {
    // >>> [ check rows ] >>>
    for (const row of board) {
      // method one: array.every()
      const rowWin = row.every((cell) => cell === -1);
      if (rowWin) {
        return true;
      }
      // method two: array.reduce()
      // const rowSum = row.reduce((a, b) => a + b, 0);
    }
    // <<< [ check rows ] <<<
    // >>> [ check cols ] >>>
    // loop through each column, create col array, and check that col array
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ncol; i++) {
      const col = board.map((row) => row[i]);

      // method one: array.every()
      const colWin = col.every((cell) => cell === -1);
      if (colWin) {
        return true;
      }
      // method two: array.reduce()
      // const colSum = col.reduce((a, b) => a + b, 0);
    }
    // <<< [ check cols ] <<<
  } else if (type === 'dict') {
    // >>> [ check rows ] >>>
    for (const row of board) {
      // method one: array.every()
      const rowWin = row.every((cell) => cell.called === true);
      if (rowWin) {
        return true;
      }
      // method two: array.reduce()
      // const rowSum = row.reduce((a, b) => a + b, 0);
    }
    // <<< [ check rows ] <<<

    // >>> [ check cols ] >>>
    // loop through each column, create col array, and check that col array
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ncol; i++) {
      const col = board.map((row) => row[i]);

      // method one: array.every()
      const colWin = col.every((cell) => cell.called === true);
      if (colWin) {
        return true;
      }
      // method two: array.reduce()
      // const colSum = col.reduce((a, b) => a + b, 0);
    }
    // <<< [ check cols ] <<<
  }
  return false;
};

// function to sum all values in board other than marked cells (indicated by -1)
const sumBoard = (board, type = 'matrix') => {
  let sum = 0;

  if (type === 'matrix') {
    sum = board
      .map((row) =>
        row.filter((cell) => cell !== -1).reduce((a, b) => a + b, 0)
      )
      .reduce((a, b) => a + b, 0);
  } else if (type === 'dict') {
    sum = board
      .map((row) =>
        row
          .filter((cell) => cell.called !== true)
          .map((c) => c.number)
          .reduce((a, b) => a + b, 0)
      )
      .reduce((a, b) => a + b, 0);
  }

  return sum;
};

// <<< [ helper functions ] ------------------------------------------------ <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// function to accept input and output part one answer
const partOne = (input) => {
  // set type
  const type = 'dict';

  // parse data
  const [numbersArr, boardsArr] = parseInput(input, type);

  // get number of boards
  const nBoards = boardsArr.length;

  // get board dimensions
  const nBoardRows = boardsArr[0].length;
  const nBoardCols = boardsArr[0][0].length;

  // init array to keep track of winning boards
  const winningBoards = Array(nBoards).fill(false);
  // init variable to save winning board
  let winningBoard = null;
  // init variable to save winning number
  let winningNumber = null;

  // init updatedBoardsArr to keep track of updating boards
  let updatedBoardsArr = boardsArr.slice();

  // use for loop to be able to break out of iteration
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numbersArr.length; i++) {
    const number = numbersArr[i];
    // update boards for called number
    updatedBoardsArr = updatedBoardsArr.map((board) =>
      updateBoard(number, board, type)
    );
    // check if any boards are winners
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < nBoards; j++) {
      const board = updatedBoardsArr[j];
      const boardWin = checkBoard(board, type, nBoardRows, nBoardCols);
      if (boardWin) {
        // update winningBoards Arr
        winningBoards[j] = true;
        // save winning board
        winningBoard = board;
        // save winning number
        winningNumber = number;
        break;
      }
    }
    // if any boards are winners, break out of loop
    if (winningBoards.includes(true)) {
      break;
    }
  }

  console.log('test');
  console.log(winningBoard);

  // get winning board sum
  const winningBoardSum = sumBoard(winningBoard, type);

  // get answer: (winningNumber * winningBoardSum)
  const answer = winningNumber * winningBoardSum;
  return answer;
};

// function to accept input and output part two answer
const partTwo = (input) => {
  // set type
  const type = 'matrix';

  // parse data
  const [numbersArr, boardsArr] = parseInput(input, type);

  // get number of boards
  const nBoards = boardsArr.length;

  // get board dimensions
  const nBoardRows = boardsArr[0].length;
  const nBoardCols = boardsArr[0][0].length;

  // init array to keep track of winning boards
  const winningBoards = Array(nBoards).fill(false);
  // init variable to save winning board
  let winningBoard = null;
  // init variable to save winning number
  let winningNumber = null;
  // init variable to save number of winning boards
  let nWinningBoards = 0;

  // init updatedBoardsArr to keep track of updating boards
  let updatedBoardsArr = boardsArr.slice();

  // use for loop to be able to break out of iteration
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numbersArr.length; i++) {
    const number = numbersArr[i];
    // update boards for called number
    updatedBoardsArr = updatedBoardsArr.map((board) =>
      updateBoard(number, board, type)
    );
    // check if any boards are winners
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < nBoards; j++) {
      const board = updatedBoardsArr[j];
      const boardWin = checkBoard(board, type, nBoardRows, nBoardCols);
      if (boardWin) {
        // update winningBoards Arr
        winningBoards[j] = true;

        // get number of winning boards
        nWinningBoards = winningBoards
          .map((el) => (el ? 1 : 0))
          .reduce((a, b) => a + b, 0);

        if (nWinningBoards === nBoards) {
          // save winning board
          winningBoard = board;
          // save winning number
          winningNumber = number;
          break;
        }
      }
    }
    // if any boards are winners, break out of loop
    nWinningBoards = winningBoards
      .map((el) => (el ? 1 : 0))
      .reduce((a, b) => a + b, 0);
    if (nWinningBoards === nBoards) {
      break;
    }
  }

  // get winning board sum
  const winningBoardSum = sumBoard(winningBoard);

  // get answer: (winningNumber * winningBoardSum)
  const answer = winningNumber * winningBoardSum;
  return answer;
};
// <<< [ answer functions ] ------------------------------------------------ <<<

// >>> [ main ] ------------------------------------------------------------ >>>
const getAnswers = () => {
  // get part one answer
  const partOneAnswer = getInput(
    `https://adventofcode.com/2021/day/${day}/input`,
    cookie
  )
    .then((input) => {
      const answer = partOne(input);
      return answer;
    })
    .catch((err) => console.log(err));

  // get part two answer
  const partTwoAnswer = getInput(
    `https://adventofcode.com/2021/day/${day}/input`,
    cookie
  )
    .then((input) => {
      const answer = partTwo(input);
      return answer;
    })
    .catch((err) => console.log(err));

  return Promise.all([partOneAnswer, partTwoAnswer]).then(
    ([answerOne, answerTwo]) => {
      console.log(`Part One Answer: ${answerOne}`);
      console.log(`Part Two Answer: ${answerTwo}`);
    }
  );
};

getAnswers();
// <<< [ main ] ------------------------------------------------------------ <<<

// >>> [ exports ] --------------------------------------------------------- >>>
// module.exports = { partOne, partTwo };
// <<< [ exports ] --------------------------------------------------------- <<<
