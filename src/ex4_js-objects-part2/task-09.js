function insertWord(str, word) {
  const newStr = str.split(' ');
  newStr.splice(2, 0, word);

  return newStr.join(' ');
}

module.exports = insertWord;
