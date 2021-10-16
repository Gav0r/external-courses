function printArray(array) {
  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
  console.log(array.length);
}

module.exports = printArray;
