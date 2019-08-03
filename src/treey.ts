import { Data, Id, Index } from "./types/types"
import { ItemEventType } from "./types/Item"
import TreeItem from "./types/TreeItem"
import crud from "./crud"
import createEvent from "./createEvent"

/*
const buildTree = (rootItem: Item, items: Items) : TreeItem => {

}
*/

export const init = async () : Promise<TreeItem> => {
  const items = await crud.index()
  const rootItem = items.find(item => (item as TreeItem).isRoot === true)
  return rootItem != null ? rootItem as TreeItem : await crud.create(true) as TreeItem
}

export const createAndAdd = async (data: Data, parentId: Id) => {
  const item = await crud.create()
  const id = item.state.ids[0]
  const eventDataSet = createEvent(ItemEventType.DataSet, { data })
  const updatedItem = await crud.update(id, eventDataSet)
  const eventRelationAdd = createEvent(ItemEventType.RelationAdd, { id })
  const updatedParent = await crud.update(parentId, eventRelationAdd)
}

export const update = async (id: Id, data: Data) => {
  const event = createEvent(ItemEventType.DataSet, { data })
  const updatedItem = await crud.update(id, event)
}

export const remove = async (id: Id, parentId: Id, index: Index) => {
  const event = createEvent(ItemEventType.RelationRemove, { id, index })
  const updatedItem = await crud.update(parentId, event)
}

export const move = async (id: Id, oldParentId: Id, oldIndex: Index, parentId: Id, index: Index) => {
  const eventRelationRemove = createEvent(ItemEventType.RelationRemove, { id, index: oldIndex })
  const updatedOldParent = await crud.update(oldParentId, eventRelationRemove)
  const eventRelationAdd = createEvent(ItemEventType.RelationAdd, { id, index })
  const updatedParent = await crud.update(parentId, eventRelationAdd)
}
