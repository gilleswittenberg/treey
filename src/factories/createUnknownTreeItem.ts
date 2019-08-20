import createFullName from "./createFullName"

const createUnknownTreeItem = (id: Id) : TreeItem => (
  {
    state: {},
    events: [],
    relations: [],
    name: createFullName(id),
    isKnown: false,
    isCyclic: false,
    isDestroyed: false
  }
)

export default createUnknownTreeItem
