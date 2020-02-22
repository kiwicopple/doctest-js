# doctest-js

Let your documentation be your testing suite. 

Write [JSDoc](http://usejsdoc.org/about-getting-started.html) style doc examples on all your functions and then test them using `doctest-js`.

**Contents**

- [Getting Started](#getting-started)
  - [1. Install](#1-install)
  - [2. Write @example comments](#2-write-example-comments)
  - [3. Run the tests](#3-run-the-tests)
- [Advanced](#advanced)
  - [Multiple tests](#multiple-tests)
  - [Testing classes](#testing-classes)
- [FAQ's](#faqs)
  - [Why ins't my test working?](#why-inst-my-test-working)
  - [Do I have to write @param, @returns etc?](#do-i-have-to-write-param-returns-etc)
  - [I have a long return value. Does it have to go on one line?](#i-have-a-long-return-value-does-it-have-to-go-on-one-line)
- [Usage online](#usage-online)
- [Contributing](#contributing)
- [Credits](#credits)

## Getting Started

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
 * @example sum(1, 2)
 * //=> 3
 */
export const sum = (a, b) => {
  return a + b
}
```

Use `@example function(param)` to 

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

## Advanced

### Multiple tests

You can run multiple tests for the same function.

```javascript
/**
 * @example sum(1, 2)
 * //=> 3
 * @example sum(3, 4)
 * //=> 7
 */
export const sum = (a, b) => {
  return a + b
}
```

### Testing classes

Testing classes requires you to pass a newed up instance of the class into the test itself. Here is a simple example:

```js
// Arithmatic.js - a basic class which we need to test

class Arithmatic {
  constructor() {}

  /**
   * @example
   * add(1, 2)
   * //=> 3
   */
  add(a, b) {
    return a + b
  }
}

export { Arithmatic }
```

```js
// Arithmatic.test.js

const { Arithmatic } = require('./Arithmatic.js');

describe('passing doctest', () => {
  doctest('./Arithmatic.js', { instance: new Arithmatic() });
});
```


## FAQ's

### Why ins't my test working?

Here are some tips:

<table style="width: 100%;">
<tr>
  <th style="width: 50%;">Do</th>
  <th style="width: 50%;">Avoid</th>
</th>
</tr>
<tr>
  <td colspan="2" style="text-align: center;">
  Try putting the @example declaration and function on the same line
  </td>
</tr>
<tr>
  <td>
  <pre>
  /**
  * @example add(1, 2)
  */</pre>
  </td>
  <td>
  <pre>
  /**
  * @example
  * add(1, 2)
  */</pre>
  </td>
</tr>
<tr>
  <td colspan="2" style="text-align: center;">
  Try putting the return value on one line
  </td>
</tr>
<tr>
  <td>
  <pre>
  /**
  * @example add(1, 2)
  * //=> 3 
  */</pre>
  </td>
  <td>
  <pre>
  /**
  * @example add(1, 2)
  * //=> 
  * 3 
  */</pre>
  </td>
</tr>
<tr>
  <td colspan="2" style="text-align: center;">
  Try removing spaces between multiple tests
  </td>
</tr>
<tr>
  <td>
  <pre>
  /**
  * @example add(1, 2)
  * //=> 3 
  * @example add(5, 5)
  * //=> 3 
  */</pre>
  </td>
  <td>
  <pre>
  /**
  * @example add(1, 2)
  * //=> 3 
  * 
  * @example add(5, 5)
  * //=> 3 
  */</pre>
  </td>
</tr>
</table>


### Do I have to write @param, @returns etc?

The only [JSDoc](http://usejsdoc.org/about-getting-started.html) component you need is the `@example`.

### I have a long return value. Does it have to go on one line?

No. Example function calls and return values can span multiple lines but as mentioned above, it may cause problems (with our parser ... PR's welcome!).


## Usage online 

See this in the wild:

- @todo


## Contributing

- Fork the repo on GitHub
- Clone the project to your own machine
- Commit changes to your own branch
- Push your work back up to your fork
- Submit a Pull request so that we can review your changes and merge

## Credits

* Inspired by [Elixir Doctests](https://elixir-lang.org/getting-started/mix-otp/docs-tests-and-with.html)
* Original fork of [mainshayne223/doctest-js](https://github.com/MainShayne233/js-doctest). See [issue #1](https://github.com/MainShayne233/js-doctest/issues/1).
