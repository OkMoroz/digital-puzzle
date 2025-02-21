export const mergeFragments = (chain) => {
  if (!chain.length) return "";

  let result = chain[0];

  for (let i = 1; i < chain.length; i++) {
    const current = chain[i];
    const previousEnd = result.slice(-2);

    if (current.startsWith(previousEnd)) {
      result += current.slice(2);
    }
  }

  return result;
};
