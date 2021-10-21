function upperCaseString(str) {
  str.toLowerCase();

  return str[0].toUpperCase() + str.slice(1);
}

module.exports = upperCaseString;
