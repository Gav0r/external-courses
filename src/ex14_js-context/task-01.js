class Calculator {
  #value;

  constructor() {
    this.#value = 0;
  }

  add(incrementValue) {
    if (incrementValue !== undefined) {
      this.#value += +incrementValue;
    }
    return this;
  }

  subtract(decrementValue) {
    if (decrementValue !== undefined) {
      this.#value -= +decrementValue;
    }
    return this;
  }

  divide(divideValue) {
    if (divideValue !== undefined) {
      this.#value /= +divideValue;
    }

    return this;
  }

  multiply(multiplyValue) {
    if (multiplyValue !== undefined) {
      this.#value *= +multiplyValue;
    }

    return this;
  }

  setState(newValue) {
    if (newValue !== undefined) {
      this.#value = +newValue;
    }

    return this;
  }

  fetchData(cb) {
    this.#value = 500;

    return setTimeout(() => cb(this.#value), 500);
  }

  reset() {
    this.#value = 0;

    return this;
  }

  getResult() {
    return this.#value;
  }
}

const calculator = new Calculator();

module.exports = calculator;
