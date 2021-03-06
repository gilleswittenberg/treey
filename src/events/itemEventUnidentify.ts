const type: ItemEventType = "Unidentify"
const payloadBlueprint: ItemEventPayloadBlueprint = [{
  name: "id",
  type: "Id",
  isRequired: true
}]
const reducer = (state: State, id: Id) : State => {
  const ids = state.ids ? state.ids.filter(i => i.protocol !== id.protocol && i.name !== id.name) : undefined
  return { ...state, ids }
}

export default {
  type,
  payloadBlueprint,
  reducer
}
