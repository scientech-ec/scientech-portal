export const toLocalDateAndTime = (dateNumber: number) => {
  const date = new Date(dateNumber);
  return date.toLocaleTimeString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
};
