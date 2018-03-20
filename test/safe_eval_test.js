/* globals it describe */
import { expect } from 'chai';
import { evalExpression, evalValue } from '../src/safe_eval';

describe('evalExpression', () => {
  it('should properly resolve expressions', () => {
    const evalString = 'var fun = () => 3; fun()';
    const { result } = evalExpression(evalString);
    expect(result).to.equal(3);
  });

  it('should properly resolve expressions', () => {
    const evalString = 'var fun = () => 3; fun()';
    const { result } = evalExpression(evalString);
    expect(result).to.equal(3);
  });

  it('should gracefully handle syntax errors', () => {
    const evalString = 'varvar funfun == () =>';
    const { error } = evalExpression(evalString);
    expect(error.constructor).to.equal(SyntaxError);
  });

  it('should gracefully handle runtime errors', () => {
    const evalString = 'nonExistantFunction()';
    const { error } = evalExpression(evalString);
    expect(error.constructor).to.equal(ReferenceError);
  });
});

describe('evalValue', () => {
  it('should properly resolve simple values', () => {
    const evalString = '5';
    const { result } = evalValue(evalString);
    expect(result).to.equal(5);
  });

  it('should properly resolve more complex values', () => {
    const evalString = '{woah: "wow", insane: "right?", someNumber: 9}';
    const { result } = evalValue(evalString);
    const { woah, insane, someNumber } = result;
    expect(woah).to.equal('wow');
    expect(insane).to.equal('right?');
    expect(someNumber).to.equal(9);
  });

  it('should gracefully handle syntax errors', () => {
    const evalString = '* 5 *';
    const { error } = evalValue(evalString);
    expect(error.constructor).to.equal(SyntaxError);
    expect(error.message).to.equal('Unexpected token *');
  });
});
