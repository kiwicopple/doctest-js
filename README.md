# JS-Doctest

Run [JSDoc](http://usejsdoc.org/about-getting-started.html) style doc examples as tests within your test suite

Inspired by [Elixir Doctests](https://elixir-lang.org/getting-started/mix-otp/docs-tests-and-with.html)

[![Build Status](https://travis-ci.org/MainShayne233/js-doctest.svg?branch=master)](https://travis-ci.org/MainShayne233/js-doctest)

Write a function with a [JSDoc style documentation](http://usejsdoc.org/about-getting-started.html)

```javascript
/**
 * Returns fairly unnecessary and uninteresting information about a string
 * @param {string} string - The string of disinterest
 * @return {object} Useless information
 * @example
 * stringData('woah')
 * //=>
 * {
 *   length: 4,
 *   vowels: 2,
 *   consonants: 2,
 * }
 */
export function stringData(string) {
  const vowels = string
    .toLowerCase()
    .split('')
    .filter((char) => {
      return ['a', 'e', 'i', 'o', 'u', 'y'].find((v) => char === v);
    }).length;
  return {
    length: string.length,
    vowels: vowels,
    consonants: string.length - vowels,
  };
}
```

Import the doctest function in your test suite and point it at the file.

```javascript
import doctest from 'jsdoc-test';

describe('stringData Doctests', () => {
  doctest('src/string/index.js'); // path is relative to root of directory
});
```

And this will run and test all instances of `@example` in the given file

Notes:

* The only [JSDoc](http://usejsdoc.org/about-getting-started.html) component
  you need is the `@example`.
* You can have as many `@examples` as you'd like for any one function.
* Example function calls and return values can span multiple lines.
* Currently only works for exported functions

## Testing Function

By default, `doctest` will use a basic [chai](https://github.com/chaijs/chai)
expect as its testing function.

```javascript
it(`${functionName} should match its doc example value`, () => {
  expect(actualReturnValue).to.eql(expectedReturnValue);
});
```

But this function can be overridden by any function that takes three arguments:

`(functionName, actualReturnValue, expectedReturnValue)`.

```javascript
describe('stringData Doctests', () => {
  doctest('src/string/index.js', {
    testingFunction: (actual, expected, doctestObject, doctestIndex) => {
      if (actual === expected) console.log(functionName + ', you did it!');
      else console.log('Better luck next time, ' + functionName);
    },
  });
});
```
