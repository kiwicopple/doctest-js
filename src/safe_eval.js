/* eslint no-eval: "off", no-console: "off" */
import path from 'path'

export const evalExpression = (evalString, filePath) => {
  try {
    const cleanPath = (filePath !== undefined) ? filePath.replace(/\\/g,'/') : filePath;
    const code = `require('${cleanPath}').${evalString}`
    const result = eval(code)
    return { result }
  } catch (error) {
    return { error }
  }
}

export const evalValue = evalString => {
  const wrappedEvalString = `(${evalString})`
  try {
    return { result: eval(wrappedEvalString) }
  } catch (error) {
    return { error }
  }
}

export default ({ resultString, stringToEval }, filePath, instance) => {
  const fullFilePath = path.join(process.cwd(), filePath)
  if (!instance) {
    const actual = evalExpression(resultString, fullFilePath)
    const expected = evalValue(stringToEval)
    return { actual, expected }
  }
  const result = eval(`instance.${resultString};`)
  const actual = { result }
  const expected = evalValue(stringToEval)
  return { actual, expected }
}
