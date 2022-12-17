export const loadFromLocalStorage = (key: string) => {
  const storedData = localStorage.getItem(key);
  if (
    storedData !== null &&
    storedData !== "undefined" &&
    storedData !== "null"
  ) {
    return JSON.parse(storedData);
  }

  return null;
};

export const getExpTime = () => {
  const storedValue = JSON.parse(localStorage.getItem("expTime") ?? "null");

  return typeof storedValue === "number" ? storedValue : null;
};

export const storeInLocalStorage = (reference: string, data: any) => {
  localStorage.setItem(reference, JSON.stringify(data));
};
