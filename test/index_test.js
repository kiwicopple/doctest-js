/* globals it describe */
import { expect } from 'chai';
import { double, doubleDouble } from '../src';

describe('double', () => {
  it('returns double the number passed in', () => {
    expect(double(3)).to.equal(6);
  });
});

describe('doubleDouble', () => {
  it('returns quadruple the number passed in', () => {
    expect(doubleDouble(3)).to.equal(12);
  });
});
