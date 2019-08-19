const type: ItemEventType = "Unrelate"
const payloadBlueprint: ItemEventPayloadBlueprint = [
  {
    name: "id",
    type: "Id",
    isRequired: true
  },
  {
    name: "index",
    type: "Index",
    isRequired: false
  }
]
const reducer = (state: State, id: Id, index?: Index) : State => {
  const currentRelations = state.relations || []
  // @TODO: index
  // @TODO: Extract isId
  const relations = currentRelations.filter(i => i.protocol !== id.protocol && i.name !== id.name)
  return { ...state, relations }
}

export default {
  type,
  payloadBlueprint,
  reducer
}
