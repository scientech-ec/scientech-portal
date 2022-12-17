export const loadFromLocalStorage = (
  item: string,
  fallback: any
): typeof fallback => {
  const storedData = localStorage.getItem(item);
  if (
    storedData !== null &&
    storedData !== "undefined" &&
    storedData !== "null"
  ) {
    return JSON.parse(storedData);
  }

  return fallback as typeof fallback;
};

export const getExpTime = () => {
  const storedValue = JSON.parse(localStorage.getItem("expTime") ?? "null");

  return typeof storedValue === "number" ? storedValue : null;
};

export const storeInLocalStorage = (reference: string, data: any) => {
  localStorage.setItem(reference, JSON.stringify(data));
};
