type R = Record<string, unknown>

const fromEntries = (iterable: unknown[][]) : R => {
  const o: R = {}
  return [...iterable].reduce((obj, [key, val]) => {
    obj[String(key)] = val
    return obj
  }, o)
}
export default fromEntries
