export const loadFromLocalStorage = (
  item: string,
  fallback = null
): typeof fallback => {
  const storedData = localStorage.getItem(item);
  if (
    storedData !== null &&
    storedData !== "undefined" &&
    storedData !== "null"
  ) {
    return JSON.parse(storedData);
  }

  return fallback;
};

export const getExpTime = () => {
  const storedValue = JSON.parse(localStorage.getItem("expTime") ?? "null");

  return typeof storedValue === "number" ? storedValue : null;
};
