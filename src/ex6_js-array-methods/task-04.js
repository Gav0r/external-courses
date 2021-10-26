function analogFilter(array, callback) {
  const arr = [];

  for (let i = 0; i < array.length; i += 1) {
    if (callback(array[i], i, array)) arr.push(array[i]);
  }

  return arr;
}

module.exports = analogFilter;
