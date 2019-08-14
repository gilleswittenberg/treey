declare type Name = string
declare type FullName = string
declare type Protocol = string
declare type Id = {
  name: Name
  protocol?: Protocol
}
declare type OptionalId = Optional<Id>
declare type Ids = Id[]
declare type UUID = string
declare type Hash = string
declare type Hashes = Hash[]

declare type Index = number
declare type Data = unknown
declare type Schema = Record<string, unknown>
