declare type State = {
  readonly ids?: Ids
  readonly schema?: Schema
  readonly data?: Data
  readonly relations?: Ids
}

declare interface Item {
  readonly events: ItemEvents
  readonly state: State
  //hashes: Hashes
  //hash: Hash
}
declare type OptionalItem = Optional<Item>
declare type Items = Item[]
