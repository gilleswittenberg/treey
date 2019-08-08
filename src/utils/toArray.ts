const toArray = <T>(val: T | T[]) => Array.isArray(val) ? val : [val]
export default toArray
