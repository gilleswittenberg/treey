import isId from "../lib/isId"

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

const removeIdFromIndex = (relations: Ids, id: Id, index: Index) : Ids => {
  const relation = relations[index]
  if (isId(id, relation)) relations.splice(index, 1)
  return relations
}

const reducer = (state: State, id: Id, index?: Index) : State => {
  const currentRelations = state.relations || []
  const relations = index !== undefined ? removeIdFromIndex(currentRelations, id, index as Index) : currentRelations.filter(i => !isId(id, i))
  return { ...state, relations }
}

export default {
  type,
  payloadBlueprint,
  reducer
}
