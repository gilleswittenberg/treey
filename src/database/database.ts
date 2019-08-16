import isBrowser from "../utils/isBrowser"
import * as IndexedDB from "./IndexedDB"
import * as MemoryDB from "./MemoryDB"
import createUUID from "../crypto/createUUID"
import createEvent from "../factories/createEvent"
import { updateItem } from "../factories/createItem"

export const create = async (item: Item, isRoot = false) => {
  const name = createUUID()
  const id = { name }
  const itemEventIdentityAdd = createEvent("IdentityAdd", { id })
  const updatedItem = updateItem(item, [itemEventIdentityAdd])
  const dbItem = { id: name, isRoot, ...updatedItem }
  return isBrowser ? await IndexedDB.addItem(dbItem) : await MemoryDB.create(dbItem)
}

export const read = async (treeyId: Id) => {
  const id = treeyId.name
  if (id == null) return undefined
  return isBrowser ? await IndexedDB.getItem(id) : await MemoryDB.read(id)
}

export const update = async (id: Id, events: NonEmptyArray<ItemEvent>) => {
  const item = await read(id)
  if (item == null) return undefined
  const updatedItem = updateItem(item, events)
  const dbItem = { id: item.id, isRoot: item.isRoot, ...updatedItem }
  return isBrowser ? await IndexedDB.putItem(dbItem) : await MemoryDB.update(dbItem)
}

export const del = async (id: Id) => {
  const itemEventBurn = createEvent("Burn")
  return await update(id, [itemEventBurn])
}

export const index = async () => {
  return isBrowser ? await IndexedDB.getItems() : await MemoryDB.index()
}

export const clear = async () => {
  isBrowser ? await IndexedDB.clear() : await MemoryDB.clear()
}
