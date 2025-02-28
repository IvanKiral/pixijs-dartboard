export const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const zipMultiple = <T>(...arrays: ReadonlyArray<ReadonlyArray<T>>) => {
  return Array.from(
    { length: Math.min(...arrays.map(arr => arr.length)) },
    (_, i) => arrays.map(arr => arr[i])
  );
};

export const zipMultipleWithPadding = <T>(
  ...arrays: ReadonlyArray<ReadonlyArray<T>>
) => {
  const maxLength = Math.max(...arrays.map(arr => arr.length));

  return Array.from({ length: maxLength }, (_, i) =>
    arrays.map(arr => arr[i] ?? null)
  );
};

export const cloneDeep = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value));
};
