type Name = string
type FullName = string
interface Id {
  protocol?: string,
  name: Name
}
type Ids = Id[]
type UUID = string
type Hash = string
type Hashes = Hash[]

type Index = number
type Data = any
type Schema = Record<string, unknown>
