export const createNode = (type, label) => {
  const base = {
    id: crypto.randomUUID(),
    type,
    label,
  };

  if (type === "branch") {
    return {
      ...base,
      branches: {
        true: null,
        false: null,
      },
    };
  }

  if (type === "end") {
    return {
      ...base,
      children: [],
    };
  }

  return {
    ...base,
    children: [],
  };
};
