/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
// This is an example of a string helper module

class Arithmetic {
  constructor() {}

  /**
   * @example
   * add(1, 2)
   * //=> 3
   * @example
   * add(1, 9)
   * //=> 10
   */
  add(a, b) {
    return a + b
  }

  /**
   * @example
   * subtract(10, 2)
   * //=> 8
   */
  subtract(a, b) {
    return a - b
  }
}

export { Arithmetic }
