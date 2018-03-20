/* eslint no-eval: "off", no-console: "off" */
import * as babel from 'babel-core';
import fs from 'fs';

const getBabelConfig = () => {
  try {
    const file = fs.readFileSync('.babelrc', 'utf8');
    if (file) {
      return JSON.parse(file);
    }

    throw new Error('no .babelrc');
  } catch (error) {
    console.warn('failed to load .babelrc. attempting without', error);

    return {};
  }
};

const BABEL_CONFIG = getBabelConfig();

export const evalExpression = (evalString, module = '1') => {
  try {
    const code = `${module}; ${evalString}`;
    const transformedCode = babel.transform(code, BABEL_CONFIG).code;
    const result = eval(transformedCode);
    return { result };
  } catch (error) {
    return { error };
  }
};

export const evalValue = (evalString) => {
  const wrappedEvalString = `(${evalString})`;
  try {
    return { result: eval(wrappedEvalString) };
  } catch (error) {
    return { error };
  }
};

export default ({ resultString, returnString }, module) => {
  const actual = evalExpression(resultString, module);
  const expected = evalValue(returnString);
  return { actual, expected };
};
