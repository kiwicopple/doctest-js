/* eslint no-eval: "off", no-console: "off" */
import * as babel from 'babel-core';
import fs from 'fs';
import path from 'path';

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

export const evalExpression = (evalString, module = '1', filePath) => {
  try {
    const code = `require('${filePath}').${evalString}`;
    const result = eval(code);
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

export default ({ resultString, returnString }, module, filePath) => {
  const fullPath = path.join(process.cwd(), filePath);
  const actual = evalExpression(resultString, module, fullPath);
  const expected = evalValue(returnString);
  return { actual, expected };
};
