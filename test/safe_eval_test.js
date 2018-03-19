/* globals it describe */
import { expect } from 'chai';
import safeEval from '../src/safe_eval';

describe('eval', () => {
  it('should properly resolve simple values', () => {
    const evalString = '5';
    const { result } = safeEval(evalString);
    expect(result).to.equal(5);
  });

  it('should properly resolve more complex values', () => {
    const evalString = '{woah: "wow", insane: "right?", someNumber: 9}';
    const { result } = safeEval(evalString);
    const { woah, insane, someNumber } = result;
    expect(woah).to.equal('wow');
    expect(insane).to.equal('right?');
    expect(someNumber).to.equal(9);
  });

  it('should properly resolve expressions', () => {
    const evalString = 'var fun = () => 3; fun()';
    const { result } = safeEval(evalString);
    expect(result).to.equal(3);
  });

  it('should gracefully handle syntax errors', () => {
    const evalString = '* 5 *';
    const { error } = safeEval(evalString);
    expect(error.constructor).to.equal(SyntaxError);
    expect(error.message).to.equal('Unexpected token *');
  });

  it('should gracefully handle runtime errors', () => {
    const evalString = 'nonExistantFunction()';
    const { error } = safeEval(evalString);
    expect(error.constructor).to.equal(ReferenceError);
    expect(error.message).to.equal('nonExistantFunction is not defined');
  });
});
