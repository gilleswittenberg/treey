const validateEventPayload = (type: ItemEventType, payload?: ItemEventPayload) : ItemEventPayload | null => {

  if (payload == null) return null

  switch (type) {
  case "Create":
    return null
  case "IdentityAdd":
    return payload.id != null ? { id: payload.id } : null
  case "IdentityRemove":
    return payload.id != null ? { id: payload.id } : null
  case "Burn":
    return null
  case "SchemaSet":
    return payload.schema != null ? { schema: payload.schema } : null
  case "DataSet":
    return payload.data != null ? { data: payload.data } : null
  case "RelationAdd":
    return payload.id != null ? { id: payload.id, index: payload.index } : null
  case "RelationRemove":
    return payload.id != null ? { id: payload.id, index: payload.index } : null
  case "Prune":
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
