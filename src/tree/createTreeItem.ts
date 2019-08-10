import { Id, FullName } from "../types/types"
import Item, { OptionalItem, Items, ItemEventType } from "../types/Item"
import TreeItem from "../types/TreeItem"
import last from "../utils/last"
import createFullName from "../createFullName"
import createUnknownTreeItem from "../createUnknownTreeItem"

const isItem = (id: Id, item: Item) : boolean => {
  const ids = item.state.ids || []
  // @TODO: check id.protocol
  return ids.find(itemId => itemId.name === id.name) !== undefined
}

const findItem = (id: Id, items: Items) : OptionalItem => {
  return items.find(item => isItem(id, item))
}

const itemName = (item: Item) : FullName => {
  const ids = item.state.ids
  const lastId = ids && last(ids)
  return lastId ? createFullName(lastId) : "Unknown"
}

const itemIsBurned = (item: Item) : boolean => {
  const lastEvent = last(item.events)
  if (lastEvent === undefined) return false
  return lastEvent.type === ItemEventType.Burn
}

const createTreeItem = (item: Item, items: Items = []) : TreeItem => {
  const relations = item.state.relations || []
  const itemRelations = relations.map(id => {
    const item = findItem(id, items)
    return item != null ? createTreeItem(item, items) : createUnknownTreeItem(id)
  })
  const name = itemName(item)
  const isBurned = itemIsBurned(item)
  const isKnown = true
  const isCyclic = false
  return { ...item, relations: itemRelations, name, isKnown, isCyclic, isBurned }
}

export default createTreeItem
