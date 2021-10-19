function Calculator() {
  let value = 0;

  return {

    add(incrementValue = 0) {
      if (typeof incrementValue !== 'number') throw new Error('add accepts only a number');
      value += incrementValue;
      return function innerAdd(subIncrementValue = 0) {
        if (typeof subIncrementValue !== 'number') throw new Error('add accepts only a number');
        value += subIncrementValue;
        return innerAdd;
      };
    },

    subtract(decrementValue = 0) {
      if (typeof decrementValue !== 'number') throw new Error('subtract accepts only a number');
      value -= decrementValue;
      return function innerSubstract(subDecrementValue = 0) {
        if (typeof subDecrementValue !== 'number') throw new Error('subtract accepts only a number');
        value -= subDecrementValue;

        return innerSubstract;
      };
    },

    divide(divideValue = 0) {
      if (typeof divideValue !== 'number') throw new Error('divide accepts only a number');
      if (divideValue !== 0) {
        value /= divideValue;
      }
      return function innerDivide(subDivideValue = 0) {
        if (typeof subDivideValue !== 'number') throw new Error('divide accepts only a number');
        value /= subDivideValue;
        return innerDivide;
      };
    },

    multiply(multiplyValue = 0) {
      if (typeof divideValue !== 'number') throw new Error('multiply accepts only a number');
      console.log('multiply call');
      if (multiplyValue !== 0) {
        value *= multiplyValue;
      }
      return function innerMultiply(subMultiplyValue = 0) {
        if (typeof subDivideValue !== 'number') throw new Error('multiply accepts only a number');
        value *= subMultiplyValue;
        return innerMultiply;
      };
    },
    getResult() {
      return value;
    },
    reset() {
      value = 0;
    },
  };
}

const calculator = Calculator();

module.exports = calculator;
