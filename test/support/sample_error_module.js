/**
 * Returns the last element in an array
 * @param {array} array - The array to get the last value from
 * @example
 * last([1,2,3])
 * //=> 3
 * @example
 * last([[])
 * //=> undefined
 */
export function last(array) {
  return array[array.length - 1]
}

export function first(array) {
  return array[0]
}
