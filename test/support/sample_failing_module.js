/**
 * Returns the value stored in the object where the nested keys point to
 * @params {object} object - Object with value to dig out
 * @params {array} - nestedKeys - Can be array or '.' delimited string
 * @example
 * dig({a: {b: {c: 'd'}}}, ['a', 'b', 'c'])
 * //=> 'd'
 * @example
 * dig({a: {b: {c: 'd'}}}, 'a.b.c')
 * //=> 'd'
 */
export function dig(object, nestedKeys) {
  const keys =
    nestedKeys.constructor === Array ? nestedKeys : nestedKeys.split('.');
  let value = object;
  keys.forEach((key) => {
    value = value[key];
  });
  return value;
}

/**
 * Returns an object of the elements grouped by the function
 * @params {array} elements - the elements to be grouped
 * @params {function} fun - the function who's return value will be the key in the return object
 * @returns {object}
 * @example
 * groupBy([1, 1, 2, 3, 5, 8, 11], (val) => val % 2 ? 'odd' : 'even' )
 * //=> {odd: [1, 1, 3, 5, 11], even: [2, 8]}
 */
export function groupBy(elements, fun) {
  const grouping = {};
  elements.forEach((element) => {
    const value = fun(element);
    grouping[value] = (grouping[value] || []).concat([element]);
  });
  return grouping;
}

/** Returns the keypaths for the object
 * @params {object} object - The object to get the keys from
 * @returns {object}
 * @example
 * keyPaths( { a: { b: ['c'] } } )
 * //=> [ ['a'], ['a', 'b'], ['a', 'b', '0']  ]
 */
export function keyPaths(object, parentKeys = []) {
  const type = object.constructor;
  if (type !== Array && type !== Object) return [parentKeys];
  let paths = [];
  if (parentKeys.length) paths = paths.concat([parentKeys]);
  Object.keys(object).forEach((key) => {
    const subKeyPaths = keyPaths(object[key], parentKeys.concat([key]));
    paths = paths.concat(subKeyPaths);
  });
  return paths;
}

/**
 * Merges two objects into one new object
 * object2 will overwrite matching keys in object1
 * @params {object} object1 - First Object
 * @params {object} object2 - Second Object
 * @returns {object}
 * @example
 * merge({woah: 'we', seeya: 'soon'}, {done: 'merged', seeya: 'later'})
 * //=> {woah: 'we', didnt: 'merge', allthe: 'way'}
 */
export function merge(object1, object2) {
  const newObject = {};
  Object.keys(object1).forEach((key) => {
    newObject[key] = object1[key];
  });
  Object.keys(object2).forEach((key) => {
    newObject[key] = object2[key];
  });
  return newObject;
}

/**
 * Returns the object as an array
 * @params {object} object - Object with numbers as keys
 * @returns {array}
 * @example
 * numberKeyedObjectToArray({1: 'one', 2: 'two'})
 * //=> [ , 'one', 'two' ]
 */
export function numberKeyedObjectToArray(object) {
  const array = [];
  Object.keys(object).forEach((key) => {
    array[key] = object[key];
  });
  return array;
}
