import { UUID, Hash, Hashes, Id, Ids, Index, Schema, Data } from "./types"

interface ItemEventPayload {
  state?: State,
  id?: Id,
  schema?: Schema,
  data?: Data,
  index?: Index
}

enum ItemEventType {
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

interface ItemEvent {
  type: ItemEventType,
  datetime: Date,
  payload?: ItemEventPayload
}
type ItemEvents = ItemEvent[]

interface State {
  ids?: Ids,
  schema?: Schema,
  data?: Data,
  relations?: Ids
}

interface Item {
  //id: UUID,
  events: ItemEvents,
  state: State,
  //hashes: Hashes,
  //hash: Hash
}
type Items = Item[]

export default Item
export {
  Items,
  ItemEventType,
  ItemEvent,
  ItemEvents,
  ItemEventPayload,
  State
}
