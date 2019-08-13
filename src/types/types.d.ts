declare type Name = string
declare type FullName = string
declare interface Id {
  protocol?: string,
  name: Name
}
declare type OptionalId = Optional<Id>
declare type Ids = Id[]
declare type UUID = string
declare type Hash = string
declare type Hashes = Hash[]

declare type Index = number
declare type Data = any
declare type Schema = Record<string, unknown>
