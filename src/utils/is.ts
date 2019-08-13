const is = <T>(v: Optional<T>) : boolean => v !== undefined
is.not = <T>(v: Optional<T>) : boolean => !is(v)
export default is
