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

const insertAtIndex = (arr: Ids, id: Id, index: Index) : Ids => {
  arr.splice(index, 0, id)
  return arr
}

const reducer = (state: State, id: Id, index?: Index) : State => {
  const currentRelations = state.relations || []
  const shouldInsert = index !== undefined && currentRelations.length > index
  const relations = shouldInsert ? insertAtIndex(currentRelations, id, index as Index) : currentRelations.concat(id)
  return { ...state, relations }
}

export default {
  type,
  payloadBlueprint,
  reducer
}
