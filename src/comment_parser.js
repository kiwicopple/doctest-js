/* eslint prefer-arrow-callback: "off" */
import { Parser } from 'jison';
import Lexer from 'lex';

const grammar = {
  bnf: {
    expression: [['EOF', 'return $1;']],
    e: [['NUMBER', '$$ = Number(yytext);']],
  },
};

const lexer = new Lexer();
const parser = new Parser(grammar);
parser.lexer = lexer;

export default (text) => {
  const comments = [];
  let commentIndex = 0;
  let inComment = false;

  lexer.addRule(/\/\*/, () => {
    inComment = true;
    comments[commentIndex] = '\n/*';
  });

  lexer.addRule(/\*\//, () => {
    if (inComment) {
      comments[commentIndex] += '*/';
      comments[commentIndex] = comments[commentIndex].trim();
      inComment = false;
      commentIndex += 1;
    }
  });

  lexer.addRule(/\n/, () => {
    if (inComment) {
      comments[commentIndex] += '\n';
    }
  });

  lexer.addRule(/./, (lexme) => {
    if (inComment) {
      comments[commentIndex] += lexme;
    }
  });

  lexer.addRule(/$/, () => 'EOF');

  parser.parse(text);

  return comments;
};
