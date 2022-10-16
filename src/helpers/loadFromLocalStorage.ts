export const loadFromLocalStorage = (
  item: string,
  fallback: any
): typeof fallback => {
  const storedData = localStorage.getItem(item);
  if (storedData !== null) {
    return JSON.parse(storedData);
  }

  return fallback;
};
