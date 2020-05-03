type R = Record<string, unknown>

export default (iterable: unknown[][]) : R =>
  [...iterable].reduce((obj, [key, val]) => {
    obj[String(key)] = val
    return obj
  }, {} as R)
