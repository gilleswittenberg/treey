// @TODO:
// Dependently Typed Events
// ===============
// first event has to be Create
// secondary events can not be Create
// after Destroy no new events are allowed?

// @TODO: generate hashes for each state

const reduceEvent = (state: State, event: ItemEvent) : State => {

  switch (event.type) {
  case "Create": {
    return state
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

const reduceEvents = (events: NonEmptyArray<ItemEvent>, item?: Item) : Item => {
  const currentEvents = item ? item.events : []
  const currentState = item ? item.state : {}
  return {
    events: currentEvents.concat(events),
    state: events.reduce(reduceEvent, currentState)
  }
}

export const createItem = (events: NonEmptyArray<ItemEvent>) : Item => reduceEvents(events)
export const updateItem = (item: Item, events: NonEmptyArray<ItemEvent>) : Item => reduceEvents(events, item)
