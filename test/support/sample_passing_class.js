// This is an example of a string helper module

class Arithmatic {
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
    return a + b;
  }

  /**
   * @example
   * subtract(10, 2)
   * //=> 8
   */
  subtract(a, b) {
    return a - b;
  }
}

export { Arithmatic };
