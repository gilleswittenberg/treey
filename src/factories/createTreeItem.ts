import last from "../utils/last"
import createFullName from "./createFullName"
import createUnknownTreeItem from "./createUnknownTreeItem"
import isId from "../lib/isId"

const isItem = (id: Id, item: Item) : boolean => {
  const ids = item.state.ids || []
  return ids.find(itemId => isId(itemId, id)) !== undefined
}

const findItem = (id: Id, items: Items) : OptionalItem => {
  return items.find(item => isItem(id, item))
}

const getItemId = (item: Item) : OptionalId => {
  const ids = item.state.ids
  const lastId = ids && last(ids)
  return lastId
}

const itemName = (item: Item) : FullName => {
  const id = getItemId(item)
  return id ? createFullName(id) : "Unknown"
}

const itemIsDestroyed = (item: Item) : boolean => {
  return item.events.find(event => event.type === "Destroy") !== undefined
}

const createTreeItem = (item: Item, items: Items = [], parentItems: Items = [], isCyclic = false) : TreeItem => {
  const relations = item.state.relations || []
  parentItems.push(item)
  const itemRelations = isCyclic ? [] : relations.map(id => {
    const item = findItem(id, items)
    const isCyclic = findItem(id, parentItems) !== undefined
    return item !== undefined ? createTreeItem(item, items, parentItems, isCyclic) : createUnknownTreeItem(id)
  })
  const name = itemName(item)
  const isDestroyed = itemIsDestroyed(item)
  const isKnown = true
  return { ...item, relations: itemRelations, name, isKnown, isCyclic, isDestroyed }
}

export default createTreeItem
