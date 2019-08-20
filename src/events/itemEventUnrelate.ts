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

const isId = (id: Id, id1: Id) : boolean => id.protocol === id1.protocol && id.name === id1.name

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
