import { Id } from "../types/types"
import Item, { Items } from "../types/Item"
import TreeItem from "../types/TreeItem"

const findItem = (id: Id, items: Items) : Item | undefined => {
  return items.find(item => item.state.ids && item.state.ids.includes(id))
}

const createTreeItem = (item: Item, items: Items) : TreeItem => {
  const relations = item.state.relations || []
  const itemRelations = relations.map(relation => findItem(relation, items)).filter(item => item !== undefined) as Items
  const treeItemRelations = itemRelations.filter(item => item !== undefined).map(item => createTreeItem(item, items))
  return { ...item, relations: treeItemRelations }
}

export default createTreeItem
