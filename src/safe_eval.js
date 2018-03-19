/* eslint no-eval: "off" */
export default (evalString) => {
  try {
    return { result: eval(evalString) };
  } catch (error) {
    const { constructor, message } = error;
    if (constructor === SyntaxError && message === 'Unexpected token :') {
      try {
        return { result: eval(`(${evalString})`) };
      } catch (objectError) {
        return { error: objectError };
      }
    }
    return { error };
  }
};
