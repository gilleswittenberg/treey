import Item, { ItemEventType, ItemEventPayload, ItemEvent, ItemEvents, State } from "./Item"
import generateHash from "./generateHash"

const reduceState = (state: State | null, event: ItemEvent) : State => {

  if (state == null && event.type !== ItemEventType.Create) throw new Error ("State can not be null")
  if (event.type === ItemEventType.Create && state != null) throw new Error ("First ItemEvent should be Create")

  switch (event.type) {
  case ItemEventType.Create: {
    return {}
  }
  case ItemEventType.IdentityAdd: {
    const id = event.payload.id
    if (id == null) return state
    const ids = state.ids ? state.ids.concat(id) : [id]
    return { ...state, ids }
  }
  case ItemEventType.IdentityRemove: {
    const id = event.payload.id
    if (id == null) return state
    const ids = state.ids || []
    const newIds = ids.filter(i => i.protocol !== id.protocol && i.name !== id.name)
    return { ...state, ids: newIds }
  }
  case ItemEventType.Burn: {
    return state
  }
  case ItemEventType.SchemaSet: {
    const schema = event.payload.schema
    if (schema == null) return state
    return { ...state, schema }
  }
  case ItemEventType.DataSet: {
    const data = event.payload.data
    return { ...state, data }
  }
  case ItemEventType.RelationAdd: {
    const id = event.payload.id
    if (id == null) return state
    const index = event.payload.index
    const ids = state.relations != null ? state.relations : []
    const shouldInsert = index != null && ids.length > index
    const newIds = shouldInsert ? ids.splice(index, 0, id) : ids.concat(id)
    return { ...state, relations: newIds }
  }
  case ItemEventType.IdentityRemove: {
    const id = event.payload.id
    if (id == null) return state
    const ids = state.relations || []
    // @TODO: payload.index
    const newIds = ids.filter(i => i.protocol !== id.protocol && i.name !== id.name)
    return { ...state, ids: newIds }
  }
  case ItemEventType.Prune: {
    return state
  }
  }
}

const reduceItem = (item: Item | null, event: ItemEvent) : Item => {

  const is = item != null
  const isNot = !is

  if (isNot && event.type !== ItemEventType.Create) throw new Error ("Item can not be null")
  if (is && event.type === ItemEventType.Create) throw new Error ("First ItemEvent should be Create")
  if (is && item.events[item.events.length - 1].type === ItemEventType.Burn) throw new Error ("Can not add additional event after Burn event")

  const getIdFromIdentityAddEvent = (event: ItemEvent) =>
    event.type === ItemEventType.IdentityAdd && event.payload.id.protocol === "self" ? event.payload.id.name : null
  const id = is && item.id != null ? item.id : getIdFromIdentityAddEvent(event)
  const currentEvents = is ? item.events : []
  const events = currentEvents.concat(event)
  const currentState = is ? item.state : {}
  const state = reduceState(currentState, event)
  const hash = generateHash(state)
  const currentHashes = is ? item.hashes : []
  const hashes = currentHashes.concat(hash)

  return {
    id,
    events,
    state,
    hashes,
    hash
  }
}

const createItem = (events: ItemEvents) : Item => events.reduce(reduceItem, null)

export default createItem
