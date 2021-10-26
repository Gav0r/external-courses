function analogMap(array, callback) {
  const arr = [];

  for (let i = 0; i < array.length; i += 1) {
    arr.push(callback(array[i], i, array));
  }

  return arr;
}

module.exports = analogMap;
