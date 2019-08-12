export interface ItemEventPayload {
  readonly state?: State
  readonly id?: Id
  readonly schema?: Schema
  readonly data?: Data
  readonly index?: Index
}

export enum ItemEventType {
  Create,
  IdentityAdd,
  IdentityRemove,
  Burn,
  SchemaSet,
  DataSet,
  RelationAdd,
  RelationRemove,
  Prune
}

export interface ItemEvent {
  readonly type: ItemEventType
  readonly datetime: Date
  readonly payload?: ItemEventPayload
}
export type ItemEvents = ItemEvent[]

export interface State {
  readonly ids?: Ids
  readonly schema?: Schema
  readonly data?: Data
  readonly relations?: Ids
}

export default interface Item {
  readonly events: ItemEvents
  readonly state: State
  //hashes: Hashes
  //hash: Hash
}
export type Items = Item[]
