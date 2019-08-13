import toArray from "../utils/toArray"
//import generateHash from "../crypto/generateHash"

const reduceState = (state: State, event: ItemEvent) : State => {

  switch (event.type) {
  case "Create": {
    return {}
  }
  case "IdentityAdd": {
    const id = event.payload ? event.payload.id : null
    if (id == null) return state
    const ids = state && state.ids ? state.ids.concat(id) : [id]
    return { ...state, ids }
  }
  case "IdentityRemove": {
    const id = event.payload ? event.payload.id : null
    if (id == null) return state
    const ids = (state && state.ids) || []
    const newIds = ids.filter(i => i.protocol !== id.protocol && i.name !== id.name)
    return { ...state, ids: newIds }
  }
  case "Burn": {
    return state
  }
  case "SchemaSet": {
    const schema = event.payload ? event.payload.schema : null
    if (schema == null) return state
    return { ...state, schema }
  }
  case "DataSet": {
    const data = event.payload ? event.payload.data : null
    return { ...state, data }
  }
  case "RelationAdd": {
    const id = event.payload ? event.payload.id : null
    if (id == null) return state
    const index = event.payload && event.payload.index
    const ids = state && state.relations != null ? state.relations : []
    const shouldInsert = index != null && ids.length > index
    const newIds = shouldInsert ? ids.splice(index as number, 0, id) : ids.concat(id)
    return { ...state, relations: newIds }
  }
  case "RelationRemove": {
    const id = event.payload ? event.payload.id : null
    if (id == null) return state
    const ids = (state && state.relations) || []
    // @TODO: payload.index
    const newIds = ids.filter(i => i.protocol !== id.protocol && i.name !== id.name)
    return { ...state, relations: newIds }
  }
  case "Prune": {
    return state
  }
  }

  return {}
}

const reduceItem = (item: Item | null, event: ItemEvent) : Item => {

  if (item == null && event.type !== "Create") throw new Error ("Item can not be null")
  if (item != null && event.type === "Create") throw new Error ("First ItemEvent should be Create")
  if (item != null && item.events[item.events.length - 1].type === "Burn") throw new Error ("Can not add additional event after Burn event")

  const currentEvents = item != null ? item.events : []
  const events = currentEvents.concat(event)
  const currentState = item != null ? item.state : {}
  const state = reduceState(currentState, event) || {}
  //const hash = generateHash(state)
  //const currentHashes = is ? item.hashes : []
  //const hashes = currentHashes.concat(hash)

  return {
    events,
    state,
    //hashes,
    //hash
  }
}

const createItem = (events: ItemEvent | ItemEvents) : Item => {
  const item = toArray(events).reduce(reduceItem, null)
  if (item == null) throw new Error ("Can not create item without events")
  return item
}
export const updateItem = (item: Item, events: ItemEvent | ItemEvents) : Item => toArray(events).reduce(reduceItem, item)
export default createItem
