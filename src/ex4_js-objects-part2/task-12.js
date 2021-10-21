function addNumbers(num1, num2) {
  const result = +num1 + +num2;

  return +result.toFixed(3);
}

module.exports = addNumbers;
