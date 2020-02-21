# doctest-js

Let your documentation be your testing suite. Write [JSDoc](http://usejsdoc.org/about-getting-started.html) style doc examples on all your functions and then test them using `doctest-js`.

**Contents**

* [Usage](#usage)
  * [1. Install](#1-install)
  * [2. Write @example comments](#2-write-example-comments)
  * [3. Run the tests](#3-run-the-tests)
* [FAQ's](#faqs)
  * [Do I have to write @param, @returns etc?](#do-i-have-to-write-param-returns-etc)
  * [How do I specify the return value of the test?](#how-do-i-specify-the-return-value-of-the-test)
  * [Can I have more than one test per function?](#can-i-have-more-than-one-test-per-function)
  * [I have a long return value. Does it have to go on one line?](#i-have-a-long-return-value-does-it-have-to-go-on-one-line)
  * [Does this work for classes and private functions?](#does-this-work-for-classes-and-private-functions)
* [Credits](#credits)

## Usage

### 1. Install

```sh
npm install @supabase/doctest-js
```

### 2. Write @example comments

Create a [JSDoc style comment](http://usejsdoc.org/about-getting-started.html) on any functions that you want tested.

```javascript
/**
 * Returns the sum of 2 numbers
 *
 * @example
 * sum(1, 2)
 * //=> 3
 *
 * @example
 * sum(3, 4)
 * //=> 7
 */
export function sum(a, b) {
  return a + b;
}
```

### 3. Run the tests

Import the doctest function in your test suite and point it at the file.

```javascript
import doctests from '@supabase/doctest-js';

describe('Doctests', () => {
  // file paths are relative to root of directory
  doctest('src/sum.js');
  doctest('src/someOtherFile.js');
});
```

## FAQ's

### Do I have to write @param, @returns etc?

The only [JSDoc](http://usejsdoc.org/about-getting-started.html) component you need is the `@example`.

### How do I specify the return value of the test?

The tests will look for any value after the `//=>` symbol

### Can I have more than one test per function?

Yes. You can have as many `@examples` as you'd like for any one function.

### I have a long return value. Does it have to go on one line?

No. Example function calls and return values can span multiple lines.

### Does this work for classes and private functions?

No. Currently it only works for exported functions.

## Credits

* Inspired by [Elixir Doctests](https://elixir-lang.org/getting-started/mix-otp/docs-tests-and-with.html)
* Original fork of mainshayne223/doctest-js
