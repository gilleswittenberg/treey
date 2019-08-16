// @TODO: Can we set return type to generic NonEmptyArray
const toArray = <T>(val: T | T[]) => Array.isArray(val) ? val : [val]
export default toArray
