import * as path from 'path';

import structuredClone from '@ungap/structured-clone';

import CONSTANTS from '../../Components/Constants.js';
import { Cookie, Example, Input, Matrix, Utils } from '../../../utils/index.js';

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
function parseMap(map) {
  const mapRanges = map.split('\n');
  const mapNameRE = /\w+-\w+-\w+/i;
  let mapName = mapRanges.shift();
  mapName = mapNameRE.test(mapName) && mapName.match(mapNameRE)[0];

  const ranges = mapRanges.map((range) => {
    const [destinationStart, sourceStart, rangeLength] = range.split(/\s/);
    return {
      destinationStart: parseInt(destinationStart),
      sourceStart: parseInt(sourceStart),
      rangeLength: parseInt(rangeLength),
    };
  });

  return {
    name: mapName,
    ranges,
  };
}

function isSeedInAlmanacSeedRanges(seed, almanacSeedRanges) {
  const seedIsinAlmanac = almanacSeedRanges.some(
    ([seedStart, rangeLength]) =>
      seedStart <= seed && seedStart + rangeLength >= seed
  );
  return seedIsinAlmanac;
}

function reverseAlmanacMaps(maps) {
  const mapsCopy = structuredClone(maps);
  return mapsCopy.reverse();
}

function traverseMaps(number, maps, direction = 'forward') {
  let currNumber = number;

  if (direction.toLowerCase() === 'forwards') {
    // traverse maps forwards from seeds to locations
    for (const map of maps) {
      const { ranges } = map;
      for (const range of ranges) {
        const { destinationStart, sourceStart, rangeLength } = range;
        if (
          sourceStart + rangeLength > currNumber &&
          sourceStart <= currNumber
        ) {
          currNumber = destinationStart + currNumber - sourceStart;
          break;
        }
      }
    }
    return currNumber;
  }
  if (direction.toLowerCase() === 'backwards') {
    // traverse maps backwards from locations to seeds
    const mapsReversed = reverseAlmanacMaps(maps);

    for (const map of mapsReversed) {
      const { ranges } = map;
      for (const range of ranges) {
        const { destinationStart, sourceStart, rangeLength } = range;
        if (
          destinationStart <= currNumber &&
          destinationStart + rangeLength > currNumber
        ) {
          currNumber = sourceStart + currNumber - destinationStart;
          break;
        }
      }
    }

    return currNumber;
  }
}
// <<< [ utils ] ----------------------------------------------------------- <<<

// >>> [ function to parse input ] ----------------------------------------- >>>
function parseInput(input) {
  const data = input
    .trim()
    .split('\n\n')
    .filter((x) => x !== '\n');

  const seeds = data
    .shift()
    .split(/\s/)
    .map((seed) => parseInt(seed))
    .filter((seed) => !Number.isNaN(seed));

  const maps = data.map((map) => parseMap(map));

  return {
    seeds,
    maps,
  };
}
// <<< [ function to parse input ] ----------------------------------------- <<<

// >>> [ answer functions ] ------------------------------------------------ >>>
// >>> [ partOne function ] >>>
const partOne = (data) => {
  const seedLocs = data.seeds.map((seed) =>
    traverseMaps(seed, data.maps, 'forwards')
  );
  const result = Math.min(...seedLocs);
  return result;
};
// <<< [ partOne function ] <<<

// >>> [ partTwo function ] >>>
const partTwo = (data) => {
  const almanacSeedRanges = data.seeds
    .map((seed, i) => {
      if (i % 2 === 0) {
        const seedInterval = [seed, data.seeds[i + 1]];
        return seedInterval;
      }
      return null;
    })
    .filter((range) => !!range);

  let result;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 1_000_000_000; i++) {
    const seed = traverseMaps(i, data.maps, 'backwards');
    const seedIsInAlmanacSeedRanges = isSeedInAlmanacSeedRanges(
      seed,
      almanacSeedRanges
    );

    if (seedIsInAlmanacSeedRanges) {
      result = i;
      break;
    }
  }
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
