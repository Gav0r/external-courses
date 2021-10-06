function isPrime(n) {
  if (n === 0 || n === 1) {
    return 'Не причисляется ни к простым, ни к составным числам';
  }
  if (n < 1 || n > 1000) {
    return 'Данные неверны';
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 2; i < n; ++i) {
    if (n % i === 0) {
      return `Число ${n} - составное число`;
    }
  }
  return `Число ${n} - простое число`;
}

module.exports = isPrime;
