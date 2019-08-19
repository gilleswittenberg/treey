const type: ItemEventType = "Relate"
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
  const shouldInsert = index && currentRelations.length > index
  const relations = shouldInsert ? currentRelations.splice(index as number, 0, id) : currentRelations.concat(id)
  return { ...state, relations }
}

export default {
  type,
  payloadBlueprint,
  reducer
}
