function findOneString(str, searchingStr) {
  const value = str.includes(searchingStr);

  if (value) {
    return true;
  }

  return false;
}

module.exports = findOneString;
