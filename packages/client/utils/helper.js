export const storageCheck = (key) =>
  typeof window !== "undefined" ? localStorage.getItem(key) : null;

  export const storageRemove = (key) =>
  typeof window !== "undefined" ? localStorage.removeItem(key) : null;

export const uuidv4 = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

const regexModify = (str) => new RegExp(`${str}.*\\b`, "gi");

export const filterList = (arr, params) => {
  const score = params?.priority?.score || false;
  const name = params?.name || false;
  return arr.filter(
    (obj) =>
      (obj.name.match(regexModify(name)) || name === false) &&
      (obj.priority.score === score || score === false)
  ).sort((a, b) => b.priority.score - a.priority.score);
};

export const todoFormSetter = (inputs, priorities, name, value) =>
  typeof inputs?.priority === "object" && name === "priority"
    ? {
        score: value,
        title: priorities.find((item) => item?.score === value)?.title,
      }
    : value;
