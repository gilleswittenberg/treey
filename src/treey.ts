import * as crud from "./crud"
import createEvent from "./factories/createEvent"
import createTreeItem from "./factories/createTreeItem"

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

    const eventSet = createEvent("Set", { data })
    await crud.update(id, eventSet)

    const eventRelate = createEvent("Relate", { id })
    await crud.update(parentId, eventRelate)

    return await init()
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export const update = async (id: Id, data: Data) : Promise<OptionalTreeItem> => {
  try {
    const event = createEvent("Set", { data })
    await crud.update(id, event)
    return await init()
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export const remove = async (id: Id, parentId: Id, index?: Index) : Promise<OptionalTreeItem> => {
  try {
    const event = createEvent("Unrelate", { id, index })
    await crud.update(parentId, event)
    return await init()
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export const move = async (id: Id, oldParentId: Id, parentId: Id, oldIndex?: Index, index?: Index) : Promise<OptionalTreeItem> => {
  try {
    const eventUnrelate = createEvent("Unrelate", { id, index: oldIndex })
    await crud.update(oldParentId, eventUnrelate)

    const eventRelate = createEvent("Relate", { id, index })
    await crud.update(parentId, eventRelate)

    return await init()
  } catch (err) {
    console.error(err)
    return undefined
  }
}
