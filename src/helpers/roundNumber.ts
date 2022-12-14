export const roundTo = (number: number, digits = 2) => {
  const base = 10 ** digits;
  return Math.round(number * base) / base;
};
