import { ItemEventType, ItemEventPayload, ItemEvent } from "./Item"

const validateEventPayload = (type: ItemEventType, payload?: ItemEventPayload) => {

  if (payload == null) return null

  switch (type) {
  case ItemEventType.Create:
    return null
  case ItemEventType.IdentityAdd:
    return payload.id != null ? { id: payload.id } : null
  case ItemEventType.IdentityRemove:
    return payload.id != null ? { id: payload.id } : null
  case ItemEventType.Burn:
    return null
  case ItemEventType.SchemaSet:
    return payload.schema != null ? { schema: payload.schema } : null
  case ItemEventType.DataSet:
    return payload.data != null ? { data: payload.data } : null
  case ItemEventType.RelationAdd:
    return payload.id != null ? { id: payload.id, index: payload.index } : null
  case ItemEventType.IdentityRemove:
    return payload.id != null ? { id: payload.id, index: payload.index } : null
  case ItemEventType.Prune:
    return payload.state != null ? { state: payload.state } : null
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
