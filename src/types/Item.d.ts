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

declare interface ItemEventPayload {
  readonly state?: State
  readonly id?: Id
  readonly schema?: Schema
  readonly data?: Data
  readonly index?: Index
}

declare interface ItemEvent {
  readonly type: ItemEventType
  readonly datetime: Date
  readonly payload?: ItemEventPayload
}
declare type ItemEvents = ItemEvent[]

declare interface State {
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
