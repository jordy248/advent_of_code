// >>> [ object utils ] ==================================================== >>>
export function hasProp(obj, prop) {
  if (obj === null || prop === null) return false;
  return Object.hasOwn(obj, prop);
}
// <<< [ object utils ] ==================================================== <<<

// >>> [ string utils ] ==================================================== >>>
export function isItDigit(s) {
  return !Number.isNaN(+s);
}

export function countChars(s) {
  const chars = {};
  s.split('').forEach((char) => {
    chars[char] = chars[char] + 1 || 1;
  });
  return chars;
}
// <<< [ string utils ] ==================================================== <<<

// >>> [ math utils ] ====================================================== >>>
export function greatestCommonDenominator(a, b) {
  if (!b) return Math.abs(a);
  return greatestCommonDenominator(b, a % b);
}

export function leastCommonMultiple(a, b) {
  const gcd = greatestCommonDenominator(a, b);
  return (a * b) / gcd;
}
// <<< [ math utils ] ====================================================== <<<

// >>> [ array utils ] ===================================================== >>>
export function sortDescending(a) {
  return [...a].sort((x, y) => y - x);
}

export function sortAscending(a) {
  return [...a].sort((x, y) => x - y);
}

export function sumArray(a) {
  return a.reduce((x, y) => x + y, 0);
}

export function prodArray(a) {
  return a.reduce((x, y) => x * y, 1);
}

export function count(a, test = Boolean) {
  let testFn;

  if (typeof test === 'function') {
    testFn = test;
  } else {
    testFn = function (x) {
      return x === test;
    };
  }

  return a.filter(testFn).length;
}
// <<< [ array utils ] ===================================================== <<<
