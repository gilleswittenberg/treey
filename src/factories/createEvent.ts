import createEventItemPayload from "./createEventItemPayload"

const createEvent = (type: ItemEventType, rawPayload?: ItemEventPayload) : ItemEvent => {
  const datetime = new Date()
  const payload = createEventItemPayload(type, rawPayload)
  return { type, datetime, payload }
}

export default createEvent
