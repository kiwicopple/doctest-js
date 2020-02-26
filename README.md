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
- [Usage online](#usage-online)
- [Contributing](#contributing)
- [Credits](#credits)
- [Status](#status)

## Getting Started

### 1. Install

```sh
npm install @supabase/doctest-js
```

### 2. Write @example comments

Create a [JSDoc style @example](https://jsdoc.app/tags-example.html) on any functions that you want tested. 

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

Note that the expected return value must be prefixed by `//=>`.

### 3. Run the tests

Import the doctest function in your test suite and point it at the file.

```javascript
import doctest from '@supabase/doctest-js';

describe('Doctests', () => {
  // file paths are relative to root of directory
  doctest('src/sum.js')
  doctest('src/someOtherFile.js')
})
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
// Arithmetic.js - a basic class which we need to test

class Arithmetic {
  constructor() {}

  /**
   * @example add(1, 2)
   * //=> 3
   */
  add(a, b) {
    return a + b
  }
}

export { Arithmetic }
```

```js
// Arithmetic.test.js

const { Arithmetic } = require('./Arithmetic.js')

describe('passing doctest', () => {
  doctest('./Arithmetic.js', { instance: new Arithmetic() })
})
```

## Usage online 

See this in the wild:

- [supabase/postgrest-js](https://github.com/supabase/postgrest-js/blob/master/test/unit/Doctests.test.js)

## Contributing

- Fork the repo on GitHub
- Clone the project to your own machine
- Commit changes to your own branch
- Push your work back up to your fork
- Submit a Pull request so that we can review your changes and merge

## Credits

* Inspired by [Elixir Doctests](https://elixir-lang.org/getting-started/mix-otp/docs-tests-and-with.html)
* Original fork of [mainshayne223/doctest-js](https://github.com/MainShayne233/js-doctest). See [issue #1](https://github.com/MainShayne233/js-doctest/issues/1).

## Status

Ready for production! Watch and star this repo to keep updated on releases.

![Watch this repo](https://gitcdn.xyz/repo/supabase/monorepo/master/web/static/watch-repo.gif "Watch this repo")
