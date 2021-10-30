function deleteFirstAndLastSpace(str) {
  const arr = [];
  for (let i = 0; i < str.length; i += 1) {
    arr[i] = str[i];
  }
  if (arr[0] === ' ' && arr[str.length - 1] === ' ') {
    arr.splice(0, 1);
    arr.splice(-1, 1);
    const newArr = arr.join('');

    return newArr;
  }
  return undefined;
}

module.exports = deleteFirstAndLastSpace;
