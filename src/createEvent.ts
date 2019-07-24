import { ItemEventType, ItemEventPayload, ItemEvent, ItemEvents, State } from "./Item"

const validateEventPayload = (type: ItemEventType, payload?: ItemEventPayload) => {

  if (payload == null) return null

  switch (type) {
  case ItemEventType.Create:
    return null
  case ItemEventType.IdentityAdd:
    return { id: payload.id }
  case ItemEventType.IdentityRemove:
    return { id: payload.id }
  case ItemEventType.Burn:
    return null
  case ItemEventType.SchemaSet:
    return { schema: payload.schema }
  case ItemEventType.DataSet:
    return { data: payload.data }
  case ItemEventType.RelationAdd:
    return { id: payload.id, index: payload.index }
  case ItemEventType.IdentityRemove:
    return { id: payload.id, index: payload.index }
  case ItemEventType.Prune:
    return { state: payload.state }
  }
}

const createEvent = (type: ItemEventType, payload?: ItemEventPayload) => {
  const datetime = new Date()
  const event: ItemEvent = { type, datetime }
  const validatedPayload = validateEventPayload(type, payload)
  if (validatedPayload != null) event.payload = validatedPayload
  return event
}

export default createEvent
