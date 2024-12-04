export function sumArray(a) {
  return a.reduce((x, y) => x + y, 0);
}

export function countOccurrences(arr, val) {
  return arr.filter((v) => v === val).length;
}

export function getIsMonotonic(arr, type='either') {
  const allowedTypes = ['increase', 'decrease', 'either'];
  if (!allowedTypes.includes(type.toLowerCase())) return;

  if (arr.some((val) => typeof val !== 'number')) {
    throw new Error('array must consist of numbers');
  }

  if (type.toLowerCase() === 'increase') {
    const isMonotonicallyIncreasing = arr.every((val, i) => i === 0 || val > arr[i - 1]);
    return isMonotonicallyIncreasing;
  } else if (type.toLowerCase() === 'decrease') {
    const isMonotonicallyDecreasing = arr.every((val, i) => i === 0 || val < arr[i - 1]);
    return isMonotonicallyDecreasing;
  } else {
    const isMonotonicallyIncreasing = arr.every((val, i) => i === 0 || val > arr[i - 1]);
    const isMonotonicallyDecreasing = arr.every((val, i) => i === 0 || val < arr[i - 1]);
    const isMonotonicallyChanging = isMonotonicallyIncreasing || isMonotonicallyDecreasing;
    return isMonotonicallyChanging;
  }
}