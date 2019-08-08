export type Name = string
export type FullName = string
export interface Id {
  protocol?: string,
  name: Name
}
export type Ids = Id[]
export type UUID = string
export type Hash = string
export type Hashes = Hash[]

export type Index = number
export type Data = any
export type Schema = any
