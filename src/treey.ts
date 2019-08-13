import crud from "./crud"
import createEvent from "./createEvent"
import createTreeItem from "./tree/createTreeItem"

export const init = async () : Promise<OptionalTreeItem> => {
  try {
    const items = await crud.index()
    const rootItem = items.find(item => (item as DBItem).isRoot === true)
    const root = rootItem != null ? rootItem : await crud.create(true)
    return createTreeItem(root, items)
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export const read = async (id: Id) : Promise<OptionalTreeItem> => {
  try {
    const item = await crud.read(id)
    if (item === undefined) return undefined
    const items = await crud.index()
    return createTreeItem(item, items)
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export const createAndAdd = async (data: Data, parentId: Id) : Promise<OptionalTreeItem> => {
  try {
    const item = await crud.create()
    const id = item.state.ids && item.state.ids[0]
    if (!id) return await init()

    const eventDataSet = createEvent("DataSet", { data })
    await crud.update(id, eventDataSet)

    const eventRelationAdd = createEvent("RelationAdd", { id })
    await crud.update(parentId, eventRelationAdd)

    return await init()
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export const update = async (id: Id, data: Data) : Promise<OptionalTreeItem> => {
  try {
    const event = createEvent("DataSet", { data })
    await crud.update(id, event)
    return await init()
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export const remove = async (id: Id, parentId: Id, index: Index) : Promise<OptionalTreeItem> => {
  try {
    const event = createEvent("RelationRemove", { id, index })
    await crud.update(parentId, event)
    return await init()
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export const move = async (id: Id, oldParentId: Id, oldIndex: Index, parentId: Id, index: Index) : Promise<OptionalTreeItem> => {
  try {
    const eventRelationRemove = createEvent("RelationRemove", { id, index: oldIndex })
    await crud.update(oldParentId, eventRelationRemove)

    const eventRelationAdd = createEvent("RelationAdd", { id, index })
    await crud.update(parentId, eventRelationAdd)

    return await init()
  } catch (err) {
    console.error(err)
    return undefined
  }
}
