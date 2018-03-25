/* globals it */
import fs from 'fs';
import { expect } from 'chai';
import parseDoctests from './doctest_parser';
import evalDoctest from './safe_eval';

const defaultTestingFunction = (actual, expected, doctest) => {
  it(`doctest: ${doctest.resultString}`, () => {
    if (actual.result && expected.result) {
      expect(actual.result).to.eql(expected.result);
    }
  });
};

export default (filePath, options = {}) => {
  const file = fs.readFileSync(filePath, 'utf8');
  const doctests = parseDoctests(file);
  doctests.forEach((doctest, index) => {
    const { actual, expected } = evalDoctest(doctest, filePath);

    if (actual.error) {
      throw actual.error;
    } else if (expected.error) {
      throw expected.error;
    } else {
      const { testingFunction = defaultTestingFunction } = options;
      testingFunction(actual, expected, doctest, index);
    }
  });
};
