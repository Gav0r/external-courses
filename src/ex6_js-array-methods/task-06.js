function analogReduce(array, callback, initialValue) {
  const hasInitialValue = initialValue !== undefined;
  let previousValue = hasInitialValue ? initialValue : array[0];
  for (let i = 0; i < array.length; i += 1) {
    if (!hasInitialValue) {
      if (array[i + 1] !== undefined) {
        previousValue = callback(i === 0 ? array[i] : previousValue, array[i + 1], i, array);
      }
    } else {
      previousValue = callback(previousValue, array[i], i, array);
    }
  }
  return previousValue;
}

module.exports = analogReduce;
