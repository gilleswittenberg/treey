import { Data, Id, Index } from "./types/types"
import { ItemEventType } from "./types/Item"
import TreeItem from "./types/TreeItem"
import crud from "./crud"
import createEvent from "./createEvent"
import createTreeItem from "./tree/createTreeItem"

export const init = async () : Promise<TreeItem> => {
  const items = await crud.index()
  const rootItem = items.find(item => (item as TreeItem).isRoot === true)
  const root = rootItem != null ? rootItem : await crud.create(true)
  return createTreeItem(root, items)
}

export const read = async (id: Id) : Promise<TreeItem> => {
  return await crud.read(id) as TreeItem
}

export const createAndAdd = async (data: Data, parentId: Id) => {

  const item = await crud.create()
  const id = item.state.ids && item.state.ids[0]
  if (!id) return await init()

  const eventDataSet = createEvent(ItemEventType.DataSet, { data })
  await crud.update(id, eventDataSet)

  const eventRelationAdd = createEvent(ItemEventType.RelationAdd, { id })
  await crud.update(parentId, eventRelationAdd)

  return await init()
}

export const update = async (id: Id, data: Data) => {

  const event = createEvent(ItemEventType.DataSet, { data })
  await crud.update(id, event)

  return await init()
}

export const remove = async (id: Id, parentId: Id, index: Index) => {

  const event = createEvent(ItemEventType.RelationRemove, { id, index })
  await crud.update(parentId, event)

  return await init()
}

export const move = async (id: Id, oldParentId: Id, oldIndex: Index, parentId: Id, index: Index) => {

  const eventRelationRemove = createEvent(ItemEventType.RelationRemove, { id, index: oldIndex })
  await crud.update(oldParentId, eventRelationRemove)

  const eventRelationAdd = createEvent(ItemEventType.RelationAdd, { id, index })
  await crud.update(parentId, eventRelationAdd)

  return await init()
}
