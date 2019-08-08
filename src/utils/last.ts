const last = <T>(arr: T[]) : T | undefined => {
  const length = arr.length
  return length > 0 ? arr[length - 1] : undefined
}
export default last
