import { Id } from "../types/types"
import Item, { OptionalItem, Items } from "../types/Item"
import TreeItem from "../types/TreeItem"

const findItem = (id: Id, items: Items) : OptionalItem => {
  return items.find(item => {
    const ids = item.state.ids || []
    return ids.find(itemId => itemId.name === id.name) !== undefined
  })
}

const createTreeItem = (item: Item, items: Items) : TreeItem => {
  const relations = item.state.relations || []
  const itemRelations = relations.map(relation => findItem(relation, items)).filter(item => item !== undefined) as Items
  const treeItemRelations = itemRelations.map(item => createTreeItem(item, items))
  return { ...item, relations: treeItemRelations }
}

export default createTreeItem
