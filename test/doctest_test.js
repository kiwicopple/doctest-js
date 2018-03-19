/* globals it describe */
import { expect } from 'chai';
import doctest from '../src';

const SAMPLE_MODULE = './test/support/sample_module.js';

describe('doctest', () => {
  it('should properly pass for a module with passing doctests', () => {
    expect(doctest(SAMPLE_MODULE)).to.equal(true);
  });
});
