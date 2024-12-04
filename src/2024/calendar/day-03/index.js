import * as path from 'path';
import CONSTANTS from '../../Components/Constants.js';
import { cookie } from '../../../utils/Cookie.js';
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

// >>> [ function to parse input ] ----------------------------------------- >>>
const parseInput = (input) => {
    const data = input.trim().split('\n');
    return data;
};
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ utils ] ----------------------------------------------------------- >>>
// <<< [ utils ] ----------------------------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
    const instructionRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    let instructions;
    let result = 0;
    while ((instructions = instructionRegex.exec(data)) !== null) {
        const prod = +instructions[1] * +instructions[2];
        result += prod;
    }
    return result;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
    const instructionRegex = /mul\((\d{1,3}),(\d{1,3})\)|don't|do/g;
    let isEnabled = 1;
    let instructions;
    let result = 0;
    while ((instructions = instructionRegex.exec(data)) !== null) {
        const match = instructions[0];
        if (match === 'don\'t') isEnabled = 0;
        if (match === 'do') isEnabled = 1;
        if (!['don\'t', 'do'].includes(match)) {
            const prod = +instructions[1] * +instructions[2] * isEnabled;
            result += prod;
        }
    }
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
