/* globals it describe */
import { expect } from 'chai';
import { parseComments } from '../src';

const FIRST_SAMPLE_COMMENT = `
/*
 * yay docs!
 * love em!
 */
`;

const SECOND_SAMPLE_COMMENT = `
/* woah
 */
`;

const SAMPLE_JS_FILE_STRING = `
import something from 'somewhere';

${FIRST_SAMPLE_COMMENT}
export function coolThing(...args) {
  delete args;
}


${SECOND_SAMPLE_COMMENT}
export const getCool = () => {};
`;

describe('parseComments', () => {
  it('should return an array of comment chunks found in a .js file', () => {
    const [firstParsedComment, secondParsedComment] = parseComments(
      SAMPLE_JS_FILE_STRING,
    );

    expect(firstParsedComment).to.equal(FIRST_SAMPLE_COMMENT.trim());
    expect(secondParsedComment).to.equal(SECOND_SAMPLE_COMMENT.trim());
  });
});
