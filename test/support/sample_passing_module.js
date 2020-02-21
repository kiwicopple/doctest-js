// This is an example of a string helper module

/**
 * Returns a word with all letter downcases except the first letter
 * @param {string} word - The word to be titleized
 * @return {string} The string titlelized
 * @example
 * titleize('wOaH')
 * //=> 'Woah'
 * @example
 * titleize('w')
 * //=> 'W'
 */
export function titleize(word) {
  switch (word.length) {
    case 0:
      return '';
    case 1:
      return word.toUpperCase();
    default:
      return word[0].toUpperCase() + word.slice(1, word.length).toLowerCase();
  }
}

/**
 * Returns fairly unnecessary and uninteresting information about a string
 * @param {string} string - The string of disinterest
 * @return {object} Useless information
 * @example
 * stringData(
 *   'woah'
 * )
 * //=> {
 *   length: 4,
 *   vowels: 2,
 *   consonants: 2
 * }
 *
 * @example
 * stringData(
 *   'woah'
 * )
 * //=>
 * {
 *   length: 4,
 *   vowels: 2,
 *   consonants: 2
 * }
 */
export function stringData(string) {
  const vowels = string
    .toLowerCase()
    .split('')
    .filter((char) => ['a', 'e', 'i', 'o', 'u', 'y'].find((v) => char === v))
    .length;
  return {
    vowels,
    length: string.length,
    consonants: string.length - vowels,
  };
}

/**
 * Does the same thing as String.prototype.split
 * @param {string} string - The string you should be using .split on
 * @param {string} delimiter - The arg you would pass to .split
 * @return {array} The exact same thing .splt would return
 * @example
 * split('why am i doing this?', ' ')
 * //=> [ 'why', 'am', 'i', 'doing', 'this?' ]
 *
 * @example
 * split('why am i doing this?', ' ')
 * //=>
 * [ 'why', 'am', 'i', 'doing', 'this?' ]
 */
export function split(string, delimter) {
  return string.split(delimter);
}
