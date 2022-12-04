/* globals it describe */
import fs from 'fs'
import chai from 'chai'
import parseDoctests from '../src/doctest_parser.js'

const { expect } = chai

const SAMPLE_MODULE = './test/support/sample_passing_module.js'
const FILE = fs.readFileSync(SAMPLE_MODULE, 'utf8')

describe('parseDocs', () => {
  it('should return an array objects with the string to eval and the expected value', () => {
    const [firstDoctest, secondDoctest, thirdDoctest, fourthDoctest] = parseDoctests(FILE)

    expect(firstDoctest.resultString).to.equal("titleize('wOaH')")
    expect(firstDoctest.stringToEval).to.equal("'Woah'")

    expect(secondDoctest.resultString).to.equal("titleize('w')")
    expect(secondDoctest.stringToEval).to.equal("'W'")

    expect(thirdDoctest.resultString).to.equal("stringData(  'woah')")
    expect(thirdDoctest.stringToEval).to.equal('{  length: 4,  vowels: 2,  consonants: 2}')

    expect(fourthDoctest.resultString).to.equal("split('why am i doing this?', ' ')")
    expect(fourthDoctest.stringToEval).to.equal("[ 'why', 'am', 'i', 'doing', 'this?' ]")
  })
})
