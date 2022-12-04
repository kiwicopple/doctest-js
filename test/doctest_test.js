/* globals describe it */
import { expect } from 'chai'
import doctest from '../src'

const SAMPLE_PASSING_MODULE_PATH = './test/support/sample_passing_module.js'
const SAMPLE_PASSING_CLASS_PATH = './test/support/sample_passing_class.js'
const SAMPLE_FAILING_MODULE_PATH = './test/support/sample_failing_module.js'
const SAMPLE_ERROR_MODULE_PATH = './test/support/sample_error_module.js'
const { Arithmetic } = require('./support/sample_passing_class')

describe('passing doctest', () => {
  doctest(SAMPLE_PASSING_MODULE_PATH)
  doctest(SAMPLE_PASSING_CLASS_PATH, { instance: new Arithmetic() })
})

describe('failing doctest', () => {
  doctest(SAMPLE_FAILING_MODULE_PATH, {
    testingFunction: (actual, expected, _doctest, index) => {
      if (index === 4) {
        it('should fail', () => {
          expect(actual.result).to.not.eql(expected.result)
        })
      } else {
        it('should not fail', () => {
          expect(actual.result).to.eql(expected.result)
        })
      }
    },
  })
})

describe('error doctest', () => {
  it('should raise an error', () => {
    expect(() => {
      doctest(SAMPLE_ERROR_MODULE_PATH)
    }).to.throw(Error)
  })
})
