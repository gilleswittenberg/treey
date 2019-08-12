export interface ItemEventPayload {
  state?: State
  id?: Id
  schema?: Schema
  data?: Data
  index?: Index
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
  type: ItemEventType
  datetime: Date
  payload?: ItemEventPayload
}
export type ItemEvents = ItemEvent[]

export interface State {
  ids?: Ids
  schema?: Schema
  data?: Data
  relations?: Ids
}

export default interface Item {
  events: ItemEvents
  state: State
  //hashes: Hashes
  //hash: Hash
}
export type Items = Item[]
