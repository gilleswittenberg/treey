import createFullName from "./createFullName"

const createUnknownTreeItem = (id: Id) : TreeItem => {
  return {
    state: {},
    events: [],
    relations: [],
    name: createFullName(id),
    isKnown: false,
    isCyclic: false,
    isBurned: false
  }
}

export default createUnknownTreeItem
