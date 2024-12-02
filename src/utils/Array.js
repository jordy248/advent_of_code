export function sumArray(a) {
  return a.reduce((x, y) => x + y, 0);
}

export function countOccurrences(arr, val) {
  return arr.filter((v) => v === val).length;
}