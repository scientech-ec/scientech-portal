export const getSafeNumber = (value: any): number => {
  return isNaN(value) ? 0 : value;
};

export const roundTo = (number: number, digits = 2) => {
  if (isNaN(number)) return 0;

  const base = 10 ** digits;
  return Math.round(number * base) / base;
};
