declare type Optional<T> = T | undefined
declare type SingleOrArray<T> = T | T[]
declare type NonEmptyArray<T> = [T, ...T[]]
declare type SingleOrNonEmptyArray<T> = T | NonEmptyArray<T>
