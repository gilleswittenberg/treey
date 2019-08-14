declare type ItemEventType =
  "Create" |
  "IdentityAdd" |
  "IdentityRemove" |
  "Burn" |
  "SchemaSet" |
  "DataSet" |
  "RelationAdd" |
  "RelationRemove" |
  "Prune"

declare type ItemEventPayload = {
  readonly state?: State
  readonly id?: Id
  readonly schema?: Schema
  readonly data?: Data
  readonly index?: Index
}

declare type ItemEvent = {
  readonly type: ItemEventType
  readonly datetime: Date
  readonly payload?: ItemEventPayload
}
declare type ItemEvents = ItemEvent[]

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
