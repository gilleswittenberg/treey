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
  readonly map?: (state: State, ...args: unknown[]) => State
}
declare type ItemEvents = ItemEvent[]
