import { ItemEventType, ItemEventPayload, ItemEvent } from "./types/Item"

const validateEventPayload = (type: ItemEventType, payload?: ItemEventPayload) : ItemEventPayload | null => {

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
  case ItemEventType.RelationRemove:
    return payload.id != null ? { id: payload.id, index: payload.index } : null
  case ItemEventType.Prune:
    return payload.state != null ? { state: payload.state } : null
  }

  return null
}

const createEvent = (type: ItemEventType, payload?: ItemEventPayload) : ItemEvent => {
  const datetime = new Date()
  const validatedPayload = validateEventPayload(type, payload)
  return validatedPayload != null ? { type, datetime, payload: validatedPayload } : { type, datetime }
}

export default createEvent
