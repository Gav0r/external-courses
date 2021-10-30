function upperCaseEveryString(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((i) => i[0].toUpperCase() + i.substr(1))
    .join(' ');
}

module.exports = upperCaseEveryString;
