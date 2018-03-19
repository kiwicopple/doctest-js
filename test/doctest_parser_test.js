/* globals it describe */
import fs from 'fs';
import { expect } from 'chai';
import parseDoctests from '../src/doctest_parser';

const SAMPLE_MODULE = './test/support/sample_module.js';

describe('parseDocs', () => {
  it('should return an array objects with the string to eval and the expected value', () => {
    const file = fs.readFileSync(SAMPLE_MODULE, 'utf8');
    const [firstDoctest, secondDoctest, thirdDoctest, fourthDoctest] = parseDoctests(file);

    expect(firstDoctest.functionString).to.equal('titleize(\'wOaH\')');
    expect(firstDoctest.returnString).to.equal("'Woah'");

    expect(secondDoctest.functionString).to.equal('titleize(\'w\')');
    expect(secondDoctest.returnString).to.equal('\'W\'');

    expect(thirdDoctest.functionString).to.equal('stringData(  \'woah\')');
    expect(thirdDoctest.returnString).to.equal('{  length: 4,  vowels: 2,  consonants: 2}');

    expect(fourthDoctest.functionString).to.equal('split(\'why am i doing this?\', \' \')');
    expect(fourthDoctest.returnString).to.equal('[ \'why\', \'am\', \'i\', \'doing\', \'this?\' ]');
  });
});

