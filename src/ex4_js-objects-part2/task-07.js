function stringDescrimination(str, num) {
  if (str.length > num) {
    return `${str.substr(0, num - 1)}…`;
  }

  return num;
}

module.exports = stringDescrimination;
