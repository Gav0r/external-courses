class Hangman {
  #word

  #guessedLetters

  #counter

  #wrongLetters

  constructor(word) {
    this.#counter = 6;
    this.#word = word;
    this.#guessedLetters = new Array(word.length).fill('').join('_');
    this.#wrongLetters = [];
  }

  guess(letter) {
    if (typeof letter === 'string' && letter.length === 1) {
      if (this.#word.includes(letter)) {
        const letterArr = this.#guessedLetters.split('');
        const indices = [];

        for (let i = 0; i < this.#word.length; i += 1) {
          if (this.#word[i] === letter) indices.push(i);
        }

        for (let i = 0; i < indices.length; i += 1) {
          letterArr[indices[i]] = letter;
        }

        this.#guessedLetters = letterArr.join('');
      } else {
        this.#counter -= 1;

        this.#wrongLetters.push(letter);

        return `wrong letter, errros left ${this.#counter} | ${this.#wrongLetters.join()}`;
      }
    }

    return this;
  }

  getGuessedString() {
    return this.#guessedLetters;
  }

  getErrorsLeft() {
    return this.#counter;
  }

  getWrongSymbols() {
    return this.#wrongLetters;
  }

  getStatus() {
    return `${this.#guessedLetters} | errors left ${this.#counter}`;
  }

  startAgain(newWord) {
    this.#word = newWord;
    this.#counter = 6;
    this.#guessedLetters = new Array(newWord.length + 1).fill('').join('_');
    this.#wrongLetters = [];
  }
}

const hangman = new Hangman('');

module.exports = hangman;
