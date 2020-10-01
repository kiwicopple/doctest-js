import { Parser } from 'jison'
import Lexer from 'lex'

// parser states
const NO_STATE = 'NO_STATE'
const IN_COMMENT = 'IN_COMMENT'
const IN_EXAMPLE = 'IN_EXAMPLE'
const IN_RETURN_VALUE = 'IN_RETURN_VALUE'

// basic grammar
const grammar = {
  bnf: {
    expression: [['EOF', 'return $1;']],
  },
}

export default text => {
  // lexer parser setup
  const lexer = new Lexer()
  const parser = new Parser(grammar)
  parser.lexer = lexer
  const doctests = []
  let doctestIndex = -1
  let state = NO_STATE
  let isClass = false
  // begin multi-line comment
  lexer.addRule(/\/\*/, () => {
    if (state === NO_STATE) {
      state = IN_COMMENT
    }
  })

  // end multi-line comment
  lexer.addRule(/\*\//, () => {
    if (state === IN_RETURN_VALUE) {
      state = NO_STATE
    }
  })

  // begin doctest example
  lexer.addRule(/@example/, () => {
    if (state === IN_COMMENT || state === IN_RETURN_VALUE) {
      state = IN_EXAMPLE
      doctestIndex += 1
      doctests[doctestIndex] = {
        resultString: '',
        stringToEval: '',
      }
    }
  })

  // begin doctest return value
  lexer.addRule(/\/\/=>/, () => {
    if (state === IN_EXAMPLE) {
      state = IN_RETURN_VALUE
    }
  })

  // ignore multi-line comment start
  // this is a bit naive as it only uses spaces/indentation to cleanse
  lexer.addRule(/\n\* /, () => {})
  lexer.addRule(/\r\n\* /, () => {})
  lexer.addRule(/\n \* /, () => {})
  lexer.addRule(/\r\n \* /, () => {})
  lexer.addRule(/\n  \* /, () => {})
  lexer.addRule(/\r\n  \* /, () => {})
  lexer.addRule(/\n   \* /, () => {})
  lexer.addRule(/\r\n   \* /, () => {})
  lexer.addRule(/\n    \* /, () => {})
  lexer.addRule(/\r\n    \* /, () => {})
  lexer.addRule(/\n     \* /, () => {})
  lexer.addRule(/\r\n     \* /, () => {})
  lexer.addRule(/\n      \* /, () => {})
  lexer.addRule(/\r\n      \* /, () => {})

  // add chars to appropriate section
  
  lexer.addRule(/\n|./, lexme => {
    if (state === IN_EXAMPLE) {
      doctests[doctestIndex].resultString += lexme
    } else if (state === IN_RETURN_VALUE) {
      doctests[doctestIndex].stringToEval += lexme
    }
  })

  lexer.addRule(/\r\n|./, lexme => {
    if (state === IN_EXAMPLE) {
      doctests[doctestIndex].resultString += lexme
    } else if (state === IN_RETURN_VALUE) {
      doctests[doctestIndex].stringToEval += lexme
    }
  })

  // eof
  lexer.addRule(/$/, () => 'EOF')
  parser.parse(text)
  // trim everythhing
  const sanitizedDoctests = doctests.map(({ resultString, stringToEval }) => ({
    resultString: resultString.trim(),
    stringToEval: stringToEval.trim(),
  }))
  return sanitizedDoctests
}
