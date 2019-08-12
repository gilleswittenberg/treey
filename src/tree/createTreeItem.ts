import Item, { Items, ItemEventType } from "../types/Item"
import TreeItem from "../types/TreeItem"
import last from "../utils/last"
import createFullName from "../createFullName"
import createUnknownTreeItem from "../createUnknownTreeItem"

const isItem = (id: Id, item: Item) : boolean => {
  const ids = item.state.ids || []
  // @TODO: check id.protocol
  return ids.find(itemId => itemId.name === id.name) !== undefined
}

const findItem = (id: Id, items: Items) : Optional<Item> => {
  return items.find(item => isItem(id, item))
}

const getItemId = (item: Item) : Optional<Id> => {
  const ids = item.state.ids
  const lastId = ids && last(ids)
  return lastId
}

const itemName = (item: Item) : FullName => {
  const id = getItemId(item)
  return id ? createFullName(id) : "Unknown"
}

const itemIsBurned = (item: Item) : boolean => {
  const lastEvent = last(item.events)
  if (lastEvent === undefined) return false
  return lastEvent.type === ItemEventType.Burn
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
  const isBurned = itemIsBurned(item)
  const isKnown = true
  return { ...item, relations: itemRelations, name, isKnown, isCyclic, isBurned }
}

export default createTreeItem
