/* eslint no-eval: "off" */

export const evalExpression = (evalString) => {
  try {
    return { result: eval(evalString) };
  } catch (error) {
    return { error };
  }
};

export const evalValue = (evalString) => {
  const wrappedEvalString = `(${evalString})`;
  try {
    return { result: eval(wrappedEvalString) };
  } catch (error) {
    return { error };
  }
};
