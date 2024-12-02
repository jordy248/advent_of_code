import * as path from 'path';
import CONSTANTS from '../../Components/Constants.js';
import { cookie } from '../../../utils/Cookie.js';
import { getInput } from '../../../utils/Input.js';
import { countOccurrences } from '../../../utils/Array.js';

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

// >>> [ function to parse input ] ----------------------------------------- >>>
const parseInput = (input) => {
    const data = input.trim().split('\n').map((line) => {
        const [listA, listB] = line.split(/\s+/);
        return {
            listA: +listA,
            listB: +listB,
        };
    });
    return data;
};
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
    const listA = data.map((list) => list.listA).sort((a, b) => a - b);
    const listB = data.map((list) => list.listB).sort((a, b) => a - b);
    const result = listA.reduce((acc, curr, i) => {
        const dist = Math.abs(curr - listB[i]);
        return acc + dist;
    }, 0);
    return result;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
    const listA = data.map((list) => list.listA);
    const listB = data.map((list) => list.listB);
    const result = listA.reduce((acc, curr, i) => {
        const occurrences = countOccurrences(listB, curr);
        return acc + curr * occurrences;
    }, 0);
    return result;
};
// <<< [ partTwo function ] <<<
// <<< [ answer functions ] ------------------------------------------------ <<<

// >>> [ main ] ------------------------------------------------------------ >>>
const getAnswers = async () => {
    try {
        const input = await getInput(`https://adventofcode.com/${YEAR}/day/${DAY}/input`, cookie);
        const data = parseInput(input);
        const partOneAnswer = partOne(data);
        const partTwoAnswer = partTwo(data);
        return Promise.all([partOneAnswer, partTwoAnswer]).then(([answerOne, answerTwo]) => {
            console.log(`Part One Answer: ${answerOne}`);
            console.log(`Part Two Answer: ${answerTwo}`);
        });
    }
    catch (error) {
        console.error(error);
    }
};
getAnswers();
// <<< [ main ] ------------------------------------------------------------ <<<
export { parseInput, partOne, partTwo };
