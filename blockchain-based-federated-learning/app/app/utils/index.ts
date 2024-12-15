const getHarmonicMean = (arr: number[]): number => {
  const sum = arr.reduce((acc, val) => acc + 1 / val, 0);
  return arr.length / sum;
};

function formatAttributeName<T extends Object = Object>(attrs: T, prefix = "") {
  const attributes = (Object.keys(attrs) as Array<keyof typeof attrs>).reduce((acc, key) => {
    return Object.assign(acc, {
      [`${key === "id" || key === "_id" ? "" : prefix}${key as string}`]: attrs[key],
    });
  }, {}) as T;

  return attributes;
}

export { getHarmonicMean, formatAttributeName };
