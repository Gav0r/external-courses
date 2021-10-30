function lowerCamelCaseWithSpaces(str) {
  const newStr = str
    .toLowerCase()
    .split(' ')
    .map((i) => i[0].toUpperCase() + i.slice(1))
    .join('');

  return newStr[0].toLowerCase() + newStr.slice(1);
}

module.exports = lowerCamelCaseWithSpaces;
