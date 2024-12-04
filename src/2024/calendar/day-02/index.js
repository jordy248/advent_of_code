import * as path from 'path';
import CONSTANTS from '../../Components/Constants.js';
import { cookie } from '../../../utils/Cookie.js';
import { getInput } from '../../../utils/Input.js';
// import { getIsMonotonic } from '../../../utils/Array.js';

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
    const reports = data.map((report) => {
        const levels = report.split(/\s/).map((level) => +level);
        return levels;
    });
    return reports;
};
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ utils ] ----------------------------------------------------------- >>>
const getIsReportIncreasing = (report) => report.every((level, i) => i === 0 || level > report[i - 1]);
const getIsReportDecreasing = (report) => report.every((level, i) => i === 0 || level < report[i - 1]);
const getAdjacentDifferences = (report) => report.map((level, i) => i === 0 ? 0 : level - report[i - 1]);
const getIsEveryAdjacentDifferencesSafe = (adjacentDifferences) => adjacentDifferences.every((diff) => Math.abs(diff) <= 3);

const getIsReportSafe = (report) => {
    const isReportIncreasing = getIsReportIncreasing(report);
    const isReportDecreasing = getIsReportDecreasing(report);
    if (!isReportIncreasing && !isReportDecreasing) return 0;

    const reportAdjacentDifferences = getAdjacentDifferences(report);
    const isEveryAdjacentDifferencesSafe = getIsEveryAdjacentDifferencesSafe(reportAdjacentDifferences);

    if (isEveryAdjacentDifferencesSafe) return 1;
    return 0;
};
// <<< [ utils ] ----------------------------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
    const reportStatuses = data.map((report) => getIsReportSafe(report));
    const result = reportStatuses.reduce((a, b) => a + b, 0);
    return result;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
    const reportStatuses = data.map((report) => {
        const isReportSafe = getIsReportSafe(report);
        if (isReportSafe) return 1;

        for (let i = 0; i < report.length; i++) {
            const newReport = [
                ...report.slice(0, i),
                ...report.slice(i + 1)
            ];
            const isNewReportSafe = getIsReportSafe(newReport);
            if (isNewReportSafe) return 1;
        }

        return 0;
    });

    const result = reportStatuses.reduce((a, b) => a + b, 0);
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
