const type: ItemEventType = "Set"
const payloadBlueprint: ItemEventPayloadBlueprint = [{
  name: "data",
  type: "JSON",
  isRequired: true
}]
const reducer = (state: State, data: Data) : State => ({ ...state, data })

export default {
  type,
  payloadBlueprint,
  reducer
}
