export const toLocalDateAndTime = (dateData: number) => {
  const date = new Date(dateData);
  return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
};
