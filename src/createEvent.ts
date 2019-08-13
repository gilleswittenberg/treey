const validateEventPayload = (type: ItemEventType, payload?: ItemEventPayload) : Optional<ItemEventPayload> => {

  if (payload === undefined) return undefined

  switch (type) {
  case "Create":
    return undefined
  case "IdentityAdd":
    return payload.id !== undefined ? { id: payload.id } : undefined
  case "IdentityRemove":
    return payload.id !== undefined ? { id: payload.id } : undefined
  case "Burn":
    return undefined
  case "SchemaSet":
    return payload.schema !== undefined ? { schema: payload.schema } : undefined
  case "DataSet":
    return payload.data !== undefined ? { data: payload.data } : undefined
  case "RelationAdd":
    return payload.id !== undefined ? { id: payload.id, index: payload.index } : undefined
  case "RelationRemove":
    return payload.id !== undefined ? { id: payload.id, index: payload.index } : undefined
  case "Prune":
    return payload.state !== undefined ? { state: payload.state } : undefined
  }
}

const createEvent = (type: ItemEventType, payload?: ItemEventPayload) : ItemEvent => {
  const datetime = new Date()
  const validatedPayload = validateEventPayload(type, payload)
  return validatedPayload !== undefined ? { type, datetime, payload: validatedPayload } : { type, datetime }
}

export default createEvent
