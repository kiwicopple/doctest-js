/* globals it */
import fs from 'fs'
import { expect } from 'chai'
import parseDoctests from './doctest_parser'
import evalDoctest from './safe_eval'

const defaultTestingFunction = (actual, expected, doctest) => {
  it(`doctest: ${doctest.resultString}`, () => {
    if (actual.result && expected.result) {
      expect(actual.result).to.eql(expected.result)
    }
  })
}

export default (filePath, options = {}) => {
  const file = fs.readFileSync(filePath, 'utf8')
  const doctests = parseDoctests(file)
  doctests.forEach((doctest, index) => {
    console.log('inside')
    const { actual, expected } = evalDoctest(doctest, filePath, options.instance)
    console.log('passing')
    if (actual.error) {
      console.log('actual err')
      console.log(actual)
      throw actual.error
    } else if (expected.error) {
      console.log('expected err')
      throw expected.error
    } else {
      console.log('else')
      const { testingFunction = defaultTestingFunction } = options
      console.log('else passing')
      testingFunction(actual, expected, doctest, index)
      console.log('else passed')
    }
  })
}
