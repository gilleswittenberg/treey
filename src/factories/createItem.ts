// @TODO:
// Dependently Typed Events
// ========================
// first event has to be Create
// secondary events can not be Create
// after Destroy no new events are allowed?

// @TODO: generate hashes for each state

import itemEvents from "../events/itemEvents"

const reduceEvent = (state: State, event: ItemEvent) : State => {

  const { type, payload: optionalPayload } = event
  const { reducer } = itemEvents[type]

  const payload = optionalPayload as ItemEventPayload

  switch (type) {
  case "Create":      return (reducer as ItemEventReducerEmpty)(state)
  case "Destroy":     return (reducer as ItemEventReducerEmpty)(state)
  case "Identify":    return (reducer as ItemEventReducerId)(state, payload.id as Id)
  case "Unidentify":  return (reducer as ItemEventReducerId)(state, payload.id as Id)
  case "Set":         return (reducer as ItemEventReducerData)(state, payload.data as Data)
  case "Relate":      return (reducer as ItemEventReducerIdIndex)(state, payload.id as Id, payload.index)
  case "Unrelate":    return (reducer as ItemEventReducerIdIndex)(state, payload.id as Id, payload.index)
  }
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
