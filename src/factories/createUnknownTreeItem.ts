import createFullName from "./createFullName"

const createUnknownTreeItem = (id: Id) : TreeItem => (
  {
    state: {},
    events: [],
    relations: [],
    name: createFullName(id),
    isKnown: false,
    isCyclic: false,
    isBurned: false
  }
)

export default createUnknownTreeItem
